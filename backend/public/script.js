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
      sessionStorage.removeItem("token"); //  토큰 삭제
      sessionStorage.removeItem("is_admin"); // 관리자 정보 삭제
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
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          // 로그인 성공!
          // 1. 세션 스토리지에 백엔드가 보내준 '닉네임'과 '토큰'을 저장
          sessionStorage.setItem("loggedInUser", result.nickname); // 헤더 표시용 닉네임
          sessionStorage.setItem("token", result.token); // 인증용 토큰
          sessionStorage.setItem("is_admin", result.is_admin); // 관리자 여부 저장

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

  // --- 4. 회원가입 폼 처리 (이메일 인증 기능 추가됨) ---
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    let isEmailVerified = false;

    // [1] 인증번호 받기 버튼
    const sendCodeBtn = document.getElementById("send-code-btn");
    if (sendCodeBtn) {
      sendCodeBtn.addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        if (!email) return alert("이메일을 입력해주세요.");

        // 버튼 중복 클릭 방지 (로딩 효과)
        sendCodeBtn.disabled = true;
        sendCodeBtn.textContent = "전송 중...";

        try {
          const res = await fetch("/api/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true" // ngrok 경고 무시용
            },
            body: JSON.stringify({ email }),
          });

          const data = await res.json();

          if (res.ok) {
            alert(data.message); // "인증번호가 발송되었습니다"
            document.getElementById("verification-group").style.display = "block";
            document.getElementById("email").readOnly = true;
          } else {
            alert(data.message); // "이미 가입된 이메일입니다"
            sendCodeBtn.disabled = false; // 실패 시 버튼 다시 활성화
            sendCodeBtn.textContent = "인증번호 받기";
          }
        } catch (err) {
          console.error(err);
          alert("메일 전송 실패! (서버 콘솔을 확인하세요)");
          sendCodeBtn.disabled = false;
          sendCodeBtn.textContent = "인증번호 받기";
        }
      });
    }

    // [2] 인증번호 확인 버튼 (기존 코드 유지하되 주소만 확인)
    const verifyCodeBtn = document.getElementById("verify-code-btn");
    if (verifyCodeBtn) {
      verifyCodeBtn.addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        const code = document.getElementById("verification-code").value;

        if (!code) return alert("인증번호를 입력해주세요.");

        try {
          const res = await fetch("/api/email/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({ email, code }),
          });

          if (res.ok) {
            alert("이메일 인증 완료!");
            isEmailVerified = true;

            const msgDiv = document.getElementById("verify-message");
            if (msgDiv) {
              msgDiv.textContent = "인증 완료 ✅";
              msgDiv.className = "validation-message success";
            }
            document.getElementById("verification-group").style.display = "none";
            sendCodeBtn.textContent = "인증됨";
          } else {
            alert("인증번호가 일치하지 않습니다.");
          }
        } catch (err) {
          console.error(err);
          alert("오류가 발생했습니다.");
        }
      });
    }

    // [3] 최종 회원가입 버튼 클릭 (기존 코드 수정)
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // 🚨 가장 중요한 부분: 이메일 인증을 안 했으면 가입 차단
      if (!isEmailVerified) {
        return alert("이메일 인증을 먼저 완료해주세요!");
      }

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const nickname = document.getElementById("nickname").value;
      const email = document.getElementById("email").value;

      // 비밀번호 확인 로직 (선택 사항이지만 추천)
      const confirmPassword = document.getElementById("confirm-password").value;
      if (password !== confirmPassword) {
        return alert("비밀번호가 일치하지 않습니다.");
      }

      const formData = { username, password, nickname, email };

      try {
        const response = await fetch("/api/signup", {
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
        const response = await fetch("/api/my-info", {
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
          "/api/my-info/nickname",
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
          "/api/my-info/password",
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
    // [함수 4] 회원 탈퇴 버튼 클릭 처리
    const deleteBtn = document.getElementById("delete-account-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", async () => {
        // 1. 확인 대화상자 띄우기 (실수 방지)
        const isConfirmed = confirm(
          "정말로 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다."
        );

        if (!isConfirmed) return; // 취소 누르면 중단

        try {
          // 2. 탈퇴 API 호출
          const response = await fetch("/api/my-info", {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, // 토큰 필수
            },
          });

          const result = await response.json();

          if (response.ok) {
            alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");

            // 3. 브라우저에 저장된 정보 싹 지우기 (로그아웃 처리)
            sessionStorage.removeItem("loggedInUser");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("is_admin");

            // 4. 메인 페이지로 이동
            window.location.href = "index.html";
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          console.error("탈퇴 처리 중 오류:", error);
          alert(`오류 발생: ${error.message}`);
        }
      });
    }
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
      const response = await fetch("/api/posts");
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
                    <h3><a href="post-detail.html?id=${post.post_id}">${post.title
          }</a></h3>
                    <div class="post-meta">
                        <span>작성자: ${post.nickname}</span> | 
                        <span>${postDate}</span> | 
                        <span>조회 ${post.view || 0}</span> | 
                        <span>👍 ${post.likes || 0}</span>
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
        const response = await fetch("/api/posts", {
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

  // --- 8. '게시글 상세' 페이지 로직 (post-detail.html) ---
  if (document.title.includes("게시글 상세")) {
    // 1. URL에서 글 번호(id) 가져오기 (예: post-detail.html?id=5)
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
      alert("잘못된 접근입니다.");
      window.location.href = "board.html";
    }

    loadPostDetail(postId);
    loadComments(postId);

    // 2. 좋아요 버튼 클릭 이벤트
    document.getElementById("like-btn").addEventListener("click", async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return alert("로그인이 필요합니다.");

      try {
        const res = await fetch(
          `/api/posts/${postId}/like`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          document.getElementById("like-count").textContent = data.likes;
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    });

    // 3. 댓글 작성 이벤트
    document
      .getElementById("comment-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token");
        if (!token) return alert("로그인이 필요합니다.");

        const content = document.getElementById("comment-input").value;

        try {
          const res = await fetch(
            `/api/posts/${postId}/comments`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ content }),
            }
          );
          if (res.ok) {
            document.getElementById("comment-input").value = ""; // 입력창 비우기
            loadComments(postId); // 댓글 목록 새로고침
          } else {
            alert("댓글 작성 실패");
          }
        } catch (err) {
          console.error(err);
        }
      });
  }

  // [함수] 게시글 상세 내용 불러오기
  async function loadPostDetail(id) {
    try {
      const res = await fetch(`/api/posts/${id}`);
      const post = await res.json();
      if (!res.ok) throw new Error(post.message);

      document.getElementById("post-title").textContent = post.title;
      document.getElementById("post-author").textContent = post.nickname;
      document.getElementById("post-date").textContent = new Date(
        post.created_at
      ).toLocaleDateString();
      document.getElementById("post-views").textContent = post.views;
      document.getElementById("post-content").innerText = post.content; // innerText로 줄바꿈 반영
      document.getElementById("like-count").textContent = post.likes;

      //[추가] 삭제 버튼 표시 로직 (관리자 또는 작성자)
      const isAdmin = sessionStorage.getItem("is_admin");
      const currentUser = sessionStorage.getItem("loggedInUser"); // 닉네임

      if (post.nickname === currentUser || isAdmin == "1") {
        const deleteBtn = document.getElementById("delete-btn");
        if (deleteBtn) {
          deleteBtn.style.display = "block";
          // 삭제 이벤트 연결
          deleteBtn.onclick = () => deletePost(id);
        }
      }
    } catch (err) {
      alert("글을 불러올 수 없습니다.");
      window.location.href = "board.html";
    }
  }

  //[추가] 게시글 삭제 함수
  async function deletePost(id) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const token = sessionStorage.getItem("token");

    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("삭제되었습니다.");
      window.location.href = "board.html";
    } else {
      const data = await res.json();
      alert(data.message);
    }
  }

  // [함수] 댓글 목록 불러오기
  async function loadComments(id) {
    const list = document.getElementById("comment-list");
    list.innerHTML = "";
    try {
      const res = await fetch(`/api/posts/${id}/comments`);
      const comments = await res.json();

      comments.forEach((cmt) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    <div class="cmt-meta">
                        <strong>${cmt.nickname}</strong> 
                        <span>${new Date(
          cmt.created_at
        ).toLocaleString()}</span>
                    </div>
                    <div class="cmt-body">${cmt.content}</div>
                `;
        list.appendChild(li);
      });
    } catch (err) {
      console.error(err);
    }
  }
});
