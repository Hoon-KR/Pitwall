document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('schedule-grid');

    // 국기 이미지 매핑
    function getFlagImage(country) {
        const map = {
            'Australia': '호주.png', 'China': '중국.png', 'Japan': '일본.png',
            'Bahrain': '바레인.png', 'Saudi Arabia': '사우디아라비아.png', 'USA': '미국.png',
            'Italy': '이탈리아.png', 'Monaco': '모나코.png', 'Spain': '스페인.png',
            'Canada': '캐나다.png', 'Austria': '오스트리아.png', 'UK': '영국.png',
            'Belgium': '벨기에.png', 'Hungary': '헝가리.png', 'Netherlands': '네덜란드.png',
            'Azerbaijan': '아제르바이잔.png', 'Singapore': '싱가포르.png', 'Mexico': '멕시코.png',
            'Brazil': '브라질.png', 'Qatar': '카타르.png', 'Abu Dhabi': '아부다비.png'
        };
        return map[country] || 'default.png';
    }

    // 카드 생성
    scheduleData.forEach((gp, index) => {
        let sessionsHTML = '';

        // 초기 렌더링: 데이터에 있는 한국 시간(KST) 그대로 표시
        // data-kst-date와 data-kst-time 속성에 원본 데이터를 저장해둡니다.
        gp.sessions.forEach((session, sIndex) => {
            sessionsHTML += `
                <div class="session-row" id="sess-${index}-${sIndex}" 
                     data-kst-date="${session.date}" data-kst-time="${session.time}">
                    <span class="session-name">${session.name}</span>
                    <div class="session-time">
                        <span class="s-date">${session.date}</span>
                        <span class="s-time">${session.time}</span>
                    </div>
                </div>
            `;
        });

        const flagImg = getFlagImage(gp.country);

        const cardHTML = `
            <div class="race-card">
                <div class="card-header">Round ${gp.round}</div>
                
                <div class="card-body">
                    <div class="gp-info-top">
                        <div class="gp-text">
                            <h2>
                                <img src="img/country/${flagImg}" class="flag-icon" onerror="this.style.display='none'">
                                ${gp.gpName}
                            </h2>
                            <span class="gp-dates">${gp.dates}</span>
                            <p class="circuit-name">${gp.circuitName}</p>
                            <span class="circuit-loc">${gp.location}</span>
                        </div>
                        <img src="img/circuit/${gp.circuitImage}" class="circuit-layout-img" alt="Track" onerror="this.style.opacity='0'">
                    </div>

                    <div class="session-list">
                        ${sessionsHTML}
                    </div>

                    <div class="timezone-toggle" onclick="toggleTimezone(this, ${index})">
                        <div class="switch"></div>
                        <span class="toggle-label">한국 시간 (KST)</span>
                    </div>

                    <button class="result-btn">결과</button>
                </div>
            </div>
        `;
        gridContainer.innerHTML += cardHTML;
    });
});


// ========== 🛠️ 시간 변환 핵심 로직 (수정됨) ==========

// KST(한국시간) -> Local(현지시간) 변환 함수
function convertToLocal(inputDate, inputTime, localGmt) {
    const koreaGmt = 9;
    const diff = localGmt - koreaGmt; // 시차 계산
    const year = 2025; // 2025년 기준

    // 1. 날짜 파싱: "3/14 (금)" -> 월, 일 추출
    // split(' ')으로 날짜와 요일을 분리하고, '/'로 월/일을 나눔
    let datePart = inputDate.split(' ')[0];
    let [month, day] = datePart.split('/').map(Number);

    // 2. 시간 파싱: "10:30" -> 시, 분 추출
    let [hour, minute] = inputTime.split(':').map(Number);

    // 3. 자바스크립트 Date 객체 생성 (월은 0부터 시작하므로 -1)
    const dateObj = new Date(year, month - 1, day, hour, minute);

    // 4. 시차 적용 (setHours가 자동으로 날짜/달/연도 변경까지 처리해줌)
    dateObj.setHours(dateObj.getHours() + diff);

    // 5. 변환된 날짜 포맷팅
    const newMonth = dateObj.getMonth() + 1;
    const newDay = dateObj.getDate();
    const newHour = dateObj.getHours().toString().padStart(2, '0');
    const newMin = dateObj.getMinutes().toString().padStart(2, '0');

    // 6. 요일 구하기 (0:일, 1:월 ... 6:토)
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const newDayOfWeek = dayNames[dateObj.getDay()];

    return {
        date: `${newMonth}/${newDay} (${newDayOfWeek})`, // 예: "3/15 (토)"
        time: `${newHour}:${newMin}`
    };
}

// 토글 버튼 클릭 시 실행되는 함수
function toggleTimezone(element, gpIndex) {
    const switchEl = element.querySelector('.switch');
    const labelEl = element.querySelector('.toggle-label');
    const gpData = scheduleData[gpIndex];

    // active 클래스 토글 (켜짐/꺼짐 상태 변경)
    const isLocalMode = switchEl.classList.toggle('active');

    if (isLocalMode) {
        labelEl.textContent = "트랙 현지 시간";
        labelEl.style.color = "#e10600"; // 강조색
    } else {
        labelEl.textContent = "한국 시간 (KST)";
        labelEl.style.color = "#666";
    }

    // 해당 카드의 모든 세션 시간 업데이트
    const sessionRows = document.querySelectorAll(`#schedule-grid .race-card:nth-child(${gpIndex + 1}) .session-row`);

    sessionRows.forEach(row => {
        const dateSpan = row.querySelector('.s-date');
        const timeSpan = row.querySelector('.s-time');

        // HTML 태그에 저장해둔 원본(KST) 데이터 가져오기
        const kstDate = row.dataset.kstDate;
        const kstTime = row.dataset.kstTime;

        if (isLocalMode) {
            // KST -> Local 변환 실행
            const converted = convertToLocal(kstDate, kstTime, gpData.gmtOffset);

            dateSpan.textContent = converted.date;
            timeSpan.textContent = converted.time;

            // 스타일 강조
            dateSpan.style.fontWeight = "bold";
            dateSpan.style.color = "#333";
            timeSpan.style.fontWeight = "bold";
            timeSpan.style.color = "#e10600";
        } else {
            // 원래 데이터(KST)로 복구
            dateSpan.textContent = kstDate;
            timeSpan.textContent = kstTime;

            // 스타일 원상복구
            dateSpan.style.fontWeight = "normal";
            dateSpan.style.color = "#555";
            timeSpan.style.fontWeight = "normal";
            timeSpan.style.color = "#555";
        }
    });
}