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



