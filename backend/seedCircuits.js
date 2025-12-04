require("dotenv").config();
const axios = require("axios");
const db = require("./config/db");

// 기존 circuit-data.js의 내용을 여기에 통합했습니다. (한글 데이터)
const circuitDetails = {
  "bahrain": { 
    length: 5.412, laps: 57, img: "img/circuit/bahrain.png",
    desc: "사막 한가운데 위치한 트랙으로, 강한 바람과 모래가 변수입니다. 4개의 긴 직선 구간과 15개의 코너가 조화를 이루며, 타이어 관리가 승부의 핵심입니다.",
    viewPoint: "Turn 1과 Turn 4에서의 추월 시도, 그리고 해 질 녘의 아름다운 조명이 포인트입니다."
  },
  "jeddah": { 
    length: 6.174, laps: 50, img: "img/circuit/saudi.png",
    desc: "F1 캘린더 중 가장 빠른 시가지 서킷입니다. 좁은 벽 사이를 평균 시속 250km로 질주하는 스릴 넘치는 트랙으로, 작은 실수가 큰 사고로 이어질 수 있습니다.",
    viewPoint: "고속 코너들이 이어지는 섹터 1과 좁은 트랙에서의 아슬아슬한 배틀을 주목하세요."
  },
  "albert_park": { 
    length: 5.278, laps: 58, img: "img/circuit/australia.png",
    desc: "아름다운 호수를 끼고 달리는 반 시가지 서킷입니다. 최근 레이아웃 변경으로 속도가 빨라졌으며, 개막전의 상징과도 같은 곳입니다.",
    viewPoint: "DRS 존이 4개나 있어 추월 기회가 많습니다. 특히 Turn 1과 Turn 3가 주요 추월 포인트입니다."
  },
  "suzuka": { 
    length: 5.807, laps: 53, img: "img/circuit/suzuka.png",
    desc: "드라이버들이 가장 사랑하는 올드스쿨 서킷입니다. 8자 형태의 독특한 레이아웃과 고속 코너들이 특징이며, 드라이버의 실력이 적나라하게 드러납니다.",
    viewPoint: "전설적인 '130R' 코너와 'S'자 코너 구간에서의 머신 밸런스와 드라이빙 스킬을 감상하세요."
  },
  "shanghai": { 
    length: 5.451, laps: 56, img: "img/circuit/china.png",
    desc: "한자 '상(上)' 자를 형상화한 서킷입니다. 아주 긴 백스트레이트와 독특한 달팽이 모양의 Turn 1이 특징입니다.",
    viewPoint: "1km가 넘는 긴 직선 구간 끝에서의 슬립스트림과 브레이킹 대결이 백미입니다."
  },
  "miami": { 
    length: 5.412, laps: 57, img: "img/circuit/miami.png",
    desc: "하드록 스타디움 주변을 도는 화려한 시가지 서킷입니다. 미국의 화려함과 F1의 기술력이 만난 곳으로, 노면 온도가 매우 높습니다.",
    viewPoint: "저속 섹션인 Turn 14-15 구간에서의 실수와 긴 직선주로에서의 최고속도 경쟁을 지켜보세요."
  },
  "imola": { 
    length: 4.909, laps: 63, img: "img/circuit/imola.png",
    desc: "페라리의 홈구장과도 같은 역사적인 서킷입니다. 트랙 폭이 좁고 고저차가 있어 추월이 어렵지만, 그만큼 예선 성적과 전략이 중요합니다.",
    viewPoint: "탐부렐로 시케인과 아쿠아 미네랄리 코너에서의 과감한 연석 공략이 포인트입니다."
  },
  "monaco": { 
    length: 3.337, laps: 78, img: "img/circuit/monaco.png",
    desc: "F1의 보석, 가장 화려하고 가장 느린 서킷입니다. 좁은 도로와 가드레일 때문에 추월이 거의 불가능하여 예선 순위가 곧 결승 순위가 되는 경우가 많습니다.",
    viewPoint: "토요일 예선전이 사실상의 결승전입니다. 벽에 닿을 듯 말 듯 한 드라이버들의 극한의 집중력을 느껴보세요."
  },
  "villeneuve": { 
    length: 4.361, laps: 70, img: "img/circuit/canada.png",
    desc: "인공섬에 지어진 서킷으로, 긴 직선과 시케인이 반복되는 '스톱 앤 고' 스타일입니다. 브레이크 마모가 심하고 변수가 많습니다.",
    viewPoint: "마지막 시케인의 '챔피언의 벽(Wall of Champions)'에 어떤 드라이버가 키스(충돌)할지 지켜보세요."
  },
  "catalunya": { 
    length: 4.657, laps: 66, img: "img/circuit/spain.png",
    desc: "에어로다이내믹 성능을 테스트하기 가장 좋은 교과서적인 서킷입니다. 다양한 코너가 섞여 있어 머신의 종합적인 성능이 중요합니다.",
    viewPoint: "스타트 직후 Turn 1까지의 긴 거리에서 벌어지는 순위 다툼이 치열합니다."
  },
  "red_bull_ring": { 
    length: 4.318, laps: 71, img: "img/circuit/austria.png",
    desc: "짧지만 고저차가 심하고 속도가 빠른 산악 서킷입니다. 랩타임이 매우 짧아 0.001초 차이로 순위가 갈립니다.",
    viewPoint: "3개의 긴 직선 구간에서의 치열한 DRS 배틀과 오르막 Turn 1 탈출 싸움이 볼거리입니다."
  },
  "silverstone": { 
    length: 5.891, laps: 52, img: "img/circuit/silverstone.png",
    desc: "F1이 시작된 성지입니다. 마고츠-베케츠-채플로 이어지는 초고속 코너 조합은 F1 머신의 코너링 성능을 극한으로 보여줍니다.",
    viewPoint: "고속 코너에서의 횡G(중력가속도)를 버티는 드라이버들과 예측 불가능한 영국 날씨가 변수입니다."
  },
  "hungaroring": { 
    length: 4.381, laps: 70, img: "img/circuit/hungary.png",
    desc: "벽 없는 모나코라 불릴 정도로 좁고 구불구불한 트랙입니다. 추월이 매우 어렵고 더운 날씨 때문에 체력 소모가 심합니다.",
    viewPoint: "스타트 직후 Turn 1이 거의 유일한 추월 포인트입니다. 예선 전략과 타이어 관리가 승패를 가릅니다."
  },
  "spa": { 
    length: 7.004, laps: 44, img: "img/circuit/spa.png",
    desc: "가장 길고 아름다운, 그리고 가장 위험한 서킷 중 하나입니다. 전설적인 오루즈(Eau Rouge) 코너는 담력을 시험하는 구간입니다.",
    viewPoint: "급경사를 오르는 오루즈-라디옹 구간의 압도적인 스피드와 변덕스러운 날씨(한쪽은 비, 한쪽은 맑음)를 주목하세요."
  },
  "zandvoort": { 
    length: 4.259, laps: 72, img: "img/circuit/netherlands.png",
    desc: "모래언덕 사이를 달리는 롤러코스터 같은 트랙입니다. 뱅킹(기울어진) 코너가 두 군데 있어 독특한 라인과 속도감을 선사합니다.",
    viewPoint: "마지막 뱅킹 코너에서 가속하여 메인 스트레이트로 튀어 나가는 모습과 열광적인 오렌지 군단(관중)의 응원을 즐기세요."
  },
  "monza": { 
    length: 5.793, laps: 53, img: "img/circuit/monza.png",
    desc: "'속도의 사원(Temple of Speed)'이라 불리는 초고속 서킷입니다. 엔진 파워가 가장 중요하며, 가장 짧은 레이스 시간을 기록합니다.",
    viewPoint: "시속 350km를 넘나드는 최고 속도와 T1 시케인에서의 급제동 싸움이 포인트입니다."
  },
  "baku": { 
    length: 6.003, laps: 51, img: "img/circuit/baku.png",
    desc: "초고속 직선과 극도로 좁은 구시가지 구간이 공존하는 독특한 시가지 서킷입니다. 항상 예상치 못한 드라마가 펼쳐집니다.",
    viewPoint: "성벽 사이를 통과하는 좁은 구간과 2km에 달하는 메인 스트레이트에서의 슬립스트림 대결이 압권입니다."
  },
  "marina_bay": { 
    length: 4.940, laps: 62, img: "img/circuit/singapore.png",
    desc: "F1 최초의 야간 레이스가 열린 곳입니다. 덥고 습하며 코너가 많아 드라이버들에게 가장 가혹한 체력 테스트 장소입니다.",
    viewPoint: "아름다운 야경 속에서 불꽃을 튀기며 달리는 머신들과 잦은 세이프티카 변수를 주목하세요."
  },
  "americas": { 
    length: 5.513, laps: 56, img: "img/circuit/usa.png",
    desc: "세계 유명 서킷의 코너들을 오마주하여 만든 훌륭한 밸런스의 트랙입니다. 가파른 오르막의 Turn 1이 상징적입니다.",
    viewPoint: "언덕 위 맹인(Blind) 코너인 Turn 1에서의 엉킴과 다채로운 섹터 1의 고속 코너링을 감상하세요."
  },
  "rodriguez": { 
    length: 4.304, laps: 71, img: "img/circuit/mexico.png",
    desc: "해발 2,200m 고지에 위치하여 공기가 희박합니다. 이로 인해 다운포스가 줄고 엔진 냉각이 어려워 기술적인 변수가 많습니다.",
    viewPoint: "야구장을 통과하는 스타디움 섹션의 엄청난 관중 열기와 긴 직선주로 끝의 배틀이 포인트입니다."
  },
  "interlagos": { 
    length: 4.309, laps: 71, img: "img/circuit/brazil.png",
    desc: "반시계 방향으로 도는 클래식 서킷입니다. 날씨 변화가 심하고 추월이 용이하여 항상 명경기를 만들어냅니다.",
    viewPoint: "세나 S 코너의 내리막 통과와 오르막 메인 스트레이트에서의 막판 역전극을 기대하세요."
  },
  "las_vegas": { 
    length: 6.201, laps: 50, img: "img/circuit/vegas.png",
    desc: "라스베이거스의 화려한 스트립 거리를 질주하는 새로운 시가지 서킷입니다. 긴 직선 위주라 최고 속도가 매우 빠릅니다.",
    viewPoint: "화려한 네온사인 아래 펼쳐지는 시속 340km 이상의 초고속 배틀과 화려한 볼거리를 즐기세요."
  },
  "losail": { 
    length: 5.419, laps: 57, img: "img/circuit/qatar.png",
    desc: "MotoGP 서킷으로 유명하며, 고속 코너가 끊임없이 이어지는 흐름이 좋은 트랙입니다. 타이어 옆면에 가해지는 부하가 큽니다.",
    viewPoint: "밤에 열리는 레이스로, 쉴 새 없이 이어지는 고속 코너에서의 드라이버의 리듬감이 중요합니다."
  },
  "yas_marina": { 
    length: 5.281, laps: 58, img: "img/circuit/abudhabi.png",
    desc: "화려한 요트 정박지와 호텔을 끼고 도는 시즌 피날레의 무대입니다. 해 질 녘에 시작해 밤에 끝나는 트와일라잇 레이스입니다.",
    viewPoint: "시즌 챔피언이 결정되는 마지막 순간의 긴장감과 화려한 불꽃놀이 피날레를 감상하세요."
  }
};

async function seedCircuits() {
  try {
    console.log("📡 Ergast API에서 서킷 정보를 요청 중...");
    const response = await axios.get("http://api.jolpi.ca/ergast/f1/2024/circuits.json?limit=100");
    const apiCircuits = response.data.MRData.CircuitTable.Circuits;

    console.log(`✅ API 응답 완료. 총 ${apiCircuits.length}개 서킷 확인.`);

    // DB 초기화 (외래 키 체크 해제 후 삭제)
    await db.query("SET FOREIGN_KEY_CHECKS = 0"); 
    await db.query("TRUNCATE TABLE Circuits");
    await db.query("TRUNCATE TABLE CircuitRecords"); // 기록도 초기화 (ID 꼬임 방지)
    await db.query("SET FOREIGN_KEY_CHECKS = 1");
    
    console.log("🧹 기존 데이터 초기화 완료.");

    let count = 0;
    for (const c of apiCircuits) {
      const details = circuitDetails[c.circuitId];

      if (details) {
        const name = c.circuitName;
        const location = `${c.Location.locality}, ${c.Location.country}`;
        const country = c.Location.country;
        
        // API 데이터 + 우리가 준비한 한글 데이터 합치기
        const length_km = details.length;
        const laps = details.laps;
        const image_url = details.img;
        const description = details.desc || "설명 준비 중입니다.";
        const view_point = details.viewPoint || "관전 포인트 준비 중입니다.";

        await db.query(
          `INSERT INTO Circuits (name, location, country, length_km, laps, image_url, description, view_point) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [name, location, country, length_km, laps, image_url, description, view_point]
        );
        count++;
      }
    }

    console.log(`🎉 ${count}개의 서킷 데이터(한글 설명 포함)가 저장되었습니다!`);
    process.exit(0);

  } catch (error) {
    console.error("❌ 데이터 저장 중 오류 발생:", error);
    process.exit(1);
  }
}

seedCircuits();