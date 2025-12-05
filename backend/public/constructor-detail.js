document.addEventListener('DOMContentLoaded', () => {

    // 1. URL에서 ?team=mclaren 같은 파라미터 가져오기
    const params = new URLSearchParams(window.location.search);
    const teamSlug = params.get('team');

    // 2. 데이터에서 해당 팀 찾기
    const team = constructorData.find(t => t.teamSlug === teamSlug);

    // 팀이 없으면 에러 표시
    if (!team) {
        document.body.innerHTML = '<h1 style="color:white; text-align:center; margin-top:100px;">팀 정보를 찾을 수 없습니다.</h1>';
        document.body.style.backgroundColor = '#222';
        return;
    }

    // 3. HTML 요소들에 데이터 채워 넣기
    document.getElementById('d-name-full').textContent = team.teamNameFull;
    document.getElementById('d-base').textContent = team.base;

    const baseLocation = team.base || "";
    let flagFile = "";

    // 본거지 텍스트에 포함된 국가명으로 파일 찾기
    if (baseLocation.includes("United Kingdom")) flagFile = "영국.png";
    else if (baseLocation.includes("Italy")) flagFile = "이탈리아.png";
    else if (baseLocation.includes("Switzerland")) flagFile = "스위스.png"; // 자우버
    else if (baseLocation.includes("United States")) flagFile = "미국.png";       // 하스
    else if (baseLocation.includes("France")) flagFile = "프랑스.png";           // 알핀
    else if (baseLocation.includes("Germany")) flagFile = "독일.png";         // (혹시 모를 대비)
    
    // 국기 이미지 설정
    const flagImg = document.getElementById('d-flag');
    if (flagFile) {
        flagImg.src = `img/country/${flagFile}`;
        flagImg.style.display = 'inline-block'; // 이미지가 있을 때만 보이기
    } else {
        flagImg.style.display = 'none'; // 없으면 숨김
    }

    document.getElementById('d-logo').src = `img/constructor/logo/${team.logoImage}`;
    document.getElementById('d-car').src = `img/constructor/car/${team.carImage}`;

    // 스펙 정보 채우기
    document.getElementById('d-chief').textContent = team.teamChief;
    document.getElementById('d-tech').textContent = team.techChief;
    document.getElementById('d-chassis').textContent = team.chassis;
    document.getElementById('d-pu').textContent = team.powerUnit;
    document.getElementById('d-entry').textContent = team.firstEntry;
    document.getElementById('d-titles').textContent = team.worldChampionships;

    // 역사(History) 채우기
    document.getElementById('d-history').textContent = team.history;

    // 4. 🎨 팀별 테마 컬러 적용 (배경색 바꾸기)
    const heroSection = document.getElementById('hero-section');

    // 팀별 고유 컬러 매핑
    const teamColors = {
        'mclaren': '#FF8700',      // 파파야 오렌지
        'mercedes': '#00D2BE',     // 페트로나스 그린 (약간 어둡게 처리 추천하지만 원색 유지)
        'redbull': '#0600EF',      // 네이비 블루
        'ferrari': '#DC0000',      // 스쿠데리아 레드
        'williams': '#005AFF',     // 윌리엄스 블루
        'rb': '#1633EF',           // 비자 캐시앱 블루
        'astonmartin': '#006F62',  // 브리티시 그린
        'haas': '#B6B6B4',         // 그레이
        'sauber': '#00E00A',       // 킥 그린
        'alpine': '#0090FF'        // 알핀 블루
    };

    const bgColor = teamColors[teamSlug] || '#333'; // 색 없으면 기본 검정
    heroSection.style.backgroundColor = bgColor;

    // 배경이 밝은 팀(메르세데스, 맥라렌, 하스, 자우버)은 글자색을 검정으로, 나머지는 흰색으로
    const lightBackgroundTeams = ['mercedes', 'haas', 'sauber', 'mclaren'];

    if (lightBackgroundTeams.includes(teamSlug)) {
        heroSection.style.color = '#000';
        document.querySelector('.back-btn').style.color = '#000'; // 뒤로가기 버튼도 검정
    } else {
        heroSection.style.color = '#fff';
        document.querySelector('.back-btn').style.color = '#fff'; // 뒤로가기 버튼 흰색
    }
});