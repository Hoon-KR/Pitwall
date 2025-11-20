// circuit.js

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('circuit-list');

    // 서킷 데이터가 없으면 종료
    if (typeof circuitData === 'undefined' || !listContainer) return;

    circuitData.forEach(circuit => {
        const card = document.createElement('div');
        card.className = 'circuit-card';

        // 이미지 경로 (없으면 기본 이미지)
        // ⚠️ 실제 이미지가 'img/circuit/' 폴더에 있어야 합니다.
        const imgSrc = `img/circuit/${circuit.image}`;

        card.innerHTML = `
            <div class="track-image-container">
                <img src="${imgSrc}" alt="${circuit.name}" class="track-map" onerror="this.src='img/placeholder_track.png'">
            </div>
            
            <div class="circuit-info">
                <div class="circuit-header">
                    <div class="circuit-name">${circuit.name}</div>
                    <div class="circuit-flag">${circuit.location.split(" ").pop()}</div> 
                </div>
                
                <div class="circuit-specs">
                    <div class="spec-item">
                        <strong>LENGTH</strong>
                        ${circuit.length}
                    </div>
                    <div class="spec-item">
                        <strong>LAPS</strong>
                        ${circuit.laps}
                    </div>
                    <div class="spec-item">
                        <strong>TYPE</strong>
                        ${circuit.type}
                    </div>
                </div>

                <p class="circuit-desc">${circuit.description}</p>
            </div>
        `;

        listContainer.appendChild(card);
    });
});