require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./config/db"); 
const jwt = require("jsonwebtoken");
const { protect } = require("./middleware/authMiddleware");
const axios = require("axios"); 
const cheerio = require("cheerio"); 
const puppeteer = require("puppeteer"); // 퍼피티어 필수!

const JWT_SECRET_KEY = process.env.JWT_SECRET;

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- [기본] DB 연결 및 라우트 설정 (기존 코드 유지) ---
async function testDbConnection() {
  try {
    await db.getConnection();
    console.log("✅ 데이터베이스 연결 성공!");
  } catch (error) {
    console.error("❌ 데이터베이스 연결 실패:", error);
  }
}
testDbConnection();

app.get("/", (req, res) => res.send("Pitwall 백엔드 서버가 실행 중입니다."));

// ... (회원가입, 로그인, 게시판, 댓글 API 등 기존 코드 그대로 유지) ...
// (기존에 작성하신 api/signup, login, my-info, posts 관련 코드는 여기에 그대로 두시면 됩니다)


// ==================================================================
// 🔥 [핵심 기능] F1 뉴스 크롤링 API (버튼 클릭 + 상세 내용) 🔥
// ==================================================================
app.post("/api/news/crawl", async (req, res) => {
  let browser = null;
  try {
    // 1. 크롤링할 대상 사이트 (뉴스 기사 목록 페이지)
    const targetUrl = "https://f1-boxbox.com/ko/formula-1/news/article";
    const TARGET_COUNT = 100; // 🎯 목표 기사 개수 (50개)

    console.log("🤖 브라우저 실행 중...");
    
    // 퍼피티어 브라우저 열기
    browser = await puppeteer.launch({ 
        headless: true, // true: 창 안 보임 (백그라운드 실행), false: 창 보임 (테스트용)
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    // 페이지 접속
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    // 2. [이전] 버튼을 눌러서 기사 더 불러오기
    let currentItems = 0;
    let clickCount = 0;
    const MAX_CLICKS = 10; // 최대 버튼 클릭 횟수 (무한 루프 방지)

    console.log("🖱️ 기사 로딩 시작...");

    while (currentItems < TARGET_COUNT && clickCount < MAX_CLICKS) {
        // 현재 로딩된 기사 개수 세기
        currentItems = await page.$$eval("ul.grid > li", li => li.length);
        console.log(`   현재 ${currentItems}개 기사 로딩됨...`);

        if (currentItems >= TARGET_COUNT) break; // 충분하면 중단

        // '이전' 버튼 찾아서 클릭
        // (XPath를 사용하여 '이전'이라는 텍스트를 가진 버튼을 찾습니다)
        const buttonClicked = await page.evaluate(async () => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const prevBtn = buttons.find(btn => btn.textContent.trim() === '이전');
            
            if (prevBtn && !prevBtn.disabled) {
                prevBtn.click();
                return true;
            }
            return false;
        });

        if (!buttonClicked) {
            console.log("⚠️ 더 이상 누를 '이전' 버튼이 없습니다.");
            break; 
        }

        // 클릭 후 데이터 로딩 기다림 (2초)
        await new Promise(r => setTimeout(r, 2000));
        clickCount++;
    }

    // 3. 로딩된 전체 HTML 가져오기
    const html = await page.content();
    const $list = cheerio.load(html);
    
    await browser.close(); // 브라우저 종료
    browser = null; 

    console.log(`✅ 총 ${currentItems}개 기사 확보. 상세 내용 수집 시작...`);


    // 4. 각 기사별 상세 정보 수집 (Axios 사용)
    const items = $list("ul.grid > li");
    const newsList = [];

    // 최신순으로 목표 개수만큼 처리
    for (let i = 0; i < Math.min(items.length, TARGET_COUNT); i++) {
        const elem = items[i];
        
        // (1) 기본 정보 추출
        const title = $list(elem).find("h3").text().trim(); 
        let link = $list(elem).find("a").attr("href");
        if (link && !link.startsWith("http")) link = `https://f1-boxbox.com${link}`;
        const image_url = $list(elem).find("img").attr("src") || "";
        const timeStr = $list(elem).find("p.text-muted-foreground.text-xs").text().trim();
        const createdAt = parseRelativeTime(timeStr);

        if (title && link) {
            try {
                // 차단 방지 딜레이 (0.3초)
                await new Promise(r => setTimeout(r, 300)); 

                // (2) 상세 페이지 접속
                const detailResponse = await axios.get(link, {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });
                const $detail = cheerio.load(detailResponse.data);

                // (3) 본문 추출 (분석한 클래스명 사용)
                let content = $detail("div.whitespace-pre-wrap").text().trim();
                if (!content) content = $detail("article").text().trim();
                if (!content) content = "본문 없음";

                // 요약문 생성
                const summary = content.substring(0, 100) + "...";

                newsList.push({ 
                    title, summary, content, image_url, source: "F1 BoxBox", created_at: createdAt 
                });
                
            } catch (err) {
                console.error(`   [실패] ${title.substring(0, 10)}... (${err.message})`);
            }
        }
        
        // 진행 상황 로그 (10개 단위)
        if ((i + 1) % 10 === 0) console.log(`   ...${i + 1}개 분석 완료`);
    }

    // 5. DB에 저장
    let savedCount = 0;
    for (const news of newsList) {
      const [exists] = await db.query("SELECT news_id FROM News WHERE title = ?", [news.title]);
      
      if (exists.length === 0) {
        await db.query(
          "INSERT INTO News (title, summary, content, image_url, source, created_at) VALUES (?, ?, ?, ?, ?, ?)",
          [news.title, news.summary, news.content, news.image_url, news.source, news.created_at]
        );
        savedCount++;
      }
    }

    console.log(`🎉 크롤링 최종 완료! ${savedCount}개 신규 저장.`);
    res.status(200).json({ message: "크롤링 완료!", total: newsList.length, saved: savedCount });

  } catch (error) {
    if (browser) await browser.close();
    console.error("크롤링 중 오류:", error);
    res.status(500).json({ message: "크롤링 실패", error: error.message });
  }
});

// --- [보조 함수] 시간 변환 ---
function parseRelativeTime(timeStr) {
    const now = new Date();
    if (!timeStr) return now;
    
    if (timeStr.includes("분 전")) {
        const minutes = parseInt(timeStr.replace(/[^0-9]/g, ""));
        now.setMinutes(now.getMinutes() - minutes);
    } else if (timeStr.includes("시간 전")) {
        const hours = parseInt(timeStr.replace(/[^0-9]/g, ""));
        now.setHours(now.getHours() - hours);
    } else if (timeStr.includes("일 전")) {
        const days = parseInt(timeStr.replace(/[^0-9]/g, ""));
        now.setDate(now.getDate() - days);
    } else if (timeStr.includes(".")) {
        // "2025. 12. 1." 형식
        const parts = timeStr.split(".").map(s => s.trim()).filter(s => s);
        if (parts.length === 3) return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
    }
    return now;
}

// --- [기존] 뉴스 조회 API (유지) ---
app.get("/api/news", async (req, res) => {
  try {
    const sql = "SELECT * FROM News ORDER BY created_at DESC";
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

app.get("/api/news/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM News WHERE news_id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "뉴스 없음" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});