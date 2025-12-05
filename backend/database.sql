/* Pitwall Database Schema */

-- 데이터베이스 생성 
CREATE DATABASE IF NOT EXISTS pitwall_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pitwall_db;

-- 1. 사용자(Users) 테이블
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE Users ADD COLUMN is_admin TINYINT DEFAULT 0;

SELECT * FROM Users;

UPDATE Users 
SET is_admin = 1 
WHERE username = 'admin';

-- 2. 게시글(Posts) 테이블
CREATE TABLE IF NOT EXISTS Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    views INT DEFAULT 0, -- 조회수
    likes INT DEFAULT 0, -- 좋아요 수
    
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

USE pitwall_db;
-- Posts 테이블에 'image_url' 컬럼 추가 (이게 없어서 글쓰기 에러 남!)
ALTER TABLE Posts ADD COLUMN image_url VARCHAR(255);

-- 3. 댓글(Comments) 테이블
CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 4. 좋아요(PostLikes) 테이블 (중복 방지)
CREATE TABLE IF NOT EXISTS PostLikes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE,
    
    -- 한 유저는 한 글에 한 번만 좋아요 가능
    UNIQUE KEY unique_like (user_id, post_id)
);

-- 5. 뉴스(news) 테이블
USE pitwall_db;
CREATE TABLE IF NOT EXISTS News (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT,  -- 뉴스 목록에서 보여줄 짧은 요약
    content TEXT NOT NULL, -- 뉴스 상세 내용
    image_url VARCHAR(255), -- 뉴스 썸네일 이미지 주소
    source VARCHAR(100), -- 출처 (예: F1 Official, Motorsport.com 등)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from News;

--6. 이메일 인증번호 저장 테이블
USE pitwall_db;
CREATE TABLE EmailVerifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--7. 순위예측 테이블
USE pitwall_db;
CREATE TABLE IF NOT EXISTS Predictions (
    pred_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    round INT NOT NULL, 
    first_place VARCHAR(100),
    second_place VARCHAR(100),
    third_place VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_prediction (user_id, round) 
);


--8. 순위예측 댓글 테이블
USE pitwall_db;
CREATE TABLE IF NOT EXISTS PredictionComments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    round INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

USE pitwall_db;
-- 9. 서킷 테이블 생성
CREATE TABLE Circuits (
    circuit_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    country VARCHAR(50),
    length_km FLOAT,
    laps INT,
    image_url VARCHAR(500),
    description TEXT
);

-- 10. 서킷 기록 테이블 생성
CREATE TABLE CircuitRecords (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    circuit_id INT NOT NULL,
    record_type VARCHAR(50),
    driver_name VARCHAR(100),
    team_name VARCHAR(100),
    record_value VARCHAR(50),
    year INT,
    FOREIGN KEY (circuit_id) REFERENCES Circuits(circuit_id) ON DELETE CASCADE
);

ALTER TABLE Circuits ADD COLUMN view_point TEXT;

USE pitwall_db;





USE pitwall_db;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. 기존 데이터 비우기
TRUNCATE TABLE CircuitRecords;
TRUNCATE TABLE Circuits;

-- 2. 서킷 데이터 넣기 (이미지 경로를 '/img/circuit/파일명'으로 변경함)
INSERT INTO Circuits (name, location, country, length_km, laps, image_url, description, view_point) VALUES
('앨버트 파크 서킷', '멜버른', '호주 🇦🇺', 5.278, 58, '/img/circuit/australia.png', '2025 시즌 개막전이 열리는 곳입니다. 호수 주변 공원 도로를 사용하는 아름다운 서킷으로, 빠른 코너와 좁은 노면이 특징입니다.', '<strong>호수 배경의 고속 시케인:</strong> Turn 9-10 구간을 시속 250km로 아슬아슬하게 통과하는 장면과 4개의 DRS 존을 활용한 치열한 추월 경쟁을 주목하세요.'),
('상하이 인터내셔널 서킷', '상하이', '중국 🇨🇳', 5.451, 56, '/img/circuit/china.png', '타이어 관리가 매우 까다로운 트랙입니다. 끝없이 이어지는 듯한 1번 코너와 F1 캘린더 중 가장 긴 직선 구간 중 하나를 보유하고 있습니다.', '<strong>달팽이 코너:</strong> 끝없이 말려 들어가는 독특한 "Turn 1"에서의 진입 라인 싸움과, 1.2km 백스트레이트 끝에서의 슬립스트림 대결이 백미입니다.'),
('스즈카 서킷', '스즈카', '일본 🇯🇵', 5.807, 53, '/img/circuit/suzuka.png', '드라이버들이 가장 사랑하는 테크니컬 서킷입니다. 독특한 "8자 형태"의 교차 구조와 정교한 S자 코너가 도전 욕구를 불러일으킵니다.', '🎢 <strong>S자 코너 & 130R:</strong> 리듬감이 필수적인 초반 "S자 코너" 구간의 칼 같은 핸들링과, 전설적인 초고속 코너 "130R"을 풀스로틀로 통과하는 담력을 확인하세요.'),
('바레인 인터내셔널 서킷', '사키르', '바레인 🇧🇭', 5.412, 57, '/img/circuit/bahrain.png', '사막 한가운데 위치한 트랙으로, 모래바람과 강한 뒷바람이 변수입니다. 긴 직선과 급제동 구간이 많아 추월이 자주 일어납니다.', '⚔️ <strong>Turn 1 급제동 배틀:</strong> 메인 스트레이트 끝에서 300km/h -> 60km/h로 급감속하며 벌어지는 추월 싸움이 가장 치열합니다.'),
('제다 코니쉬 서킷', '제다', '사우디아라비아 🇸🇦', 6.174, 50, '/img/circuit/saudi.png', 'F1에서 가장 빠른 시가지 서킷입니다. 벽에 닿을 듯 말 듯 질주하는 초고속 코너들이 이어져 있어 스릴과 위험이 공존합니다.', '🚀 <strong>벽과의 아슬아슬한 춤:</strong> 평균 속도 250km/h로 벽을 스치듯 달리는 광기 어린 주행과, 블라인드 코너에서의 사고 변수(세이프티 카)가 승부처입니다.'),
('마이애미 인터내셔널 오토드롬', '마이애미', '미국 🇺🇸', 5.412, 57, '/img/circuit/miami.png', '하드록 스타디움을 중심으로 화려하게 꾸며진 시가지 서킷입니다. 덥고 습한 날씨와 느린 섹션, 긴 직선 구간이 섞여 있어 차량 세팅이 어렵습니다.', '🏖️ <strong>극과 극의 섹션:</strong> 화려한 마리나 구간의 고속 주행 후 이어지는 좁고 느린 "미키마우스" 섹션에서의 실수 유발 가능성을 지켜보세요.'),
('아우토드로모 엔초 에 디노 페라리', '이몰라', '이탈리아 🇮🇹', 4.909, 63, '/img/circuit/imola.png', '페라리의 홈 그라운드와도 같은 유서 깊은 트랙입니다. 트랙 폭이 좁고 고저차가 있어 실수가 용납되지 않는 올드 스쿨 서킷입니다.', '🇮🇹 <strong>올드 스쿨의 품격:</strong> 실수가 용납되지 않는 좁은 트랙과 자갈밭(Gravel Trap)이 변수입니다. 탐부렐로 시케인 탈출 속도가 랩타임을 좌우합니다.'),
('모나코 서킷', '몬테카를로', '모나코 🇲🇨', 3.337, 78, '/img/circuit/monaco.png', 'F1의 보석이라 불리는 가장 화려하고도 까다로운 트랙입니다. 좁은 도로와 가드레일 때문에 추월이 거의 불가능해 예선 성적이 곧 결승 성적이 됩니다.', '💎 <strong>예선이 곧 결승:</strong> 토요일 예선전의 1mm 오차도 없는 가드레일 주행과, 수영장 시케인을 스치듯 통과하는 드라이버들의 정교한 컨트롤을 감상하세요.'),
('바르셀로나-카탈루냐 서킷', '바르셀로나', '스페인 🇪🇸', 4.657, 66, '/img/circuit/spain.png', '공기 역학 성능을 테스트하기 가장 좋은 교과서적인 서킷입니다. 다양한 코너가 섞여 있어 차량의 종합적인 밸런스가 중요합니다.', '📊 <strong>성능의 바로미터:</strong> 차량의 순수한 다운포스 성능 차이가 드러납니다. 1번 코너 진입 전, DRS를 활용한 메인 스트레이트 추월이 주요 포인트입니다.'),
('시르퀴 질 빌뇌브', '몬트리올', '캐나다 🇨🇦', 4.361, 70, '/img/circuit/canada.png', '인공 섬에 만들어진 반시가지 서킷입니다. 마지막 코너의 "챔피언의 벽(Wall of Champions)"은 수많은 전설적인 드라이버들이 충돌한 곳으로 유명합니다.', '🧱 <strong>챔피언의 벽:</strong> 마지막 시케인을 과감하게 공략하다가 누가 벽에 "키스(충돌)"할지 지켜보세요. 트랙에 난입하는 마못(Groundhog)도 의외의 변수입니다.'),
('레드불링', '슈필베르크', '오스트리아 🇦🇹', 4.318, 71, '/img/circuit/austria.png', '짧지만 고저차가 심하고 빠른 서킷입니다. 아름다운 알프스 산맥을 배경으로 하며, 짧은 랩타임 때문에 경기 진행이 매우 빠릅니다.', '⛰️ <strong>3연속 DRS 존:</strong> 고저차가 심한 오르막 1번 코너에서의 몸싸움과, 3개의 DRS 구간에서 엎치락뒤치락하는 꼬리 물기 배틀이 펼쳐집니다.'),
('실버스톤 서킷', '실버스톤', '영국 🇬🇧', 5.891, 52, '/img/circuit/silverstone.png', 'F1이 처음 시작된 성지입니다. 마고츠-베케츠-채플(Maggots-Becketts-Chapel)로 이어지는 초고속 코너 조합은 드라이버와 차량의 한계를 시험합니다.', '🇬🇧 <strong>마고츠-베케츠:</strong> F1 캘린더 중 가장 빠른 코너 조합인 이곳을 브레이크 없이 춤추듯 통과하는 머신의 경이로운 움직임에 집중하세요.'),
('스파-프랑코르샹', '스파', '벨기에 🇧🇪', 7.004, 44, '/img/circuit/spa.png', 'F1 캘린더 중 가장 긴 서킷입니다. 급경사를 오르는 전설적인 "오 루즈(Eau Rouge)" 코너와 변덕스러운 날씨가 드라마를 만들어냅니다.', '🎢 <strong>오 루즈(Eau Rouge):</strong> 롤러코스터처럼 솟구치는 전설의 코너입니다. 7km의 긴 트랙 곳곳에서 비가 오고 안 오는 변덕스러운 날씨가 드라마를 만듭니다.'),
('헝가로링', '부다페스트', '헝가리 🇭🇺', 4.381, 70, '/img/circuit/hungary.png', '“벽 없는 모나코”라 불릴 정도로 좁고 구불구불한 트랙입니다. 추월이 어렵기로 유명하며, 퀄리파잉 순위가 매우 중요합니다.', '⏱️ <strong>전략의 싸움:</strong> 추월이 매우 어렵기 때문에 트랙 위보다는 피트스탑 타이밍(언더컷/오버컷)으로 승부를 거는 치열한 두뇌 싸움이 전개됩니다.'),
('잔드보르트 서킷', '잔드보르트', '네덜란드 🇳🇱', 4.259, 72, '/img/circuit/netherlands.png', '해안가 모래언덕에 위치한 트랙입니다. 18도에 달하는 가파른 뱅킹 코너가 두 곳이나 있어 드라이버들에게 독특한 도전 과제를 안겨줍니다.', '🏎️ <strong>뱅킹 코너:</strong> 18도 경사의 "타잔" 코너와 마지막 뱅킹 코너를 타고 돌아나가는 속도감이 일품입니다. 좁은 트랙 폭 때문에 예선 순위가 중요합니다.'),
('몬차 서킷', '몬차', '이탈리아 🇮🇹', 5.793, 53, '/img/circuit/monza.png', '“속도의 사원(Temple of Speed)”이라 불리는 F1 역사상 가장 빠른 서킷입니다. 엔진 파워가 가장 중요하며, 티포시(페라리 팬)들의 열광적인 응원이 유명합니다.', '⚡ <strong>속도의 사원:</strong> 슬립스트림을 이용한 초고속 직선 추월과, 마지막 "파라볼리카" 코너를 트랙 리미트 한계까지 밀어붙이는 주행을 주목하세요.'),
('바쿠 시티 서킷', '바쿠', '아제르바이잔 🇦🇿', 6.003, 51, '/img/circuit/baku.png', '극과 극이 공존하는 서킷입니다. F1에서 가장 좁은 구시가지 구간과 가장 긴 2.2km의 초고속 직선 구간이 합쳐져 있어 예측 불가능한 경기가 펼쳐집니다.', '🏰 <strong>성벽 vs 직선:</strong> 가장 좁은 "성벽 구간"을 아슬아슬하게 통과하는 긴장감과, 2.2km 직선에서 350km/h로 질주하며 벌어지는 슬립스트림 배틀이 대비를 이룹니다.'),
('마리나 베이 시가 서킷', '싱가포르', '싱가포르 🇸🇬', 4.940, 62, '/img/circuit/singapore.png', 'F1 최초의 야간 레이스가 열린 곳입니다. 덥고 습한 날씨와 끊임없는 코너, 울퉁불퉁한 노면 때문에 드라이버에게 체력적으로 가장 힘든 경기입니다.', '🌃 <strong>야간 레이스:</strong> 고온 다습한 "사우나" 레이스로 드라이버의 체력이 한계에 달합니다. 좁은 시가지 특성상 세이프티 카 출동 확률이 매우 높아 변수가 많습니다.'),
('서킷 오브 디 아메리카스', '오스틴', '미국 🇺🇸', 5.513, 56, '/img/circuit/usa.png', '급경사 오르막으로 시작되는 1번 코너가 상징적입니다. 전 세계 유명 서킷들의 특징을 모아 설계되어 드라이버와 팬 모두에게 인기가 높습니다.', '🤠 <strong>Turn 1 언덕:</strong> 급격한 오르막 맹인 코너인 "Turn 1" 스타트 장면이 압권입니다. 초반 S자 섹션에서의 리듬감 있는 주행도 볼거리입니다.'),
('에르마노스 로드리게스', '멕시코시티', '멕시코 🇲🇽', 4.304, 71, '/img/circuit/mexico.png', '해발 2,200m 고지대에 위치해 공기가 희박합니다. 이로 인해 다운포스가 줄어들고 엔진 냉각이 어려워 기술적인 변수가 많이 발생합니다.', '🏟️ <strong>스타디움 섹션:</strong> 야구장을 통과하는 구간의 엄청난 관중 함성이 압도적입니다. 희박한 공기 때문에 엔진 냉각과 브레이크 관리에 애를 먹는 팀들의 고뇌를 지켜보세요.'),
('인터라고스 서킷', '상파울루', '브라질 🇧🇷', 4.309, 71, '/img/circuit/brazil.png', '날씨 변덕이 심해 수많은 명경기가 탄생한 곳입니다. 시계 반대 방향으로 주행하며, 고저차가 심하고 관중들의 열기가 뜨겁습니다.', '🌦️ <strong>세나 S & 날씨:</strong> 비가 오면 전설적인 경기가 탄생합니다. 내리막으로 떨어지는 "세나 S" 코너와 메인 스트레이트로 이어지는 오르막 가속 구간이 승부처입니다.'),
('라스베이거스 스트립 서킷', '라스베이거스', '미국 🇺🇸', 6.201, 50, '/img/circuit/vegas.png', '화려한 라스베가스 스트립의 야경을 가로지르는 최신 시가지 서킷입니다. 긴 직선 구간에서의 최고 속도 대결이 볼거리입니다.', '🎰 <strong>스트립 야경:</strong> 라스베가스 도심을 가로지르는 최고 속도 대결입니다. 추운 사막 밤 날씨로 인한 "타이어 예열" 문제가 큰 변수로 작용합니다.'),
('루사일 인터내셔널 서킷', '루사일', '카타르 🇶🇦', 5.419, 57, '/img/circuit/qatar.png', '원래 모토GP를 위해 지어진 서킷으로, 흐름이 끊기지 않는 고속 코너들이 이어집니다. 타이어 마모가 심해 전략 싸움이 치열합니다.', '💨 <strong>고속 플로우:</strong> 끊김 없이 이어지는 중고속 코너들의 흐름이 마치 물 흐르는 듯합니다. 타이어에 가해지는 부하가 엄청나서 타이어 펑크 위험 관리가 핵심입니다.'),
('야스 마리나 서킷', '아부다비', '아랍에미리트 🇦🇪', 5.281, 58, '/img/circuit/abudhabi.png', '시즌의 피날레를 장식하는 서킷입니다. 해질녘에 시작해 밤에 끝나는 "트와일라잇 레이스"로, 화려한 조명과 호텔 밑을 통과하는 코스가 특징입니다.', '🎆 <strong>트와일라잇 피날레:</strong> 해가 지며 조명이 켜지는 아름다운 풍경 속에서 시즌 챔피언이 결정됩니다. 긴 직선 구간 끝에서의 추월 시도와 화려한 불꽃놀이가 시즌의 마지막을 장식합니다.');

-- 3. 기록 데이터 다시 넣기 (이전과 동일)
INSERT INTO CircuitRecords (circuit_id, record_type, driver_name, team_name, record_value, year)
SELECT circuit_id, 'Race Lap Record', 'Pedro de la Rosa', 'McLaren', '1:31.447', 2005 FROM Circuits WHERE name LIKE '%바레인%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Lewis Hamilton', 'Mercedes', '5 Wins', 2024 FROM Circuits WHERE name LIKE '%바레인%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Lewis Hamilton', 'Mercedes', '1:30.734', 2021 FROM Circuits WHERE name LIKE '%제다%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Max Verstappen', 'Red Bull', '2 Wins', 2024 FROM Circuits WHERE name LIKE '%제다%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Charles Leclerc', 'Ferrari', '1:19.813', 2024 FROM Circuits WHERE name LIKE '%앨버트%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Michael Schumacher', 'Ferrari', '4 Wins', 2004 FROM Circuits WHERE name LIKE '%앨버트%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Lewis Hamilton', 'Mercedes', '1:30.983', 2019 FROM Circuits WHERE name LIKE '%스즈카%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Michael Schumacher', 'Ferrari', '6 Wins', 2004 FROM Circuits WHERE name LIKE '%스즈카%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Michael Schumacher', 'Ferrari', '1:32.238', 2004 FROM Circuits WHERE name LIKE '%상하이%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Lewis Hamilton', 'Mercedes', '6 Wins', 2019 FROM Circuits WHERE name LIKE '%상하이%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Max Verstappen', 'Red Bull', '1:29.708', 2023 FROM Circuits WHERE name LIKE '%마이애미%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Max Verstappen', 'Red Bull', '2 Wins', 2023 FROM Circuits WHERE name LIKE '%마이애미%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Lewis Hamilton', 'Mercedes', '1:15.484', 2020 FROM Circuits WHERE name LIKE '%이몰라%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Michael Schumacher', 'Ferrari', '7 Wins', 2006 FROM Circuits WHERE name LIKE '%이몰라%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Lewis Hamilton', 'Mercedes', '1:12.909', 2021 FROM Circuits WHERE name LIKE '%모나코%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Ayrton Senna', 'McLaren', '6 Wins', 1993 FROM Circuits WHERE name LIKE '%모나코%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Valtteri Bottas', 'Mercedes', '1:13.078', 2019 FROM Circuits WHERE name LIKE '%빌뇌브%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Lewis Hamilton', 'Mercedes', '7 Wins', 2019 FROM Circuits WHERE name LIKE '%빌뇌브%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Max Verstappen', 'Red Bull', '1:16.330', 2023 FROM Circuits WHERE name LIKE '%카탈루냐%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Lewis Hamilton', 'Mercedes', '6 Wins', 2021 FROM Circuits WHERE name LIKE '%카탈루냐%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Carlos Sainz', 'McLaren', '1:05.619', 2020 FROM Circuits WHERE name LIKE '%레드불링%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Max Verstappen', 'Red Bull', '4 Wins', 2023 FROM Circuits WHERE name LIKE '%레드불링%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Max Verstappen', 'Red Bull', '1:27.097', 2020 FROM Circuits WHERE name LIKE '%실버스톤%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Lewis Hamilton', 'Mercedes', '8 Wins', 2021 FROM Circuits WHERE name LIKE '%실버스톤%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Lewis Hamilton', 'Mercedes', '1:16.627', 2020 FROM Circuits WHERE name LIKE '%헝가로링%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Lewis Hamilton', 'Mercedes', '8 Wins', 2020 FROM Circuits WHERE name LIKE '%헝가로링%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Valtteri Bottas', 'Mercedes', '1:46.286', 2018 FROM Circuits WHERE name LIKE '%스파%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Michael Schumacher', 'Ferrari', '6 Wins', 2002 FROM Circuits WHERE name LIKE '%스파%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Lewis Hamilton', 'Mercedes', '1:11.097', 2021 FROM Circuits WHERE name LIKE '%잔드보르트%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Max Verstappen', 'Red Bull', '3 Wins', 2023 FROM Circuits WHERE name LIKE '%잔드보르트%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Rubens Barrichello', 'Ferrari', '1:21.046', 2004 FROM Circuits WHERE name LIKE '%몬차%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Lewis Hamilton', 'Mercedes', '5 Wins', 2018 FROM Circuits WHERE name LIKE '%몬차%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Charles Leclerc', 'Ferrari', '1:43.009', 2019 FROM Circuits WHERE name LIKE '%바쿠%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Sergio Perez', 'Red Bull', '2 Wins', 2023 FROM Circuits WHERE name LIKE '%바쿠%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Lewis Hamilton', 'Mercedes', '1:35.867', 2023 FROM Circuits WHERE name LIKE '%마리나 베이%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Sebastian Vettel', 'Ferrari', '5 Wins', 2019 FROM Circuits WHERE name LIKE '%마리나 베이%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Charles Leclerc', 'Ferrari', '1:36.169', 2019 FROM Circuits WHERE name LIKE '%오스틴%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Lewis Hamilton', 'Mercedes', '5 Wins', 2017 FROM Circuits WHERE name LIKE '%오스틴%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Valtteri Bottas', 'Mercedes', '1:17.774', 2021 FROM Circuits WHERE name LIKE '%에르마노스%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Max Verstappen', 'Red Bull', '5 Wins', 2023 FROM Circuits WHERE name LIKE '%에르마노스%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Valtteri Bottas', 'Mercedes', '1:10.540', 2018 FROM Circuits WHERE name LIKE '%인터라고스%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Alain Prost', 'McLaren', '6 Wins', 1990 FROM Circuits WHERE name LIKE '%인터라고스%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Oscar Piastri', 'McLaren', '1:35.490', 2023 FROM Circuits WHERE name LIKE '%라스베이거스%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Max Verstappen', 'Red Bull', '1 Win', 2023 FROM Circuits WHERE name LIKE '%라스베이거스%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Max Verstappen', 'Red Bull', '1:24.319', 2023 FROM Circuits WHERE name LIKE '%루사일%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Lewis Hamilton', 'Mercedes', '1 Win', 2021 FROM Circuits WHERE name LIKE '%루사일%'
UNION ALL
SELECT circuit_id, 'Race Lap Record', 'Max Verstappen', 'Red Bull', '1:26.103', 2021 FROM Circuits WHERE name LIKE '%야스 마리나%'
UNION ALL
SELECT circuit_id, 'Most Wins (Driver)', 'Lewis Hamilton', 'Mercedes', '5 Wins', 2019 FROM Circuits WHERE name LIKE '%야스 마리나%';

-- 외래키 체크 다시 활성화
SET FOREIGN_KEY_CHECKS = 1;

-- 확인
SELECT * FROM Circuits;