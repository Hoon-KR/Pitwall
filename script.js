// script.js

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. 페이지 로드 시 로그인 상태 확인 ---
  // (이 코드는 기존과 동일합니다)
  const loggedInView = document.getElementById("logged-in-view");
  const loggedOutView = document.getElementById("logged-out-view");
  const userNicknameSpan = document.getElementById("user-nickname");
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  if (loggedInUser) {
    if (loggedInView && loggedOutView && userNicknameSpan) {
      loggedInView.style.display = "flex";
      loggedOutView.style.display = "none";
      userNicknameSpan.textContent = `${loggedInUser}님`;
    }
  } else {
    if (loggedInView && loggedOutView) {
      loggedInView.style.display = "none";
      loggedOutView.style.display = "flex";
    }
  }

  // --- 2. 로그아웃 버튼 처리 ---
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      sessionStorage.removeItem("loggedInUser"); // 닉네임 삭제
      sessionStorage.removeItem("token"); // 👈 토큰도 함께 삭제
      window.location.reload();
    });
  }

  // --- 3. 로그인 폼 처리 (새로 추가/수정된 부분) ---
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const formData = { username, password };

      try {
        const response = await fetch("http://localhost:3001/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          // 로그인 성공!
          // 1. 세션 스토리지에 백엔드가 보내준 '닉네임'과 '토큰'을 저장
          sessionStorage.setItem("loggedInUser", result.nickname); // 👈 헤더 표시용 닉네임
          sessionStorage.setItem("token", result.token); // 👈 인증용 토큰

          // 2. 메인 페이지로 이동
          window.location.href = "index.html";
        } else {
          // 로그인 실패 (아이디 없음, 비번 틀림 등)
          alert(`로그인 실패: ${result.message}`);
        }
      } catch (error) {
        console.error("로그인 요청 중 오류:", error);
        alert("서버와 통신에 실패했습니다.");
      }
    });
  }

  // --- 4. 회원가입 폼 처리 (기존 코드와 동일) ---
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const nickname = document.getElementById("nickname").value;
      const email = document.getElementById("email").value;
      const formData = { username, password, nickname, email };

      try {
        const response = await fetch("http://localhost:3001/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
          window.location.href = "login.html";
        } else {
          alert(`회원가입 실패: ${result.message}`);
        }
      } catch (error) {
        console.error("회원가입 요청 중 네트워크 오류 발생:", error);
        alert("서버와 통신하는 데 실패했습니다.");
      }
    });
  }

  // --- 5. '내 정보 관리' 페이지 로직 ---
  if (document.title.includes("내 정보 관리")) {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      window.location.href = "login.html";
      return; // 토큰이 없으면 더 이상 스크립트를 실행하지 않음
    }

    //'token'이 선언된 후에 함수 호출
    fetchMyInfo();

    // 나머지 변수 선언
    const nicknameForm = document.getElementById("nickname-form");
    const passwordForm = document.getElementById("password-form");

    // [함수 1] 내 정보 불러오기
    async function fetchMyInfo() {
      try {
        const response = await fetch("http://localhost:3001/api/my-info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("정보를 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        document.getElementById("current-username").textContent = data.username;
        document.getElementById("current-email").textContent = data.email;
      } catch (error) {
        console.error("Error fetching info:", error);
        alert(error.message);
      }
    }

    // [함수 2] 닉네임 변경 폼 제출 처리
    nicknameForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newNickname = document.getElementById("nickname").value;
      const messageDiv = nicknameForm.querySelector(".validation-message");

      try {
        const response = await fetch(
          "http://localhost:3001/api/my-info/nickname",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nickname: newNickname }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          // 409 중복 에러 등
          throw new Error(result.message);
        }

        // 닉네임 변경 성공
        messageDiv.textContent = "닉네임이 변경되었습니다!";
        messageDiv.className = "validation-message success";
        // 헤더의 닉네임도 실시간으로 변경
        sessionStorage.setItem("loggedInUser", result.newNickname);
        document.getElementById(
          "user-nickname"
        ).textContent = `${result.newNickname}님`;
      } catch (error) {
        console.error("Error updating nickname:", error);
        messageDiv.textContent = error.message;
        messageDiv.className = "validation-message error";
      }
    });

    // [함수 3] 비밀번호 변경 폼 제출 처리
    passwordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const currentPassword = document.getElementById("current-password").value;
      const newPassword = document.getElementById("new-password").value;

      try {
        const response = await fetch(
          "http://localhost:3001/api/my-info/password",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ currentPassword, newPassword }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          // 401 비번 불일치 에러 등
          throw new Error(result.message);
        }

        // 비밀번호 변경 성공
        alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
        // 보안을 위해 로그아웃 처리
        sessionStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("token");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Error updating password:", error);
        alert(`오류: ${error.message}`);
      }
    });
  }

  // --- 6. '커뮤니티 게시판' 페이지 로직 (board.html) ---
  if (document.title.includes("Community Board")) {
    // 1. 로그인 상태에 따라 '새 글 작성하기' 버튼 표시
    const writeButton = document.getElementById("write-post-btn");
    if (sessionStorage.getItem("token")) {
      writeButton.style.display = "inline-block";
    }

    // 2. 게시글 목록 불러오기 함수 실행
    fetchPosts();
  }

  // [함수 4] 게시글 목록 불러오기
  async function fetchPosts() {
    const postListDiv = document.getElementById("post-list");
    try {
      const response = await fetch("http://localhost:3001/api/posts");
      if (!response.ok) {
        throw new Error("게시글을 불러오는데 실패했습니다.");
      }
      const posts = await response.json();

      // 로딩 메시지 삭제
      postListDiv.innerHTML = "";

      if (posts.length === 0) {
        postListDiv.innerHTML =
          '<p class="loading-text">아직 작성된 글이 없습니다.</p>';
        return;
      }

      // 게시글 목록을 HTML로 변환하여 삽입
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post-item";

        // 💡 날짜 형식을 'YYYY-MM-DD'로 깔끔하게 변환
        const postDate = new Date(post.created_at).toLocaleDateString("ko-KR");

        postElement.innerHTML = `
                    <h3><a href="#">${post.title}</a></h3>
                    <div class="post-meta">
                        <span>작성자: ${post.nickname}</span> | <span>${postDate}</span>
                    </div>
                `;
        postListDiv.appendChild(postElement);
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      postListDiv.innerHTML = `<p class="loading-text" style="color: #f87171;">${error.message}</p>`;
    }
  }

  // --- 7. '새 글 작성' 페이지 로직 (write.html) ---
  if (document.title.includes("New Post")) {
    const writeForm = document.getElementById("write-form");
    const token = sessionStorage.getItem("token");

    // 1. 토큰(로그인) 없으면 쫓아내기
    if (!token) {
      alert("글을 작성하려면 로그인이 필요합니다.");
      window.location.href = "login.html";
    }

    // 2. 폼 제출 이벤트 처리
    writeForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;

      try {
        const response = await fetch("http://localhost:3001/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //  인증 토큰 전송
          },
          body: JSON.stringify({ title, content }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        // 글쓰기 성공
        alert("게시글이 성공적으로 등록되었습니다.");
        window.location.href = "board.html"; // 👈 목록 페이지로 이동
      } catch (error) {
        console.error("Error creating post:", error);
        alert(`오류: ${error.message}`);
      }
    });
  }
});
