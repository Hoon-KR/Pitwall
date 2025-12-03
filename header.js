// header.js

const headerHTML = `
<header>
  <div class="logo">
    <a href="index.html">Pitwall</a>
  </div>
  <nav>
    <ul>
      <li><a href="pickteam.html">응원 팀 추천</a></li>
      <li><a href="news.html">최신 뉴스</a></li>
      <li><a href="schedule.html">경기 일정</a></li>
      <li><a href="">순위</a></li>
      <li><a href="board.html">커뮤니티</a></li>
      <li class="dropdown-parent">
        <a href="glossary.html">F1 정보 ▾</a>
        <ul class="dropdown-content">
          <li><a href="glossary.html">F1용어사전</a></li>
          <li><a href="driver.html">드라이버</a></li>
          <li><a href="constructor.html">팀</a></li>
          <li><a href="circuit.html">서킷</a></li>
        </ul>
         <li>
            <a href="">Shop ▾</a>
            <ul class="dropdown-content">
              <li><a href="https://f1store.formula1.com/en/">F1 store</a></li>
              <li><a href="https://www.fuelforfans.com/">Fuel for Fans</a></li>
            </ul>
          </li>
      </li>
    </ul>
  </nav>
  <div class="user-actions">
    <div id="logged-out-view">
      <a href="login.html" class="btn">로그인</a>
      <a href="signup.html" class="btn btn-accent">회원가입</a>
    </div>
    <div id="logged-in-view" style="display: none">
      <span id="user-nickname" class="nickname-display"></span>
      <a href="my-info.html" class="btn">내 정보 관리</a>
      <a href="#" id="logout-button" class="btn">로그아웃</a>
    </div>
  </div>
</header>
`;

// 1. HTML 삽입
const placeholder = document.getElementById('header-placeholder');
if (placeholder) {
    placeholder.innerHTML = headerHTML;
}

// 2. 현재 페이지 표시 (Active 클래스 자동 추가)
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // 링크가 현재 페이지와 같거나, 상세 페이지(news-detail.html)에서 부모 메뉴(news.html)를 켜야 할 때
    if (href === currentPath || (currentPath.includes('news-detail') && href === 'news.html')) {
        link.classList.add('active');
        
        // 드롭다운 메뉴(예: 드라이버)라면 부모(F1 정보)에도 active 표시
        const parent = link.closest('.dropdown-parent');
        if (parent) {
            parent.querySelector('a').classList.add('active');
        }
    }
});