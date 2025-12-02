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
CREATE TABLE IF NOT EXISTS News (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT,  -- 뉴스 목록에서 보여줄 짧은 요약
    content TEXT NOT NULL, -- 뉴스 상세 내용
    image_url VARCHAR(255), -- 뉴스 썸네일 이미지 주소
    source VARCHAR(100), -- 출처 (예: F1 Official, Motorsport.com 등)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS News (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT,  -- 뉴스 목록에서 보여줄 짧은 요약
    content TEXT NOT NULL, -- 뉴스 상세 내용
    image_url VARCHAR(255), -- 뉴스 썸네일 이미지 주소
    source VARCHAR(100), -- 출처 (예: F1 Official, Motorsport.com 등)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
USE pitwall_db;

-- 뉴스 데이터 3개 집어넣기
INSERT INTO News (title, summary, content, image_url, source) 
VALUES 
('해밀턴, 2025년 페라리 이적 확정', '충격적인 이적 소식! 루이스 해밀턴이 메르세데스를 떠나 스쿠데리아 페라리로 향합니다.', '7번의 월드 챔피언 루이스 해밀턴이 2025년부터 붉은 수트를 입습니다. 이는 F1 역사상 가장 큰 이적 중 하나로 기록될 것입니다...', 'https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/f_auto/q_auto/content/dam/fom-website/manual/Misc/2024/02/01/Hamilton_Ferrari_Collage', 'F1 Official'),

('레드불, RB21 리버리 공개 일정 발표', '디펜딩 챔피언 레드불 레이싱이 다가오는 시즌을 위한 새로운 머신을 공개합니다.', '레드불 레이싱이 오는 2월 15일 뉴욕에서 새 시즌 머신 RB21을 공개한다고 밝혔습니다. 에어로 다이내믹 규정 변화에 어떻게 대응했을지 주목됩니다.', 'https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Red%20Bull%20Racing.jpg', 'Motorsport.com'),

('안드레티 캐딜락, F1 진입 승인될까?', 'FIA와 FOM 사이의 줄다리기 속에 11번째 팀의 운명이 곧 결정됩니다.', '미국의 안드레티 글로벌이 GM(캐딜락)과 손잡고 F1 진입을 노리고 있습니다. 기존 팀들의 반대 속에 최종 결정이 임박했습니다.', 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2023/1/6/k72y1414282312937/andretti-cadillac-f1-news', 'BBC Sport');