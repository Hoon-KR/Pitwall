// detail.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. URL에서 드라이버 slug 값 읽어오기
  const params = new URLSearchParams(window.location.search);
  const driverSlug = params.get("driver");

  // 2. driver-data.js에서 일치하는 드라이버 찾기
  const driver = driverData.find((d) => d.slug === driverSlug);

  // 예외 처리: 드라이버가 없을 때
  if (!driver) {
    document.body.innerHTML =
      '<div style="text-align:center; padding:50px;"><h1>드라이버 정보를 찾을 수 없습니다.</h1><a href="driver.html" class="back-link">돌아가기</a></div>';
    return;
  }

  // 나이 계산 함수
  function calculateAge(dobString) {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // --- 3. HTML 요소에 데이터 채워 넣기 ---

  // 이미지
  document.getElementById(
    "driver-img"
  ).src = `img/drivers/detail/${driver.image}`;
  document.getElementById("driver-img").alt = driver.name;

  // 이름 (영문/한글)
  document.getElementById("driver-name").textContent = driver.name;
  document.getElementById("driver-name-kr").textContent = driver.nameKr;

  const nationality = driver.nationality || "";
    let flagFile = "default.png"; // 기본값

    // 국적 텍스트에 포함된 단어를 보고 파일명 결정
    if (nationality.includes("British")) flagFile = "영국.png";
    else if (nationality.includes("Italian")) flagFile = "이탈리아.png";
    else if (nationality.includes("Monegasque")) flagFile = "모나코.png";
    else if (nationality.includes("Australian")) flagFile = "호주.png";
    else if (nationality.includes("Dutch")) flagFile = "네덜란드.png";
    else if (nationality.includes("Mexican")) flagFile = "멕시코.png";
    else if (nationality.includes("Spanish")) flagFile = "스페인.png";
    else if (nationality.includes("Canadian")) flagFile = "캐나다.png";
    else if (nationality.includes("Thai")) flagFile = "태국.png";
    else if (nationality.includes("Japanese")) flagFile = "일본.png";
    else if (nationality.includes("New Zealander")) flagFile = "뉴질랜드.png";
    else if (nationality.includes("German")) flagFile = "독일.png";
    else if (nationality.includes("Brazilian")) flagFile = "브라질.png";
    else if (nationality.includes("French")) flagFile = "프랑스.png";
    else if (nationality.includes("Argentine")) flagFile = "아르헨티나.png";

    // 이미지 src 설정
    document.getElementById('driver-flag').src = `img/country/${flagFile}`;
    document.getElementById('driver-flag').alt = nationality;

  // 드라이버 번호
  const numberEl = document.getElementById("driver-number");
  numberEl.textContent = `No. ${driver.number}`;

  // 상세 정보
  document.getElementById("driver-nationality").textContent =
    driver.nationality;
  document.getElementById("driver-dob").textContent = driver.dob;
  document.getElementById("driver-team").textContent = driver.team;

  // 나이 계산
  if (driver.dob) {
    const age = calculateAge(driver.dob);
    document.getElementById("driver-age").textContent = `만 ${age}세`;
  } else {
    document.getElementById("driver-age").textContent = "N/A";
  }

  const stats = driver.stats || {};
    document.getElementById('stat-champ').textContent = stats.championships || 0;
    document.getElementById('stat-wins').textContent = stats.wins || 0;
    document.getElementById('stat-podiums').textContent = stats.podiums || 0;
    document.getElementById('stat-poles').textContent = stats.poles || 0;
    document.getElementById('stat-points').textContent = stats.points || 0;
    document.getElementById('stat-entries').textContent = stats.entries || 0;

  // 커리어 리스트
  const careerList = document.getElementById("driver-career");
  careerList.innerHTML = ""; // 초기화

  if (driver.career && driver.career.length > 0) {
    driver.career.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.years}</strong> : ${item.team}`;
      careerList.appendChild(li);
    });
  } else {
    careerList.innerHTML = "<li>등록된 커리어 정보가 없습니다.</li>";
  }

  // ========== 🎨 4. 팀 컬러 적용 로직 (수정됨) ==========

  // 팀별 색상표 정의
  const teamColors = {
    mclaren: "#FF8700", // 맥라렌 오렌지
    mercedes: "#00D2BE", // 메르세데스 민트
    redbull: "#0600EF", // 레드불 네이비
    ferrari: "#DC0000", // 페라리 레드
    williams: "#005AFF", // 윌리엄스 블루
    rb: "#1633EF", // RB 블루
    astonmartin: "#006F62", // 애스턴마틴 그린
    haas: "#B6B6B4", // 하스 그레이
    sauber: "#00E00A", // 자우버 네온 그린
    alpine: "#0090FF", // 알핀 블루
  };

  // 현재 드라이버 팀의 색상 가져오기 (없으면 기본 검정)
  const myColor = teamColors[driver.teamSlug] || "#333";

  // 메인 컨테이너에 팀 컬러
  document.querySelector(".profile-container").style.borderLeftColor = myColor;

  // (1) 드라이버 넘버 뱃지: 배경은 투명, 테두리만 팀 컬러, 글자는 검정
  numberEl.style.backgroundColor = "transparent";
  numberEl.style.borderColor = myColor;
  //numberEl.style.color = '#333'; // 글자색은 항상 진한 회색(검정) 유지

  // (2) 소제목(h2)들: 글자는 그대로 두고, '막대기(왼쪽 테두리)'만 팀 컬러로 변경
  const headings = document.querySelectorAll(".profile-info h2");
  headings.forEach((h2) => {
    // h2.style.color = myColor;  <-- ❌ 이 줄을 삭제했습니다! (글자색 변경 안 함)
    h2.style.borderLeftColor = myColor; // ✅ 막대기(왼쪽 테두리) 색깔만 변경
  });

  // ==================================================
});
