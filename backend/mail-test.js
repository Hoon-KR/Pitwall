// mail-test.js
const nodemailer = require("nodemailer");

async function testMail() {
  // 여기에 본인 정보를 직접 적어서 테스트해봅니다.
  const myEmail = "hanjihh1123@gmail.com";
  const myPass = "rwzkprjeyxartqqc"; // 띄어쓰기 없이

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myEmail,
      pass: myPass,
    },
  });

  try {
    console.log("📨 메일 전송 시도 중...");
    await transporter.sendMail({
      from: myEmail,
      to: myEmail, // 나 자신에게 보내보기
      subject: "[테스트] Pitwall 메일 전송 테스트",
      text: "이 메일이 도착하면 설정은 완벽한 것입니다!",
    });
    console.log("✅ 메일 전송 성공! 아이디/비번은 맞습니다.");
  } catch (error) {
    console.error("❌ 메일 전송 실패!");
    console.error("---------------------------------------------------");
    console.error(error); // 이 에러 내용을 봐야 해결 가능합니다.
    console.error("---------------------------------------------------");
  }
}

testMail();