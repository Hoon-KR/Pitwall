// driver.js

document.addEventListener('DOMContentLoaded', () => {

    const gridContainer = document.getElementById('driver-grid');

    // (방어 코드) 데이터 확인
    if (typeof driverData === 'undefined' || !gridContainer) {
        console.error("driverData가 로드되지 않았습니다.");
        return;
    }

    // ========== 1. 포인트 순서대로 정렬 (내림차순) ==========
    driverData.sort((a, b) => {
        const pointsA = a.stats ? a.stats.points : 0;
        const pointsB = b.stats ? b.stats.points : 0;
        return pointsB - pointsA; // 높은 점수가 먼저 오도록
    });
    // ====================================================

    // 팀 컬러 맵 (뱃지 테두리 색상용)
    const teamColors = {
        'mclaren': '#FF8700', 'mercedes': '#00D2BE', 'redbull': '#0600EF',
        'ferrari': '#DC0000', 'williams': '#005AFF', 'rb': '#1633EF',
        'astonmartin': '#006F62', 'haas': '#B6B6B4', 'sauber': '#00E00A', 'alpine': '#0090FF'
    };

    // 데이터 순회하며 HTML 생성
    driverData.forEach((driver, index) => {
        
        // 팀 컬러 가져오기
        const myColor = teamColors[driver.teamSlug] || '#333';
        
        // 포인트 가져오기 (없으면 0)
        const points = driver.stats ? driver.stats.points : 0;

        const cardHTML = `
            <a href="driver-detail.html?driver=${driver.slug}" class="card-link">
                <div class="driver-card" data-team="${driver.teamSlug}">
                    
                    <div class="point-badge" style="border: 2px solid ${myColor}; color: ${myColor};">
                        <span class="rank-idx">${index + 1}위</span> <span class="p-val">${points} PTS</span> </div>
                    <img src="img/drivers/profile/${driver.image}" 
                         alt="${driver.name}" 
                         class="driver-image" 
                         onerror="this.src='images/placeholder.png';">
                    
                    <div class="driver-info">
                        <div class="driver-number">No.${driver.number}</div>

                        <div class="team-info">
                            <img src="img/constructor/logo/${driver.teamLogo}" alt="${driver.team}" class="team-logo">
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