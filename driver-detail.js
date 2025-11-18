// HTML 문서 로드가 끝나면 즉시 실행
document.addEventListener('DOMContentLoaded', () => {

    // 1. URL에서 드라이버 slug 값(예: ?driver=max_verstappen) 읽어오기
    const params = new URLSearchParams(window.location.search);
    const driverSlug = params.get('driver');

    // 2. driver-data.js에서 가져온 driverData 배열에서 slug가 일치하는 드라이버 찾기
    const driver = driverData.find(d => d.slug === driverSlug);

    // 3. 만약 드라이버를 못 찾았으면
    if (!driver) {
        document.body.innerHTML = '<h1>드라이버 정보를 찾을 수 없습니다. <a href="drivers.html">돌아가기</a></h1>';
        return;
    }

    // 4. (편의 함수) 나이 계산기
    function calculateAge(dobString) {
        const today = new Date();
        const birthDate = new Date(dobString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // 5. 찾은 드라이버 정보로 HTML의 빈 '틀' 채우기
    document.getElementById('driver-img').src = `img/drivers/detail/${driver.image}`;
    document.getElementById('driver-img').alt = driver.name;
    document.getElementById('driver-name').textContent = driver.name;
    document.getElementById('driver-number').textContent = `No. ${driver.number}`;
    
    // 기본 정보
    document.getElementById('driver-nationality').textContent = driver.nationality || 'N/A';
    document.getElementById('driver-dob').textContent = driver.dob || 'N/A';
    document.getElementById('driver-team').textContent = driver.team || 'N/A';

    // 나이 계산 (데이터가 있을 때만)
    if (driver.dob) {
        const age = calculateAge(driver.dob);
        document.getElementById('driver-age').textContent = `${age}세`;
    } else {
        document.getElementById('driver-age').textContent = 'N/A';
    }

    // F1 경력 (데이터가 있을 때만)
    const careerList = document.getElementById('driver-career');
    if (driver.career && driver.career.length > 0) {
        driver.career.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.team} (${item.years})`;
            careerList.appendChild(li);
        });
    } else {
        careerList.innerHTML = '<li>정보 없음</li>';
    }
});