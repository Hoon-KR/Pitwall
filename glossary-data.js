// glossary-data.js
const glossaryData = [
    {
        term: "Pitwall",
        fullTerm: "피트월 (현장 작전센터)",
        description: "경기 중 모든 중요한 전략적 판단과 커뮤니케이션의 중심지입니다. 팀의 감독, 레이스 전략가, 엔지니어 등이 이곳에서 모니터링하며 핵심 결정을 내리는 '작전 본부' 역할을 합니다."
    },
    {
        term: "Grand Prix (GP)",
        fullTerm: "그랑프리",
        description: "F1 경기 하나하나를 일컫는 말입니다. (예: 이탈리아 그랑프리, 네덜란드 그랑프리)"
    },
    {
        term: "Circuit",
        fullTerm: "서킷",
        description: "경주를 하는 트랙을 의미합니다. 크게 3가지로 나뉩니다.<br>• <strong>고정형(Permanent):</strong> 전용 상설 트랙 (예: 스즈카, 실버스톤)<br>• <strong>도심형(Street):</strong> 일반 도로를 임시 폐쇄한 트랙 (예: 모나코, 라스베가스)<br>• <strong>하이브리드(Semi-Street):</strong> 일부 구간만 공공도로를 사용 (예: 바쿠, 알버트 파크)"
    },
    {
        term: "Pit",
        fullTerm: "피트",
        description: "서킷 내에서 차량 정비, 타이어 교체, 데이터 분석 등이 이루어지는 차고 공간입니다."
    },
    {
        term: "Pit Stop",
        fullTerm: "피트스탑",
        description: "경기 중 피트로 들어와 타이어나 윙(파손 시)을 교체하는 작업입니다. 모든 드라이버는 마른 노면 경기 시 의무적으로 1번 이상 피트스탑을 해야 합니다."
    },
    {
        term: "Pit Lane",
        fullTerm: "피트레인",
        description: "피트스탑을 위해 차량이 드나드는 도로입니다. 이곳에서는 속도 제한(보통 80km/h)이 엄격하게 적용됩니다."
    },
    {
        term: "Paddock",
        fullTerm: "패독",
        description: "피트 빌딩 뒤편에 위치한 공간으로, 팀 본부(모터홈), 미디어 센터, VIP 존 등이 모여 있는 통제 구역입니다."
    },
    {
        term: "Qualifying",
        fullTerm: "퀄리파잉 (예선)",
        description: "본 경기(레이스)의 출발 순서(그리드)를 정하는 세션입니다. Q1, Q2, Q3 세 단계의 넉아웃 방식으로 진행되며, 가장 빠른 기록을 낸 사람이 맨 앞줄에 섭니다."
    },
    {
        term: "Pole Position",
        fullTerm: "폴 포지션",
        description: "퀄리파잉(예선)에서 1위를 기록하여, 본 레이스에서 맨 앞자리(1번 그리드)에서 출발하는 것을 말합니다."
    },
    {
        term: "Lap",
        fullTerm: "랩",
        description: "서킷을 한 바퀴 도는 것을 의미합니다. (예: 랩 5 = 다섯 번째 바퀴)"
    },
    {
        term: "Lap Time",
        fullTerm: "랩타임",
        description: "서킷 한 바퀴를 도는 데 걸린 시간입니다s."
    },
    {
        term: "DNF",
        fullTerm: "Did Not Finish",
        description: "사고, 차량 고장, 실수 등으로 인해 경기를 끝까지 완주하지 못하고 중도 포기하는 것을 말합니다."
    },
    {
        term: "Podium",
        fullTerm: "포디움",
        description: "1위, 2위, 3위로 경기를 마쳐 시상대에 오르는 것을 의미합니다."
    },
    {
        term: "Points",
        fullTerm: "포인트",
        description: "완주 순위별로 부여되는 시즌 누적 점수입니다. (1위=25점, 2위=18점, 3위=15점 ... 10위=1점)"
    },
    {
        term: "Drivers’ Championship",
        fullTerm: "드라이버 챔피언십 (드챔)",
        description: "시즌 내내 획득한 포인트를 합산하여 결정하는 드라이버 개인 순위 1위 타이틀입니다."
    },
    {
        term: "Constructors’ Championship",
        fullTerm: "컨스트럭터 챔피언십 (컨챔)",
        description: "소속 드라이버들의 포인트를 모두 합산하여 결정하는 팀 순위 1위 타이틀입니다."
    },
    {
        term: "Constructor",
        fullTerm: "컨스트럭터",
        description: "F1 팀을 의미하며, 규정상 차량(섀시)을 직접 제작하는 제작사를 뜻합니다."
    },
    {
        term: "Blue Flag",
        fullTerm: "블루 플래그 (청색기)",
        description: "뒤에서 선두권 차량(한 바퀴 이상 차이 나는 차)이 다가오고 있으니 비켜주라는 신호입니다. 무시하면 페널티를 받습니다."
    },
    {
        term: "Yellow Flag",
        fullTerm: "옐로 플래그 (황색기)",
        description: "트랙에 사고나 위험 요소가 있음을 알리는 신호입니다. 해당 구간에서는 속도를 줄여야 하며 추월이 금지됩니다."
    },
    {
        term: "Black Flag",
        fullTerm: "블랙 플래그 (흑색기)",
        description: "심각한 규정 위반이나 차량 결함으로 인해 특정 드라이버에게 피트로 돌아오라(실격/퇴장)는 명령을 내리는 신호입니다."
    },
    {
        term: "Red / White Flag",
        fullTerm: "레드 / 화이트 플래그",
        description: "• <strong>레드 플래그:</strong> 경기를 중단합니다. (심각한 사고나 악천후)<br>• <strong>화이트 플래그:</strong> 트랙에 느린 차량(엠뷸런스 등)이 있음을 경고합니다."
    },
    {
        term: "Safety Car (SC)",
        fullTerm: "세이프티 카",
        description: "큰 사고나 악천후 시 투입되는 특수 차량입니다. 모든 경주차는 SC 뒤로 줄을 서서 서행해야 하며, SC가 들어와 있는 동안에는 추월이 절대 금지됩니다."
    },
    {
        term: "Virtual Safety Car (VSC)",
        fullTerm: "가상 세이프티 카",
        description: "실제 차량 투입 없이 전자 신호로 발령됩니다. 모든 차량은 트랙 위에서 일정 속도(델타 타임) 이하로 서행해야 하며 추월은 금지됩니다. 비교적 경미한 사고 처리에 사용됩니다."
    },
    {
        term: "Undercut",
        fullTerm: "언더컷",
        description: "앞차보다 <strong>먼저</strong> 피트인하여 새 타이어의 빠른 속도로 격차를 줄인 뒤, 앞차가 피트인하고 나올 때 추월하는 전략입니다."
    },
    {
        term: "Overcut",
        fullTerm: "오버컷",
        description: "앞차보다 <strong>늦게</strong> 피트인하여, 낡은 타이어로도 충분히 빠른 속도를 유지하거나 트랙 상황을 활용해 추월하는 전략입니다."
    },
    {
        term: "Sprint",
        fullTerm: "스프린트",
        description: "일부 그랑프리 주말에 열리는 '미니 레이스'입니다. 약 100km(30분 정도)를 달리며, 1위부터 8위까지 보너스 포인트가 주어집니다."
    },
    {
        term: "Sprint Qualifying (SQ)",
        fullTerm: "스프린트 퀄리파잉",
        description: "스프린트 레이스의 출발 순서를 정하는 예선 세션입니다. 일반 퀄리파잉보다 시간이 짧지만 방식(SQ1, SQ2, SQ3)은 유사합니다."
    },
    {
        term: "DRS",
        fullTerm: "Drag Reduction System",
        description: "리어 윙(뒷날개)을 열어 공기 저항을 줄이고 속도를 높이는 장치입니다. 지정된 구간에서 앞차와 1초 이내일 때만 사용하여 추월을 돕습니다."
    },
    
    {
        term: "DRS",
        fullTerm: "Drag Reduction System",
        description: "뒷날개(리어 윙)를 열어 공기 저항을 줄이고 직선 구간에서 속도를 높이는 장치입니다. 앞차와 1초 이내일 때만 사용 가능하며 추월을 돕습니다."
    },
    {
        term: "Undercut",
        fullTerm: "언더컷",
        description: "앞차보다 **먼저** 피트인하여 새 타이어의 빠른 속도로 앞차와의 격차를 줄인 뒤, 앞차가 피트인하고 나올 때 추월하는 전략입니다."
    },
    {
        term: "Overcut",
        fullTerm: "오버컷",
        description: "앞차가 피트인한 후에도 **더 오래** 트랙에 머물며 랩타임을 벌린 뒤, 나중에 피트인하여 추월하는 전략입니다. (타이어 소모가 적거나 트랙이 비었을 때 유리)"
    },
    {
        term: "Pole Position",
        fullTerm: "폴 포지션",
        description: "예선(Qualifying)에서 1위를 차지하여, 결승 레이스 출발 시 가장 앞자리(맨 앞 그리드)에서 출발하는 것을 말합니다."
    },
    {
        term: "Paddock",
        fullTerm: "패독",
        description: "피트 빌딩 뒤편에 위치한 공간으로, 팀 관계자, 드라이버, 미디어, VIP 등 허가된 인원만 출입할 수 있는 통제 구역입니다."
    },
    {
        term: "Safety Car (SC)",
        fullTerm: "세이프티 카",
        description: "트랙에 큰 사고나 위험 요소가 있을 때 투입되는 차량입니다. 모든 경주차는 SC 추월이 금지되며 속도를 줄여야 합니다."
    },
    {
        term: "Sector",
        fullTerm: "섹터",
        description: "서킷을 3개의 구간으로 나눈 단위입니다. (섹터 1, 2, 3) 각 섹터별 기록을 통해 드라이버의 강약점을 파악할 수 있습니다."
    },
    {
        term: "Box",
        fullTerm: "박스",
        description: "피트(Pit)를 의미합니다. 팀 라디오에서 \"Box, Box\"라고 하면 \"피트인 해라\"라는 뜻입니다."
    }
];