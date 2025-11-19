document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('constructor-grid');

    // 드라이버 사진 찾기 도우미 함수
    function getDriverImage(driverName) {
        if (typeof driverData !== 'undefined') {
            const found = driverData.find(d => d.nameKr === driverName || d.name === driverName);
            return found ? found.image : 'placeholder.png';
        }
        return 'placeholder.png';
    }

    constructorData.forEach(team => {
        let driversHTML = '';

        team.drivers.forEach(driver => {
            const driverImgFilename = getDriverImage(driver.name);
            driversHTML += `
                <div class="driver-row">
                    <div class="driver-left">
                        <img src="img/drivers/profile/${driverImgFilename}" 
                             alt="${driver.name}" 
                             class="driver-face"
                             onerror="this.src='images/placeholder.png';">
                        <div class="driver-info-text">
                            <span class="driver-name">${driver.name}</span>
                            <span class="tcam-dot ${driver.tcam}"></span>
                        </div>
                    </div>
                    <div class="driver-stats">
                        <span class="d-rank">${driver.rank}위</span>
                        <span class="d-points">${driver.points} 포인트</span>
                    </div>
                </div>
            `;
        });

        const cardHTML = `
            <a href="constructor-detail.html?team=${team.teamSlug}" class="team-card-link">
                <div class="team-card" data-team="${team.teamSlug}">
                    
                    <div class="card-header">
                        <span class="rank-number">${team.rank}</span>
                        <span class="total-points">${team.points} 포인트</span>
                    </div>

                    <div class="car-image-container">
                        <img src="img/constructor/car/${team.carImage}" alt="${team.teamName}" class="car-image" onerror="this.src='images/placeholder.png';">
                    </div>

                    <h2 class="team-name">${team.teamName}</h2>

                    <div class="drivers-list">
                        ${driversHTML}
                    </div>

                </div>
            </a>
        `;
        // =========================================================

        gridContainer.innerHTML += cardHTML;
    });
});