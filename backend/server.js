const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./config/db"); // db.js 파일 import
const jwt = require("jsonwebtoken");
const { protect } = require("./middleware/authMiddleware");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET;

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 데이터베이스 연결 테스트
async function testDbConnection() {
  try {
    await db.getConnection();
    console.log("✅ 데이터베이스 연결 성공!");
  } catch (error) {
    console.error("❌ 데이터베이스 연결 실패:", error);
  }
}

testDbConnection(); // 서버 시작 시 DB 연결 테스트 실행

// 기본 테스트 라우트
app.get("/", (req, res) => {
  res.send("Pitwall 백엔드 서버가 실행 중입니다.");
});

// 회원가입 API 라우트
app.post("/api/signup", async (req, res) => {
  // 1. 프론트엔드에서 보낸 정보 받기
  const { username, password, nickname, email } = req.body;

  try {
    // 2. 비밀번호 암호화 🔒
    const saltRounds = 10; // 암호화 강도 설정
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. 데이터베이스에 사용자 정보 저장
    const sql =
      "INSERT INTO Users (username, password, nickname, email) VALUES (?, ?, ?, ?)";
    const values = [username, hashedPassword, nickname, email];

    await db.query(sql, values);

    // 4. 성공 응답 보내기 ✅
    res.status(201).json({ message: "회원가입 성공!" });
  } catch (error) {
    console.error("회원가입 처리 중 오류 발생:", error);

    // 5. 오류 처리 (특히 중복된 값 입력 시)
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "이미 사용 중인 아이디, 닉네임, 또는 이메일입니다." });
    }

    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

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
      // 5. 로그인 성공: 토큰 발급
      // 토큰에 사용자의 고유 ID(user_id)와 닉네임을 담습니다.
      const token = jwt.sign(
        {
          user_id: user.user_id,
          nickname: user.nickname,
        },
        JWT_SECRET_KEY,
        { expiresIn: "1h" } // 1시간 동안 유효
      );

      res.status(200).json({
        message: "로그인 성공!",
        token: token, // 닉네임 대신 토큰을 전송
        nickname: user.nickname, // 헤더에 표시할 닉네임도 함께 전송
      });
    } else {
      res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error("로그인 처리 중 오류 발생:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 1. 내 정보 불러오기 API (GET /api/my-info)
// 'protect' 미들웨어가 먼저 실행되어 사용자를 검증합니다.
app.get("/api/my-info", protect, async (req, res) => {
  try {
    // protect 미들웨어가 req.user에 저장해준 user_id를 사용합니다.
    const sql = "SELECT username, email FROM Users WHERE user_id = ?";
    const [results] = await db.query(sql, [req.user.user_id]);

    if (results.length > 0) {
      res.status(200).json(results[0]); // { username: '...', email: '...' }
    } else {
      res.status(404).json({ message: "사용자 정보를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("정보 조회 중 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 2. 닉네임 변경 API (PUT /api/my-info/nickname)
app.put("/api/my-info/nickname", protect, async (req, res) => {
  const { nickname } = req.body;
  const { user_id } = req.user;

  try {
    // 닉네임 중복 검사
    const checkSql =
      "SELECT user_id FROM Users WHERE nickname = ? AND user_id != ?";
    const [existing] = await db.query(checkSql, [nickname, user_id]);

    if (existing.length > 0) {
      return res.status(409).json({ message: "이미 사용 중인 닉네임입니다." });
    }

    // 닉네임 업데이트
    const updateSql = "UPDATE Users SET nickname = ? WHERE user_id = ?";
    await db.query(updateSql, [nickname, user_id]);

    res.status(200).json({
      message: "닉네임이 성공적으로 변경되었습니다.",
      newNickname: nickname,
    });
  } catch (error) {
    console.error("닉네임 변경 중 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 3. 비밀번호 변경 API (PUT /api/my-info/password)
app.put("/api/my-info/password", protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { user_id } = req.user;

  try {
    // 1. 현재 비밀번호 확인
    const sql = "SELECT password FROM Users WHERE user_id = ?";
    const [results] = await db.query(sql, [user_id]);
    const user = results[0];

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "현재 비밀번호가 일치하지 않습니다." });
    }

    // 2. 새 비밀번호 암호화 및 업데이트
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    const updateSql = "UPDATE Users SET password = ? WHERE user_id = ?";
    await db.query(updateSql, [hashedNewPassword, user_id]);

    res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error) {
    console.error("비밀번호 변경 중 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 1. 새 게시글 작성 API (POST /api/posts)
// 'protect' 미들웨어를 사용해 로그인한 사용자만 글을 쓸 수 있게 함
app.post("/api/posts", protect, async (req, res) => {
  // 1. 프론트엔드에서 제목과 내용을 받음
  const { title, content } = req.body;
  // 2. 'protect' 미들웨어가 넣어준 사용자 ID를 받음
  const { user_id } = req.user;

  try {
    // 3. 제목이나 내용이 비었는지 확인
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "제목과 내용을 모두 입력해주세요." });
    }

    // 4. DB에 게시글 저장
    const sql = "INSERT INTO Posts (title, content, user_id) VALUES (?, ?, ?)";
    await db.query(sql, [title, content, user_id]);

    res.status(201).json({ message: "게시글이 성공적으로 등록되었습니다." });
  } catch (error) {
    console.error("게시글 작성 중 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 2. 전체 게시글 목록 불러오기 API (GET /api/posts)
// (게시글 목록은 로그인하지 않아도 볼 수 있으므로 'protect' 미들웨어가 없음)
app.get("/api/posts", async (req, res) => {
  try {
    // Users 테이블과 연결하여 user_id 대신 nickname을 가져옴
    const sql = `
            SELECT p.post_id, p.title, p.created_at, u.nickname 
            FROM Posts p
            JOIN Users u ON p.user_id = u.user_id
            ORDER BY p.created_at DESC
        `;
    // ORDER BY ... DESC -> 최신순으로 정렬

    const [posts] = await db.query(sql);

    // 3. 조회된 게시글 목록을 JSON 배열로 응답
    res.status(200).json(posts);
  } catch (error) {
    console.error("게시글 목록 조회 중 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
