document.addEventListener('DOMContentLoaded', async () => {
    const gridContainer = document.getElementById('constructor-grid');

    // (방어 코드) 데이터가 없으면 중단
    if (typeof constructorData === 'undefined' || !gridContainer) {
        console.error("데이터나 그리드 컨테이너가 없습니다.");
        return;
    }

    // 드라이버 사진 찾기 도우미 함수
    function getDriverImage(driverName) {
        if (typeof driverData !== 'undefined') {
            // 한글 이름(nameKr)이나 영문 이름(name)으로 매칭
            const found = driverData.find(d => d.nameKr === driverName || d.name === driverName);
            return found ? found.image : 'placeholder.png';
        }
        return 'placeholder.png';
    }

    // 팀별 고유 컬러 맵 (CSS 변수로 주입할 색상)
    const teamColors = {
        'mclaren': '#FF8700',      // 맥라렌
        'mercedes': '#00D2BE',     // 메르세데스
        'redbull': '#3671C6',      // 레드불
        'ferrari': '#E8002D',      // 페라리
        'williams': '#64C4FF',     // 윌리엄스
        'rb': '#6692FF',           // RB
        'astonmartin': '#229971',  // 애스턴마틴
        'haas': '#B6B6B4',         // 하스
        'sauber': '#52E252',       // 자우버
        'alpine': '#0090FF'        // 알핀
    };

    // API의 teamId와 우리 데이터의 teamSlug를 연결해주는 매핑
    const apiIdMap = {
        'red_bull': 'redbull',
        'aston_martin': 'astonmartin',
        'alpine': 'alpine',
        'haas': 'haas',
        'mclaren': 'mclaren',
        'mercedes': 'mercedes',
        'ferrari': 'ferrari',
        'williams': 'williams',
        'rb': 'rb',
        'sauber': 'sauber',
        'kick_sauber': 'sauber'
    };

    // ============================================================
    // 📡 1. API 데이터 가져오기 (실시간 점수 업데이트)
    // ============================================================
    try {
        const [teamRes, driverRes] = await Promise.all([
            fetch('https://api.jolpi.ca/ergast/f1/current/constructorStandings.json'),
            fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings.json')
        ]);

        const teamData = await teamRes.json();
        const driverDataApi = await driverRes.json();

        const apiConstructors = teamData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        const apiDrivers = driverDataApi.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        // 로컬 데이터(constructorData)를 순회하며 API 점수로 업데이트
        constructorData.forEach(localTeam => {
            // (1) 팀 점수 업데이트
            const teamMatch = apiConstructors.find(apiC => {
                const mappedSlug = apiIdMap[apiC.Constructor.constructorId] || apiC.Constructor.constructorId;
                return mappedSlug === localTeam.teamSlug;
            });

            if (teamMatch) {
                localTeam.rank = parseInt(teamMatch.position);
                localTeam.points = parseFloat(teamMatch.points);
            }

            // (2) 드라이버 점수 업데이트
            localTeam.drivers.forEach(localDriver => {
                const driverMatch = apiDrivers.find(apiD => {
                    const apiTeamSlug = apiIdMap[apiD.Constructors[0].constructorId] || apiD.Constructors[0].constructorId;
                    if (apiTeamSlug !== localTeam.teamSlug) return false;
                    return localDriver.name.includes(apiD.Driver.familyName); // 이름 매칭
                });

                if (driverMatch) {
                    localDriver.rank = parseInt(driverMatch.position);
                    localDriver.points = parseFloat(driverMatch.points);
                }
            });
        });

    } catch (error) {
        console.warn("API 데이터를 가져오는데 실패했습니다. 기본 설정된 점수를 사용합니다.", error);
    }

    // ============================================================
    // 📊 2. 점수 순으로 정렬 (높은 점수가 먼저 오도록)
    // ============================================================
    constructorData.sort((a, b) => b.points - a.points);


    // ============================================================
    // 🎨 3. HTML 생성 (카드 만들기)
    // ============================================================
    gridContainer.innerHTML = ''; // 초기화

    constructorData.forEach(team => {
        let driversHTML = '';

        // 팀 컬러 가져오기 (없으면 흰색)
        const myColor = teamColors[team.teamSlug] || '#ffffff';

        // 드라이버 목록 HTML 생성
        team.drivers.forEach(driver => {
            const driverImgFilename = getDriverImage(driver.name); // driver-data.js에서 이미지 찾기

            driversHTML += `
                <div class="driver-row">
                    <div class="driver-left">
                        <img src="img/drivers/profile/${driverImgFilename}" 
                             alt="${driver.name}" 
                             class="driver-face"
                             onerror="this.src='images/placeholder.png';">
                        <div class="driver-info-text">
                            <span class="driver-name">${driver.nameKr || driver.name}</span>
                            <span class="tcam-dot ${driver.tcam}"></span>
                        </div>
                    </div>
                    <div class="driver-stats">
                        <span class="d-rank">${driver.rank}위</span>
                        <span class="d-points">${driver.points} P</span>
                    </div>
                </div>
            `;
        });

        // 카드 전체 HTML 생성
        const cardHTML = `
            <a href="constructor-detail.html?team=${team.teamSlug}" class="team-card-link">
                
                <div class="team-card" data-team="${team.teamSlug}" style="--team-color: ${myColor};">
                    
                    <div class="card-header">
                        <span class="rank-number">${team.rank}</span>
                        <span class="total-points" style="border: 1px solid ${myColor};">${team.points} 포인트</span>
                    </div>

                    <div class="car-image-container">
                        <img src="img/constructor/car/${team.carImage}" alt="${team.teamName}" class="car-image" onerror="this.src='images/placeholder.png';">
                    </div>

                    <div class="team-name-wrapper">
                        <img src="img/constructor/logo/${team.logoImage}" alt="${team.teamName}" class="team-logo-small" onerror="this.src='images/placeholder.png';">
                        <h2 class="team-name-kr">${team.teamNameKr || team.teamName}</h2>
                    </div>

                    <div class="drivers-list">
                        ${driversHTML}
                    </div>

                </div>
            </a>
        `;

        gridContainer.innerHTML += cardHTML;
    });
});