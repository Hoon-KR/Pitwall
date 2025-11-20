// circuit-data.js
const circuitData = [
    {
        id: "albert-park",
        name: "Albert Park Circuit",
        location: "호주 🇦🇺 (멜버른)",
        length: "5.278 km",
        laps: 58,
        type: "하이브리드 (Semi-Street)",
        image: "australia.png",
        description: "2025 시즌 개막전이 열리는 곳입니다. 호수 주변 공원 도로를 사용하는 아름다운 서킷으로, 빠른 코너와 좁은 노면이 특징입니다."
    },
    {
        id: "shanghai",
        name: "Shanghai International Circuit",
        location: "중국 🇨🇳 (상하이)",
        length: "5.451 km",
        laps: 56,
        type: "고정형 (Permanent)",
        image: "china.png",
        description: "타이어 관리가 매우 까다로운 트랙입니다. 끝없이 이어지는 듯한 1번 코너와 F1 캘린더 중 가장 긴 직선 구간 중 하나를 보유하고 있습니다."
    },
    {
        id: "suzuka",
        name: "Suzuka International Racing Course",
        location: "일본 🇯🇵 (스즈카)",
        length: "5.807 km",
        laps: 53,
        type: "고정형 (Permanent)",
        image: "suzuka.png",
        description: "드라이버들이 가장 사랑하는 테크니컬 서킷입니다. 독특한 '8자 형태'의 교차 구조와 정교한 S자 코너가 도전 욕구를 불러일으킵니다."
    },
    {
        id: "bahrain",
        name: "Bahrain International Circuit",
        location: "바레인 🇧🇭 (사키르)",
        length: "5.412 km",
        laps: 57,
        type: "고정형 (Permanent)",
        image: "bahrain.png",
        description: "사막 한가운데 위치한 트랙으로, 모래바람과 강한 뒷바람이 변수입니다. 긴 직선과 급제동 구간이 많아 추월이 자주 일어납니다."
    },
    {
        id: "jeddah",
        name: "Jeddah Corniche Circuit",
        location: "사우디아라비아 🇸🇦 (제다)",
        length: "6.174 km",
        laps: 50,
        type: "도심형 (Street)",
        image: "saudi.png",
        description: "F1에서 가장 빠른 시가지 서킷입니다. 벽에 닿을 듯 말 듯 질주하는 초고속 코너들이 이어져 있어 스릴과 위험이 공존합니다."
    },
    {
        id: "miami",
        name: "Miami International Autodrome",
        location: "미국 🇺🇸 (마이애미)",
        length: "5.412 km",
        laps: 57,
        type: "도심형 (Street)",
        image: "miami.png",
        description: "하드락 스타디움 주변을 도는 화려한 서킷입니다. 덥고 습한 날씨와 느린 섹션, 긴 직선 구간이 섞여 있어 차량 세팅이 어렵습니다."
    },
    {
        id: "imola",
        name: "Autodromo Enzo e Dino Ferrari",
        location: "이탈리아 🇮🇹 (이몰라)",
        length: "4.909 km",
        laps: 63,
        type: "고정형 (Permanent)",
        image: "imola.png",
        description: "페라리의 홈 그라운드와도 같은 유서 깊은 트랙입니다. 트랙 폭이 좁고 고저차가 있어 실수가 용납되지 않는 올드 스쿨 서킷입니다."
    },
    {
        id: "monaco",
        name: "Circuit de Monaco",
        location: "모나코 🇲🇨 (몬테카를로)",
        length: "3.337 km",
        laps: 78,
        type: "도심형 (Street)",
        image: "monaco.png",
        description: "F1의 보석이라 불리는 가장 화려하고도 까다로운 트랙입니다. 좁은 도로와 가드레일 때문에 추월이 거의 불가능해 예선 성적이 곧 결승 성적이 됩니다."
    },
    {
        id: "barcelona",
        name: "Circuit de Barcelona-Catalunya",
        location: "스페인 🇪🇸 (바르셀로나)",
        length: "4.657 km",
        laps: 66,
        type: "고정형 (Permanent)",
        image: "spain.png",
        description: "공기 역학 성능을 테스트하기 가장 좋은 교과서적인 서킷입니다. 다양한 코너가 섞여 있어 차량의 종합적인 밸런스가 중요합니다."
    },
    {
        id: "canada",
        name: "Circuit Gilles-Villeneuve",
        location: "캐나다 🇨🇦 (몬트리올)",
        length: "4.361 km",
        laps: 70,
        type: "하이브리드 (Semi-Street)",
        image: "canada.png",
        description: "인공 섬에 만들어진 반시가지 서킷입니다. 마지막 코너의 '챔피언의 벽(Wall of Champions)'은 수많은 전설적인 드라이버들이 충돌한 곳으로 유명합니다."
    },
    {
        id: "redbull-ring",
        name: "Red Bull Ring",
        location: "오스트리아 🇦🇹 (스필베르크)",
        length: "4.318 km",
        laps: 71,
        type: "고정형 (Permanent)",
        image: "austria.png",
        description: "짧지만 고저차가 심하고 빠른 서킷입니다. 아름다운 알프스 산맥을 배경으로 하며, 짧은 랩타임 때문에 경기 진행이 매우 빠릅니다."
    },
    {
        id: "silverstone",
        name: "Silverstone Circuit",
        location: "영국 🇬🇧 (실버스톤)",
        length: "5.891 km",
        laps: 52,
        type: "고정형 (Permanent)",
        image: "silverstone.png",
        description: "F1이 처음 시작된 성지입니다. 마고츠-베케츠-채플(Maggots-Becketts-Chapel)로 이어지는 초고속 코너 조합은 드라이버와 차량의 한계를 시험합니다."
    },
    {
        id: "spa",
        name: "Circuit de Spa-Francorchamps",
        location: "벨기에 🇧🇪 (스파)",
        length: "7.004 km",
        laps: 44,
        type: "고정형 (Permanent)",
        image: "spa.png",
        description: "F1 캘린더 중 가장 긴 서킷입니다. 급경사를 오르는 전설적인 '오 루즈(Eau Rouge)' 코너와 변덕스러운 날씨가 드라마를 만들어냅니다."
    },
    {
        id: "hungaroring",
        name: "Hungaroring",
        location: "헝가리 🇭🇺 (부다페스트)",
        length: "4.381 km",
        laps: 70,
        type: "고정형 (Permanent)",
        image: "hungary.png",
        description: "‘벽 없는 모나코’라 불릴 정도로 좁고 구불구불한 트랙입니다. 추월이 어렵기로 유명하며, 퀄리파잉 순위가 매우 중요합니다."
    },
    {
        id: "zandvoort",
        name: "Circuit Zandvoort",
        location: "네덜란드 🇳🇱 (잔드보르트)",
        length: "4.259 km",
        laps: 72,
        type: "고정형 (Permanent)",
        image: "netherlands.png",
        description: "해안가 모래언덕에 위치한 트랙입니다. 18도에 달하는 가파른 뱅킹 코너가 두 곳이나 있어 드라이버들에게 독특한 도전 과제를 안겨줍니다."
    },
    {
        id: "monza",
        name: "Autodromo Nazionale Monza",
        location: "이탈리아 🇮🇹 (몬자)",
        length: "5.793 km",
        laps: 53,
        type: "고정형 (Permanent)",
        image: "monza.png",
        description: "‘속도의 사원(Temple of Speed)’이라 불리는 F1 역사상 가장 빠른 서킷입니다. 엔진 파워가 가장 중요하며, 티포시(페라리 팬)들의 열광적인 응원이 유명합니다."
    },
    {
        id: "baku",
        name: "Baku City Circuit",
        location: "아제르바이잔 🇦🇿 (바쿠)",
        length: "6.003 km",
        laps: 51,
        type: "도심형 (Street)",
        image: "baku.png",
        description: "극과 극이 공존하는 서킷입니다. F1에서 가장 좁은 구시가지 구간과 가장 긴 2.2km의 초고속 직선 구간이 합쳐져 있어 예측 불가능한 경기가 펼쳐집니다."
    },
    {
        id: "singapore",
        name: "Marina Bay Street Circuit",
        location: "싱가포르 🇸🇬 (마리나 베이)",
        length: "4.940 km",
        laps: 62,
        type: "도심형 (Street)",
        image: "singapore.png",
        description: "F1 최초의 야간 레이스가 열린 곳입니다. 덥고 습한 날씨와 끊임없는 코너, 울퉁불퉁한 노면 때문에 드라이버에게 체력적으로 가장 힘든 경기입니다."
    },
    {
        id: "cota",
        name: "Circuit of The Americas",
        location: "미국 🇺🇸 (오스틴)",
        length: "5.513 km",
        laps: 56,
        type: "고정형 (Permanent)",
        image: "usa.png",
        description: "급격한 오르막으로 시작되는 1번 코너가 상징적입니다. 전 세계 유명 서킷들의 특징을 모아 설계되어 드라이버와 팬 모두에게 인기가 높습니다."
    },
    {
        id: "mexico",
        name: "Autódromo Hermanos Rodríguez",
        location: "멕시코 🇲🇽 (멕시코시티)",
        length: "4.304 km",
        laps: 71,
        type: "고정형 (Permanent)",
        image: "mexico.png",
        description: "해발 2,200m 고지대에 위치해 공기가 희박합니다. 이로 인해 다운포스가 줄어들고 엔진 냉각이 어려워 기술적인 변수가 많이 발생합니다."
    },
    {
        id: "brazil",
        name: "Autódromo de Interlagos",
        location: "브라질 🇧🇷 (상파울루)",
        length: "4.309 km",
        laps: 71,
        type: "고정형 (Permanent)",
        image: "brazil.png",
        description: "날씨 변덕이 심해 수많은 명경기가 탄생한 곳입니다. 시계 반대 방향으로 주행하며, 고저차가 심하고 관중들의 열기가 뜨겁습니다."
    },
    {
        id: "vegas",
        name: "Las Vegas Strip Circuit",
        location: "미국 🇺🇸 (라스베이거스)",
        length: "6.201 km",
        laps: 50,
        type: "도심형 (Street)",
        image: "vegas.png",
        description: "화려한 라스베이거스 스트립의 야경을 가로지르는 최신 시가지 서킷입니다. 긴 직선 구간에서의 최고 속도 대결이 볼거리입니다."
    },
    {
        id: "qatar",
        name: "Lusail International Circuit",
        location: "카타르 🇶🇦 (루사일)",
        length: "5.419 km",
        laps: 57,
        type: "고정형 (Permanent)",
        image: "qatar.png",
        description: "원래 모토GP를 위해 지어진 서킷으로, 흐름이 끊기지 않는 고속 코너들이 이어집니다. 타이어 마모가 심해 전략 싸움이 치열합니다."
    },
    {
        id: "abudhabi",
        name: "Yas Marina Circuit",
        location: "아랍에미리트 🇦🇪 (아부다비)",
        length: "5.281 km",
        laps: 58,
        type: "고정형 (Permanent)",
        image: "abudhabi.png",
        description: "시즌의 피날레를 장식하는 서킷입니다. 해질녘에 시작해 밤에 끝나는 '트와일라잇 레이스'로, 화려한 조명과 호텔 밑을 통과하는 코스가 특징입니다."
    }
];