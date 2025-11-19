// HTML 문서 로드가 끝나면 즉시 실행
document.addEventListener('DOMContentLoaded', () => {

    // 1. (변경) driverData가 이 파일에 없으므로 grid-container만 가져옴
    const gridContainer = document.getElementById('driver-grid');

    // 2. (방어 코드) driverData가 driver-data.js에서 로드되었는지 확인
    if (typeof driverData === 'undefined' || !gridContainer) {
        console.error("driverData가 로드되지 않았거나 'driver-grid' ID를 찾을 수 없습니다.");
        return;
    }

    // 3. 데이터 순회하며 HTML 생성하기
    driverData.forEach(driver => {
        // (수정) cardHTML 전체를 <a> 태그로 감쌉니다.
        // (수정) <a> 태그의 href에 slug 값을 넣어 상세 페이지로 링크합니다.
        const cardHTML = `
            <a href="driver-detail.html?driver=${driver.slug}" class="card-link">
                <div class="driver-card" data-team="${driver.teamSlug}">
                    
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
        // 4. 생성된 HTML 조각을 그리드 컨테이너에 추가하기
        gridContainer.innerHTML += cardHTML;
    });
});