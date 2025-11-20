// glossary.js

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('glossary-list');
    const searchInput = document.getElementById('search-input');

    // 1. 초기 화면 렌더링
    renderGlossary(glossaryData);

    // 2. 검색 기능
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filteredData = glossaryData.filter(item => 
            item.term.toLowerCase().includes(keyword) || 
            item.fullTerm.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword)
        );
        renderGlossary(filteredData);
    });

    // 3. 렌더링 함수
    function renderGlossary(data) {
        listContainer.innerHTML = '';

        if (data.length === 0) {
            listContainer.innerHTML = `<div class="no-result">검색 결과가 없습니다. 🏎️</div>`;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'term-card'; // CSS 클래스 적용
            
            // HTML 구조 생성
            card.innerHTML = `
                <div class="term-header">
                    <span class="term-title">${item.term}</span>
                    <span class="term-subtitle">${item.fullTerm}</span>
                </div>
                <div class="term-body">
                    <p class="term-description">${item.description}</p>
                </div>
            `;
            
            listContainer.appendChild(card);
        });
    }
});