document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("schedule-grid");

  // 국기 이미지 매핑
  function getFlagImage(country) {
    const map = {
      Australia: "호주.png",
      China: "중국.png",
      Japan: "일본.png",
      Bahrain: "바레인.png",
      "Saudi Arabia": "사우디아라비아.png",
      USA: "미국.png",
      Italy: "이탈리아.png",
      Monaco: "모나코.png",
      Spain: "스페인.png",
      Canada: "캐나다.png",
      Austria: "오스트리아.png",
      UK: "영국.png",
      Belgium: "벨기에.png",
      Hungary: "헝가리.png",
      Netherlands: "네덜란드.png",
      Azerbaijan: "아제르바이잔.png",
      Singapore: "싱가포르.png",
      Mexico: "멕시코.png",
      Brazil: "브라질.png",
      Qatar: "카타르.png",
      "Abu Dhabi": "아부다비.png",
    };
    return map[country] || "default.png";
  }

  // 카드 생성
  scheduleData.forEach((gp, index) => {
    let sessionsHTML = "";

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

                        <a href="circuit.html" class="circuit-link" title="서킷 상세 정보 보기">
                            <img src="img/circuit/${gp.circuitImage}" class="circuit-layout-img" alt="Track" onerror="this.style.opacity='0'">
                        </a>

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

// KST -> Local 변환 함수
function convertToLocal(inputDate, inputTime, localGmt) {
  const koreaGmt = 9;
  const diff = localGmt - koreaGmt;
  const year = 2025;

  let datePart = inputDate.split(" ")[0];
  let [month, day] = datePart.split("/").map(Number);
  let [hour, minute] = inputTime.split(":").map(Number);

  const dateObj = new Date(year, month - 1, day, hour, minute);
  dateObj.setHours(dateObj.getHours() + diff);

  const newMonth = dateObj.getMonth() + 1;
  const newDay = dateObj.getDate();
  const newHour = dateObj.getHours().toString().padStart(2, "0");
  const newMin = dateObj.getMinutes().toString().padStart(2, "0");

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const newDayOfWeek = dayNames[dateObj.getDay()];

  return {
    date: `${newMonth}/${newDay} (${newDayOfWeek})`,
    time: `${newHour}:${newMin}`,
  };
}

// 토글 버튼 클릭 핸들러
function toggleTimezone(element, gpIndex) {
  const switchEl = element.querySelector(".switch");
  const labelEl = element.querySelector(".toggle-label");
  const gpData = scheduleData[gpIndex];

  const isLocalMode = switchEl.classList.toggle("active");

  // 1. 토글 버튼 라벨 색상 변경
  if (isLocalMode) {
    labelEl.textContent = "트랙 현지 시간";
    labelEl.style.color = "#e10600"; // 강조색 (빨강)
  } else {
    labelEl.textContent = "한국 시간 (KST)";
    // 👇 연한 네이비색 (#8892b0) 으로 복구
    labelEl.style.color = "#8892b0";
  }

  // 2. 세션 시간 업데이트
  const sessionRows = document.querySelectorAll(
    `#schedule-grid .race-card:nth-child(${gpIndex + 1}) .session-row`
  );

  sessionRows.forEach((row) => {
    const dateSpan = row.querySelector(".s-date");
    const timeSpan = row.querySelector(".s-time");

    const kstDate = row.dataset.kstDate;
    const kstTime = row.dataset.kstTime;

    if (isLocalMode) {
      // [현지 시간 모드]
      const converted = convertToLocal(kstDate, kstTime, gpData.gmtOffset);

      dateSpan.textContent = converted.date;
      timeSpan.textContent = converted.time;

      // 👇 날짜: 항상 흰색 유지
      dateSpan.style.color = "#ffffff";

      // 👇 시간: 현지 시간임을 강조하기 위해 빨간색으로 변경
      timeSpan.style.color = "#e10600";
    } else {
      // [한국 시간 모드]
      dateSpan.textContent = kstDate;
      timeSpan.textContent = kstTime;

      // 👇 날짜: 항상 흰색 유지
      dateSpan.style.color = "#ffffff";

      // 👇 시간: 원래대로 흰색 복구
      timeSpan.style.color = "#ffffff";
    }

    // 폰트 굵기는 CSS에서 이미 bold로 설정했으므로 JS에서 건드리지 않음 (항상 굵게 유지됨)
  });
}
