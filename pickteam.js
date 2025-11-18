// HTML 문서가 모두 로드되면 이 코드를 실행합니다.
document.addEventListener('DOMContentLoaded', () => {

    // HTML에서 버튼과 결과 표시 영역을 찾습니다.
    const calculateButton = document.getElementById('calculate-btn');
    const resultArea = document.getElementById('result-area');
    const quizForm = document.getElementById('f1-quiz-form');

    // 총 질문 개수 (수정 필요 시 이 숫자만 변경)
    const TOTAL_QUESTIONS = 14;

    // 점수 계산 규칙 (Python의 if문을 객체(딕셔너리)로 변경)
    const scoringRules = {
        'q1': {
            "오랜 역사와 전통 그리고 변치 않는 열정": ['Ferrari', 'Williams'],
            "혁신적인 기술과 미래 지향적인 비전": ['RedBull', 'McLaren', 'Mercedes'],
            "강렬한 승부욕과 공격적인 스타일": ['RedBull', 'RB'],
            "언더독 정신과 꾸준한 성장 가능성": ['Williams', 'Haas']
        },
        'q2': {
            "붉은 열정의 상징": ['Ferrari'],
            "실버 애로우의 기술적 우아함": ['Mercedes'],
            "파파야 오렌지의 밝고 역동적인 에너지": ['McLaren'],
            "브리티시 레이싱 그린의 고풍스러운 야망": ['AstonMartin']
        },
        'q3': {
            "깊은 역사와 수많은 전설을 가진 팀": ['Ferrari', 'Williams'],
            "과거의 영광을 되찾으려는 재건의 스토리": ['Williams', 'Sauber'],
            "짧은 역사에도 불구하고 빠르게 정상에 오른 팀": ['RedBull', 'RB'],
            "꾸준히 도전하며 성장하는 독립적인 팀": ['Haas', 'Alpine']
        },
        'q4': {
            "이탈리아의 열정적인 레이싱 문화": ['Ferrari', 'RB'],
            "영국의 모터스포츠 헤리티지": ['Mercedes', 'McLaren', 'Williams'],
            "오스트리아의 젊고 대담한 에너지": ['RedBull'],
            "미국의 도전 정신": ['Haas']
        },
        'q5': {
            "압도적인 지배력으로 승리를 쟁취하는 팀": ['RedBull', 'Mercedes', 'McLaren'],
            "꾸준히 상위권에서 우승을 다투는 팀": ['Ferrari', 'AstonMartin'],
            "중위권에서 치열하게 경쟁하며 포디움에 오르는 팀": ['Alpine'],
            "하위권에서 점진적으로 성장하며 반전을 노리는 팀": ['Williams', 'Sauber', 'Haas']
        },
        'q6': {
            "챔피언십 우승을 목표로 하는 최상위권": ['RedBull', 'Mercedes', 'Ferrari', 'McLaren'],
            "꾸준히 포디움에 오르며 승리를 노리는 상위권": ['AstonMartin'],
            "포인트 피니시와 가끔 포디움을 노리는 중위권": ['Alpine'],
            "개선된 성능으로 순위를 끌어올리는 하위권": ['Williams', 'RB', 'Sauber', 'Haas']
        },
        'q7': {
            "최첨단 기술 개발에 주력하는 팀": ['RedBull', 'McLaren'],
            "검증된 기술을 바탕으로 안정적인 성능을 추구하는 팀": ['Mercedes', 'Ferrari'],
            "비용 효율적인 전략으로 영리하게 경쟁하는 팀": ['Alpine', 'Haas'],
            "새로운 기술 파트너십을 통해 미래를 준비하는 팀": ['AstonMartin', 'Sauber']
        },
        'q8': {
            "전 세계적으로 열정적이고 충성도 높은 팬덤": ['Ferrari', 'Mercedes'],
            "유머와 밈을 즐기며 활발하게 소통하는 팬덤": ['McLaren', 'RB'],
            "드라이버 개인의 매력에 집중하며 소통하는 팬덤": ['RB', 'Alpine'],
            "팀의 헤리티지와 재건 스토리를 함께하는 팬덤": ['Williams', 'Sauber']
        },
        'q9': {
            "비하인드 스토리와 드라이버의 일상을 공유하는 팀": ['McLaren', 'Williams', 'RB'],
            "유머러스하고 트렌디한 콘텐츠로 소통하는 팀": ['Alpine'],
            "팬 참여형 이벤트를 자주 개최하는 팀": ['Mercedes', 'Ferrari'],
            "기술적 통찰력과 데이터 기반 콘텐츠를 제공하는 팀": ['RedBull', 'Haas']
        },
        'q10': {
            "강한 유대감과 소속감을 느낄 수 있는 전통적인 팬클럽": ['Ferrari'],
            "온라인 플랫폼에서 활발하게 교류하고 콘텐츠를 함께 만드는 커뮤니티": ['McLaren', 'RB'],
            "드라이버와의 직접적인 소통 기회가 많은 커뮤니티": ['Alpine'],
            "팀의 가치와 사회적 메시지에 공감하는 커뮤니티": ['AstonMartin', 'Mercedes']
        },
        'q11': {
            "어린 시절부터 체계적인 훈련을 통해 챔피언을 키워내는 아카데미": ['Ferrari', 'RB'],
            "드라이버의 정신적, 신체적, 기술적 성장을 지원하는 프로그램": ['Mercedes', 'AstonMartin'],
            "젊은 인재에게 과감한 기회를 주며 성장시키는 팀": ['Sauber', 'Haas'],
            "경험 많은 베테랑과 유망주를 조화롭게 운영하는 팀": ['Alpine', 'Williams']
        },
        'q12': {
            "지속적인 챔피언십 우승을 목표로 하는 최상위 팀": ['RedBull', 'Mercedes'],
            "새로운 파트너십을 통해 미래를 준비하고 도약을 꿈꾸는 팀": ['AstonMartin'],
            "효율성과 혁신을 통해 중위권 강자로 자리매김하는 팀": ['Alpine', 'Haas'],
            "과거의 영광을 재현하고 다시 정상에 서려는 팀": ['Williams', 'Sauber']
        },
        'q13': {
            "강한 리더십 아래 목표를 향해 일사불란하게 움직이는 팀": ['RedBull'],
            "모든 구성원의 다양성과 포용성을 중요하게 생각하는 팀": ['Mercedes'],
            "유연하고 개방적인 소통을 통해 문제를 해결하는 팀": ['Alpine', 'McLaren'],
            "가족 같은 분위기에서 서로를 지지하며 성장하는 팀": ['Williams']
        },
        'q14': {
            "환경 보호 및 지속 가능성에 적극적인 팀": ['AstonMartin'],
            "모터스포츠 내 다양성과 포용성 증진에 기여하는 팀": ['Mercedes', 'Alpine'],
            "지역 사회와 연계하여 긍정적인 영향을 미치는 팀": ['Williams'],
            "기술 혁신을 통해 미래 사회에 기여하는 팀": ['RedBull', 'McLaren']
        }
    };

    // '결과 확인하기' 버튼을 클릭했을 때 실행할 함수
    calculateButton.addEventListener('click', () => {
        let teamScores = {
            'RedBull': 0, 'Ferrari': 0, 'Mercedes': 0, 'McLaren': 0, 'AstonMartin': 0,
            'Alpine': 0, 'Williams': 0, 'RB': 0, 'Sauber': 0, 'Haas': 0
        };

        // 폼에서 모든 질문(q1~q14)의 답을 가져옵니다.
        const formData = new FormData(quizForm);
        const answers = {};
        
        let answeredCount = 0;

        for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
            const q_id = 'q' + i;
            const answer = formData.get(q_id); // 선택된 radio 버튼의 value
            if (answer) {
                answers[q_id] = answer;
                answeredCount++;
            }
        }
        
        // 모든 질문에 답했는지 확인
        if (answeredCount < TOTAL_QUESTIONS) {
            alert("모든 질문에 답해주세요!");
            resultArea.style.display = 'none'; // 결과창 숨기기
            return; // 계산 중단
        }

        // --- 점수 계산 로직 ---
        for (const q_id in answers) {
            const answerText = answers[q_id];
            // 규칙에 해당 질문과 답변이 있는지 확인
            if (scoringRules[q_id] && scoringRules[q_id][answerText]) {
                const teamsToScore = scoringRules[q_id][answerText];
                // 해당되는 팀들의 점수를 1씩 올림
                for (const team of teamsToScore) {
                    if (teamScores.hasOwnProperty(team)) { // 팀 이름이 유효한지 확인
                        teamScores[team]++;
                    }
                }
            }
        }

        // --- 최고점 팀 찾기 (동점자 처리 포함) ---
        let maxScore = 0;
        let bestTeams = [];

        // Object.values()로 점수들만 뽑아서 최대값을 찾습니다.
        maxScore = Math.max(...Object.values(teamScores));
        
        // 점수가 0이 아닌 경우 (즉, 유효한 선택을 한 경우)
        if (maxScore > 0) {
            // teamScores를 순회하며 최고점과 같은 팀을 bestTeams 배열에 추가
            for (const team in teamScores) {
                if (teamScores[team] === maxScore) {
                    bestTeams.push(team);
                }
            }
        }

        // --- 결과 표시 ---
        if (bestTeams.length > 0) {
            // 동점일 경우 '팀1 또는 팀2' 형식으로 보여줍니다.
            resultArea.textContent = `당신에게 추천하는 팀은 [ ${bestTeams.join(' 또는 ')} ] 입니다!`;
        } else {
            // 이 경우는 모든 답변이 0점일 때 (논리상 발생하기 어려움)
            resultArea.textContent = "추천할 팀을 찾지 못했습니다. 다시 시도해주세요.";
        }
        
        // 숨겨뒀던 결과 영역을 보여줍니다.
        resultArea.style.display = 'block';

        // 결과 영역으로 스크롤
        resultArea.scrollIntoView({ behavior: 'smooth' });
    });
});