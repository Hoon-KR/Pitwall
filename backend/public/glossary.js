// glossary.js

document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("glossary-list");
  const searchInput = document.getElementById("search-input");
  const filterButtons = document.querySelectorAll(".filter-btn"); // 필터 버튼 선택

  // 1. 초기 화면 렌더링 (전체 데이터)
  renderGlossary(glossaryData);

  // 2. 검색 기능 (기존 유지)
  searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();

    // 검색 시 필터 버튼의 'active' 상태를 초기화하는 것이 사용자 경험상 좋습니다.
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    document
      .querySelector('.filter-btn[data-category="all"]')
      .classList.add("active");

    const filteredData = glossaryData.filter(
      (item) =>
        item.term.toLowerCase().includes(keyword) ||
        (item.fullTerm && item.fullTerm.toLowerCase().includes(keyword)) || // fullTerm이 있을 때만 검사
        item.description.toLowerCase().includes(keyword)
    );
    renderGlossary(filteredData);
  });

  // 3. [추가] 카테고리 필터 버튼 기능
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // (1) 버튼 스타일 업데이트
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // (2) 검색창 초기화 (필터링과 검색어가 꼬이지 않게)
      searchInput.value = "";

      // (3) 데이터 필터링
      const category = btn.getAttribute("data-category");

      if (category === "all") {
        renderGlossary(glossaryData);
      } else {
        const filteredData = glossaryData.filter(
          (item) => item.category === category
        );
        renderGlossary(filteredData);
      }
    });
  });

  // 4. 렌더링 함수 (카테고리 라벨 추가됨)
  function renderGlossary(data) {
    listContainer.innerHTML = "";

    if (data.length === 0) {
      listContainer.innerHTML = `<div class="no-result">결과가 없습니다. 🏎️</div>`;
      return;
    }

    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "term-card";

      // 카테고리별 라벨 아이콘/텍스트 설정
      let categoryLabel = "";
      switch (item.category) {
        case "기본":
          categoryLabel = "일반/기타";
          break;
        case "팀 구역":
          categoryLabel = "팀 구역";
          break;
        case "규칙":
          categoryLabel = "규칙";
          break;
        case "포인트":
          categoryLabel = "포인트";
          break;
        case "안전":
          categoryLabel = "안전";
          break;
        case "기술":
          categoryLabel = "기술";
          break;
        default:
          categoryLabel = "";
      }

      // HTML 구조 생성 (헤더에 카테고리 라벨 추가)
      // term-header를 flex로 사용하여 제목과 라벨을 양쪽 끝으로 배치
      card.innerHTML = `
                <div class="term-header">
                    <div>
                        <span class="term-title">${item.term}</span>
                        <span class="term-subtitle">${
                          item.fullTerm || ""
                        }</span>
                    </div>
                    <span style="font-size: 0.85rem; color: var(--accent-color); font-weight: bold; white-space: nowrap; margin-left: 10px;">
                        ${categoryLabel}
                    </span>
                </div>
                <div class="term-body">
                    <p class="term-description">${item.description}</p>
                </div>
            `;

      listContainer.appendChild(card);
    });
  }
});
