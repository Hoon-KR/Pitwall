// driver.js

document.addEventListener('DOMContentLoaded', async () => {
    // async: 비동기 함수 (데이터가 올 때까지 기다릴 수 있음)

    const gridContainer = document.getElementById('driver-grid');

    // (방어 코드)
    if (typeof driverData === 'undefined' || !gridContainer) {
        console.error("데이터나 그리드 컨테이너가 없습니다.");
        return;
    }

    // ============================================================
    // 📡 1. API에서 실시간 점수 가져오기 (NEW)
    // ============================================================
    try {
        // 2025년 데이터가 아직 없으므로 테스트를 위해 'current'(현재시즌)를 씁니다.
        // 나중에는 '2025'로 바꾸면 됩니다.
        const response = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings.json');
        const data = await response.json();

        // API에서 가져온 드라이버 목록
        const apiDrivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        // 우리가 가진 데이터(driverData)를 한 명씩 돌면서 API 데이터와 합체!
        driverData.forEach(localDriver => {
            // API에서 드라이버 번호(permanentNumber)가 같은 사람 찾기
            const match = apiDrivers.find(apiD => apiD.Driver.permanentNumber === String(localDriver.number));

            if (match) {
                // 찾았으면 점수와 순위를 업데이트!
                // stats 객체가 없으면 새로 만듦
                if (!localDriver.stats) localDriver.stats = {};

                localDriver.stats.points = parseFloat(match.points); // 포인트 업데이트
                localDriver.stats.wins = parseInt(match.wins);       // 우승 횟수 업데이트
                // 순위는 배열 정렬로 해결하므로 굳이 저장 안 해도 됨
                console.log(`${localDriver.name} 점수 업데이트 완료: ${match.points}점`);
            }
        });

    } catch (error) {
        console.error("API 데이터를 가져오는데 실패했습니다. 기존 데이터를 사용합니다.", error);
        // 실패해도 괜찮습니다. 우리가 입력해둔 수동 데이터가 있으니까요!
    }
    // ============================================================


    // ========== 2. 포인트 순서대로 정렬 (내림차순) ==========
    driverData.sort((a, b) => {
        const pointsA = a.stats ? a.stats.points : 0;
        const pointsB = b.stats ? b.stats.points : 0;
        return pointsB - pointsA;
    });

    // 팀 컬러 맵
    const teamColors = {
        'mclaren': '#FF8700', 'mercedes': '#00D2BE', 'redbull': '#0600EF',
        'ferrari': '#DC0000', 'williams': '#005AFF', 'rb': '#1633EF',
        'astonmartin': '#006F62', 'haas': '#B6B6B4', 'sauber': '#00E00A', 'alpine': '#0090FF'
    };

    // ========== 3. HTML 생성 (기존 로직) ==========
    gridContainer.innerHTML = ''; 

    driverData.forEach((driver, index) => {
        
        // 팀 컬러 가져오기 (없으면 기본 검정)
        const myColor = teamColors[driver.teamSlug] || '#333';
        
        const points = driver.stats ? driver.stats.points : 0;

        const cardHTML = `
            <a href="driver-detail.html?driver=${driver.slug}" class="card-link">
                
                <div class="driver-card" data-team="${driver.teamSlug}" style="--team-color: ${myColor};">
                    
                    <div class="point-badge" style="border: 2px solid ${myColor}; color: ${myColor};">
                        <span class="rank-idx">${index + 1}위</span>
                        <span class="p-val">${points} PTS</span>
                    </div>

                    <img src="img/drivers/profile/${driver.image}" 
                         alt="${driver.name}" 
                         class="driver-image" 
                         onerror="this.src='images/placeholder.png';">
                    
                    <div class="driver-info">
                        <div class="driver-number">No.${driver.number}</div>

                        <div class="team-info">
                            <img src="img/constructor/logo/${driver.teamLogo}" alt="${driver.team}" class="team-logo-circle">
                            
                            <div class="name-wrapper">
                                <h3>${driver.name}</h3>
                                <div class="name-kr">${driver.nameKr}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </a>
        `;
        
        gridContainer.innerHTML += cardHTML;
    });
});