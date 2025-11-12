const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "pitwall_secret_key"; // server.js와 동일한 키

const protect = (req, res, next) => {
  let token;

  // 1. 요청 헤더에서 토큰 추출
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 'Bearer ' 부분을 제거하고 토큰만 분리
      token = req.headers.authorization.split(" ")[1];

      // 2. 토큰 검증
      const decoded = jwt.verify(token, JWT_SECRET_KEY);

      // 3. 검증 성공 시, 요청 객체(req)에 사용자 정보 추가
      req.user = decoded; // { user_id: ..., nickname: ... }
      next(); // 다음 미들웨어 또는 API 로직으로 이동
    } catch (error) {
      console.error("토큰 검증 실패:", error);
      res.status(401).json({ message: "인증 실패: 유효하지 않은 토큰입니다." });
    }
  }

  if (!token) {
    res.status(401).json({ message: "인증 실패: 토큰이 없습니다." });
  }
};

module.exports = { protect };
