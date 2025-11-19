// glossary.js

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('glossary-list');
    const searchInput = document.getElementById('search-input');

    // 1. 초기 화면 렌더링 (모든 용어 표시)
    renderGlossary(glossaryData);

    // 2. 검색어 입력 이벤트 (실시간 필터링)
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        
        // 검색어에 맞는 용어만 필터링
        const filteredData = glossaryData.filter(item => 
            item.term.toLowerCase().includes(keyword) || 
            item.fullTerm.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword)
        );

        renderGlossary(filteredData);
    });

    // [함수] 용어 리스트를 HTML로 만들어주는 함수
    function renderGlossary(data) {
        listContainer.innerHTML = ''; // 기존 내용 비우기

        if (data.length === 0) {
            listContainer.innerHTML = `<div class="no-result">검색 결과가 없습니다. 🏎️</div>`;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'term-card';
            
            card.innerHTML = `
                <div class="term-header">
                    <span class="term-title">${item.term}</span>
                    <span class="term-subtitle">${item.fullTerm}</span>
                </div>
                <p class="term-description">${item.description}</p>
            `;
            
            listContainer.appendChild(card);
        });
    }
});