require("dotenv").config();
const axios = require("axios");
const db = require("./config/db");

// API에는 없지만 꼭 필요한 정보(길이, 랩수, 로컬 이미지 경로)를 매핑해 둡니다.
const circuitDetails = {
  "bahrain": { length: 5.412, laps: 57, img: "img/circuit/bahrain.png" },
  "jeddah": { length: 6.174, laps: 50, img: "img/circuit/saudi.png" },
  "albert_park": { length: 5.278, laps: 58, img: "img/circuit/australia.png" },
  "suzuka": { length: 5.807, laps: 53, img: "img/circuit/suzuka.png" },
  "shanghai": { length: 5.451, laps: 56, img: "img/circuit/china.png" },
  "miami": { length: 5.412, laps: 57, img: "img/circuit/miami.png" },
  "imola": { length: 4.909, laps: 63, img: "img/circuit/imola.png" },
  "monaco": { length: 3.337, laps: 78, img: "img/circuit/monaco.png" },
  "villeneuve": { length: 4.361, laps: 70, img: "img/circuit/canada.png" },
  "catalunya": { length: 4.657, laps: 66, img: "img/circuit/spain.png" },
  "red_bull_ring": { length: 4.318, laps: 71, img: "img/circuit/austria.png" },
  "silverstone": { length: 5.891, laps: 52, img: "img/circuit/silverstone.png" },
  "hungaroring": { length: 4.381, laps: 70, img: "img/circuit/hungary.png" },
  "spa": { length: 7.004, laps: 44, img: "img/circuit/spa.png" },
  "zandvoort": { length: 4.259, laps: 72, img: "img/circuit/netherlands.png" },
  "monza": { length: 5.793, laps: 53, img: "img/circuit/monza.png" },
  "baku": { length: 6.003, laps: 51, img: "img/circuit/baku.png" },
  "marina_bay": { length: 4.940, laps: 62, img: "img/circuit/singapore.png" },
  "americas": { length: 5.513, laps: 56, img: "img/circuit/usa.png" },
  "rodriguez": { length: 4.304, laps: 71, img: "img/circuit/mexico.png" },
  "interlagos": { length: 4.309, laps: 71, img: "img/circuit/brazil.png" },
  "las_vegas": { length: 6.201, laps: 50, img: "img/circuit/vegas.png" },
  "losail": { length: 5.419, laps: 57, img: "img/circuit/qatar.png" },
  "yas_marina": { length: 5.281, laps: 58, img: "img/circuit/abudhabi.png" }
};

async function seedCircuits() {
  try {
    console.log("📡 Ergast API에서 서킷 정보를 요청 중...");
    // 2024년 F1 캘린더 기준으로 서킷 리스트를 가져옵니다.
    const response = await axios.get("http://api.jolpi.ca/ergast/f1/2024/circuits.json?limit=100");
    const apiCircuits = response.data.MRData.CircuitTable.Circuits;

    console.log(`✅ 총 ${apiCircuits.length}개의 서킷 정보를 가져왔습니다.`);

    // DB 초기화 (기존 데이터 삭제하고 ID 1부터 다시 시작)
    // ▼▼▼ [수정됨] 외래 키 제약 조건을 잠시 끄고 삭제합니다 ▼▼▼
    await db.query("SET FOREIGN_KEY_CHECKS = 0"); 
    await db.query("TRUNCATE TABLE Circuits");
    await db.query("SET FOREIGN_KEY_CHECKS = 1");
    // ▲▲▲ [수정 끝] ▲▲▲
    
    console.log("🧹 기존 Circuits 테이블 데이터를 비웠습니다.");

    let count = 0;
    for (const c of apiCircuits) {
      const details = circuitDetails[c.circuitId]; // 위에서 정의한 매핑 데이터 가져오기

      // 매핑 데이터가 있는 경우에만 저장 (2024 시즌 서킷만 필터링 효과)
      if (details) {
        const name = c.circuitName;
        const location = `${c.Location.locality}, ${c.Location.country}`;
        const country = c.Location.country;
        const description = `<a href="${c.url}" target="_blank" style="color:#e10600;">Wiki Info</a>`; // 설명 대신 위키 링크
        const length_km = details.length;
        const laps = details.laps;
        const image_url = details.img;

        await db.query(
          `INSERT INTO Circuits (name, location, country, length_km, laps, image_url, description) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [name, location, country, length_km, laps, image_url, description]
        );
        count++;
      }
    }

    console.log(`🎉 ${count}개의 서킷 데이터가 성공적으로 저장되었습니다!`);
    process.exit(0); // 스크립트 종료

  } catch (error) {
    console.error("❌ 데이터 저장 중 오류 발생:", error);
    process.exit(1);
  }
}

seedCircuits();