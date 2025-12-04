require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./config/db");
const { protect } = require("./middleware/authMiddleware");
const path = require("path");
const multer = require("multer"); // 파일 업로드용
const fs = require("fs");

// 크롤링을 위한 라이브러리
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 3001;
// JWT 비밀키 설정
const JWT_SECRET_KEY = process.env.JWT_SECRET || "pitwall_secret_key";

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); //업로드된 사진을 브라우저에서 볼 수 있게 폴더 공개

// --- Multer 설정 (사진 저장) ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // uploads 폴더가 없으면 생성
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // 파일명 중복 방지를 위해 날짜+원본이름 사용
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// 데이터베이스 연결 테스트
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

// ==========================================
// 1. 회원가입 & 로그인 API
// ==========================================

// 회원가입 API
app.post("/api/signup", async (req, res) => {
  const { username, password, nickname, email } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // is_admin 컬럼은 기본값(0)이 들어가므로 쿼리에서 생략 가능
    const sql =
      "INSERT INTO Users (username, password, nickname, email) VALUES (?, ?, ?, ?)";
    await db.query(sql, [username, hashedPassword, nickname, email]);

    res.status(201).json({ message: "회원가입 성공!" });
  } catch (error) {
    console.error("회원가입 오류:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "이미 사용 중인 아이디, 닉네임 또는 이메일입니다." });
    }
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 로그인 API (관리자 정보 포함 수정됨)
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const sql = "SELECT * FROM Users WHERE username = ?";
    const [results] = await db.query(sql, [username]);

    if (results.length === 0) {
      return res.status(404).json({ message: "존재하지 않는 아이디입니다." });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // 🔥 [수정] 토큰에 관리자 정보(is_admin) 포함
      const token = jwt.sign(
        {
          user_id: user.user_id,
          nickname: user.nickname,
          is_admin: user.is_admin, 
        },
        JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      // 🔥 [수정] 응답에도 관리자 여부 포함 (프론트엔드 처리용)
      res.status(200).json({
        message: "로그인 성공!",
        token: token,
        nickname: user.nickname,
        is_admin: user.is_admin 
      });
    } else {
      res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// ==========================================
// 2. 내 정보 관리 API
// ==========================================

app.get("/api/my-info", protect, async (req, res) => {
  try {
    const sql = "SELECT username, email FROM Users WHERE user_id = ?";
    const [results] = await db.query(sql, [req.user.user_id]);

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: "사용자 정보를 찾을 수 없습니다." });
    }
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

app.put("/api/my-info/nickname", protect, async (req, res) => {
  const { nickname } = req.body;
  const { user_id } = req.user;

  try {
    const checkSql =
      "SELECT user_id FROM Users WHERE nickname = ? AND user_id != ?";
    const [existing] = await db.query(checkSql, [nickname, user_id]);

    if (existing.length > 0) {
      return res.status(409).json({ message: "이미 사용 중인 닉네임입니다." });
    }

    await db.query("UPDATE Users SET nickname = ? WHERE user_id = ?", [
      nickname,
      user_id,
    ]);
    res
      .status(200)
      .json({ message: "닉네임 변경 완료", newNickname: nickname });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

app.put("/api/my-info/password", protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { user_id } = req.user;

  try {
    const [results] = await db.query(
      "SELECT password FROM Users WHERE user_id = ?",
      [user_id]
    );
    const user = results[0];

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res
        .status(401)
        .json({ message: "현재 비밀번호가 일치하지 않습니다." });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE Users SET password = ? WHERE user_id = ?", [
      hashedNewPassword,
      user_id,
    ]);

    res.status(200).json({ message: "비밀번호 변경 완료" });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// ==========================================
// 3. 커뮤니티 게시판 API
// ==========================================

// 3-1)게시글 작성
app.post("/api/posts", protect, upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const { user_id } = req.user;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null; // 사진이 있으면 경로 저장

  if (!title || !content)
    return res.status(400).json({ message: "제목과 내용을 입력해주세요." });

  try {
    await db.query(
      "INSERT INTO Posts (title, content, user_id, image_url) VALUES (?, ?, ?, ?)",
      [title, content, user_id, image_url]
    );
    res.status(201).json({ message: "게시글 등록 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 3-2)게시글 목록 조회
app.get("/api/posts", async (req, res) => {
  try {
    const sql = `
            SELECT p.post_id, p.title, p.created_at, p.views, p.likes, u.nickname 
            FROM Posts p
            JOIN Users u ON p.user_id = u.user_id
            ORDER BY p.created_at DESC
        `;
    const [posts] = await db.query(sql);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 3-3)게시글 상세 조회
app.get("/api/posts/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    await db.query("UPDATE Posts SET views = views + 1 WHERE post_id = ?", [
      postId,
    ]);

    const sql = `
            SELECT p.*, u.nickname 
            FROM Posts p
            JOIN Users u ON p.user_id = u.user_id
            WHERE p.post_id = ?
        `;
    const [results] = await db.query(sql, [postId]);

    if (results.length === 0)
      return res.status(404).json({ message: "게시글 없음" });
    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 4. 게시글 삭제 API (작성자 본인 또는 관리자만 가능)
app.delete("/api/posts/:id", protect, async (req, res) => {
  const postId = req.params.id;
  const { user_id, is_admin } = req.user;

  try {
    const [post] = await db.query("SELECT user_id FROM Posts WHERE post_id = ?", [postId]);
    if (post.length === 0) return res.status(404).json({ message: "게시글 없음" });

    // 작성자 본인이거나 관리자만 삭제 가능
    if (post[0].user_id !== user_id && is_admin !== 1) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await db.query("DELETE FROM Posts WHERE post_id = ?", [postId]);
    res.status(200).json({ message: "게시글 삭제 완료" });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 5. 게시글 수정 API
app.put("/api/posts/:id", protect, upload.single("image"), async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const { user_id } = req.user;
    
    try {
        // 작성자 확인
        const [post] = await db.query("SELECT * FROM Posts WHERE post_id = ?", [postId]);
        if (post.length === 0) return res.status(404).json({ message: "게시글 없음" });
        if (post[0].user_id !== user_id) return res.status(403).json({ message: "수정 권한이 없습니다." });

        // 이미지 처리 (새 이미지가 없으면 기존 이미지 유지)
        let image_url = post[0].image_url;
        if (req.file) {
            image_url = `/uploads/${req.file.filename}`;
        }

        await db.query(
            "UPDATE Posts SET title = ?, content = ?, image_url = ? WHERE post_id = ?",
            [title, content, image_url, postId]
        );
        res.json({ message: "게시글 수정 완료" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// 좋아요 토글
app.post("/api/posts/:id/like", protect, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.user_id;

  try {
    const [existingLike] = await db.query(
      "SELECT * FROM PostLikes WHERE user_id = ? AND post_id = ?",
      [userId, postId]
    );

    let message = "";
    if (existingLike.length > 0) {
      await db.query(
        "DELETE FROM PostLikes WHERE user_id = ? AND post_id = ?",
        [userId, postId]
      );
      await db.query("UPDATE Posts SET likes = likes - 1 WHERE post_id = ?", [
        postId,
      ]);
      message = "좋아요 취소";
    } else {
      await db.query("INSERT INTO PostLikes (user_id, post_id) VALUES (?, ?)", [
        userId,
        postId,
      ]);
      await db.query("UPDATE Posts SET likes = likes + 1 WHERE post_id = ?", [
        postId,
      ]);
      message = "좋아요!";
    }

    const [updatedPost] = await db.query(
      "SELECT likes FROM Posts WHERE post_id = ?",
      [postId]
    );
    res.json({ message, likes: updatedPost[0].likes });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 댓글 목록 조회
app.get("/api/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  try {
    const sql = `
            SELECT c.*, u.nickname 
            FROM Comments c
            JOIN Users u ON c.user_id = u.user_id
            WHERE c.post_id = ?
            ORDER BY c.created_at ASC
        `;
    const [comments] = await db.query(sql, [postId]);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 댓글 작성
app.post("/api/posts/:id/comments", protect, async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  const { user_id } = req.user;

  if (!content) return res.status(400).json({ message: "내용 입력 필요" });

  try {
    await db.query(
      "INSERT INTO Comments (post_id, user_id, content) VALUES (?, ?, ?)",
      [postId, user_id, content]
    );
    res.status(201).json({ message: "댓글 작성 완료" });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 6. 댓글 삭제 API
// 6. 🔥 [신규] 댓글 삭제 API
app.delete("/api/comments/:id", protect, async (req, res) => {
    const commentId = req.params.id;
    const { user_id, is_admin } = req.user;

    try {
        const [comment] = await db.query("SELECT user_id FROM Comments WHERE comment_id = ?", [commentId]);
        if (comment.length === 0) return res.status(404).json({ message: "댓글 없음" });

        // 작성자 본인이거나 관리자만 삭제 가능
        if (comment[0].user_id !== user_id && is_admin !== 1) {
            return res.status(403).json({ message: "삭제 권한이 없습니다." });
        }

        await db.query("DELETE FROM Comments WHERE comment_id = ?", [commentId]);
        res.json({ message: "댓글 삭제 완료" });
    } catch (error) {
        res.status(500).json({ message: "서버 오류" });
    }
});

// ==================================================================
// 4. 🔥 F1 뉴스 크롤링 API (관리자 전용) 🔥
// ==================================================================

// 시간 변환 보조 함수
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
    const parts = timeStr
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s);
    if (parts.length === 3)
      return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
  }
  return now;
}

// 뉴스 크롤링 실행 API (관리자만 가능)
app.post("/api/news/crawl", protect, async (req, res) => {
  // 1. 관리자 권한 확인 (protect 미들웨어가 req.user를 만들어줌)
  if (req.user.is_admin !== 1) {
    return res.status(403).json({ message: "관리자만 실행할 수 있습니다." });
  }

  let browser = null;
  try {
    const targetUrl = "https://f1-boxbox.com/ko/formula-1/news/article";
    const TARGET_COUNT = 50;

    console.log("🤖 브라우저 실행 중...");

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 60000 });

    let currentItems = 0;
    let clickCount = 0;
    const MAX_CLICKS = 10;

    console.log("🖱️ 기사 로딩 시작...");

    while (currentItems < TARGET_COUNT && clickCount < MAX_CLICKS) {
      currentItems = await page.$$eval("ul.grid > li", (li) => li.length);
      console.log(`   현재 ${currentItems}개 기사 로딩됨...`);

      if (currentItems >= TARGET_COUNT) break;

      const buttonClicked = await page.evaluate(async () => {
        const buttons = Array.from(document.querySelectorAll("button"));
        const prevBtn = buttons.find(
          (btn) => btn.textContent.trim() === "이전"
        );

        if (prevBtn && !prevBtn.disabled) {
          prevBtn.click();
          return true;
        }
        return false;
      });

      if (!buttonClicked) break;
      await new Promise((r) => setTimeout(r, 2000));
      clickCount++;
    }

    const html = await page.content();
    const $list = cheerio.load(html);

    await browser.close();
    browser = null;

    const items = $list("ul.grid > li");
    const newsList = [];

    for (let i = 0; i < Math.min(items.length, TARGET_COUNT); i++) {
      const elem = items[i];

      const title = $list(elem).find("h3").text().trim();
      let link = $list(elem).find("a").attr("href");
      if (link && !link.startsWith("http"))
        link = `https://f1-boxbox.com${link}`;
      const image_url = $list(elem).find("img").attr("src") || "";
      const timeStr = $list(elem)
        .find("p.text-muted-foreground.text-xs")
        .text()
        .trim();
      const createdAt = parseRelativeTime(timeStr);

      if (title && link) {
        try {
          await new Promise((r) => setTimeout(r, 300));
          const detailResponse = await axios.get(link, {
            headers: { "User-Agent": "Mozilla/5.0" },
          });
          const $detail = cheerio.load(detailResponse.data);

          let content = $detail("div.whitespace-pre-wrap").text().trim();
          if (!content) content = $detail("article").text().trim();
          if (!content) content = "본문 없음";

          const summary = content.substring(0, 100) + "...";

          newsList.push({
            title,
            summary,
            content,
            image_url,
            source: "F1 BoxBox",
            created_at: createdAt,
          });
        } catch (err) {
          console.error(`   [실패] ${title.substring(0, 10)}...`);
        }
      }
    }

    let savedCount = 0;
    for (const news of newsList) {
      const [exists] = await db.query(
        "SELECT news_id FROM News WHERE title = ?",
        [news.title]
      );

      if (exists.length === 0) {
        await db.query(
          "INSERT INTO News (title, summary, content, image_url, source, created_at) VALUES (?, ?, ?, ?, ?, ?)",
          [
            news.title,
            news.summary,
            news.content,
            news.image_url,
            news.source,
            news.created_at,
          ]
        );
        savedCount++;
      }
    }

    console.log(`🎉 크롤링 완료! ${savedCount}개 신규 저장.`);
    res.status(200).json({
      message: "크롤링 완료!",
      total: newsList.length,
      saved: savedCount,
    });
  } catch (error) {
    if (browser) await browser.close();
    console.error("크롤링 중 오류:", error);
    res.status(500).json({ message: "크롤링 실패", error: error.message });
  }
});

// 뉴스 목록 조회 API
app.get("/api/news", async (req, res) => {
  try {
    const sql = "SELECT * FROM News ORDER BY created_at DESC";
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 뉴스 상세 조회 API
app.get("/api/news/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM News WHERE news_id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "뉴스 없음" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// ==========================================
// 5. 서킷 정보 API
// ==========================================

// 서킷 목록 조회 API
app.get("/api/circuits", async (req, res) => {
  try {
    const sql = "SELECT * FROM Circuits";
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 서킷 기록 조회 API (모달 클릭용)
app.get("/api/circuits/:id/records", async (req, res) => {
  try {
    const sql = "SELECT * FROM CircuitRecords WHERE circuit_id = ?";
    const [rows] = await db.query(sql, [req.params.id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});