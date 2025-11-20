// constructor-data.js
// 2025시즌 10개 F1 팀 전체 데이터

const constructorData = [
    // 1위: 맥라렌
    {
        rank: 1,
        teamName: "맥라렌",
        teamNameFull: "McLaren Formula 1 Team",
        teamSlug: "mclaren",
        points: 756,
        carImage: "맥라렌.png",
        logoImage: "맥라렌.png",

        base: "Woking Surrey, United Kingdom",
        teamChief: "Andrea Stella",
        techChief: "Rob Marshall",
        chassis: "MCL39",
        powerUnit: "Mercedes",
        firstEntry: "1966 ~",
        worldChampionships: "8",
        history: "브루스 맥라렌에 의해 설립된 맥라렌은 F1 역사상 두 번째로 성공적인 팀입니다. 아일톤 세나, 알랭 프로스트, 루이스 해밀턴 등 전설적인 드라이버들과 함께 수많은 우승을 차지했습니다. 최근 젊고 강력한 드라이버 라인업과 기술적 혁신을 통해 긴 암흑기를 끝내고 다시 챔피언십의 최강자로 우뚝 섰습니다.",

        drivers: [
            { name: "랜도 노리스", rank: 1, points: 390, tcam: "yellow" },
            { name: "오스카 피아스트리", rank: 2, points: 366, tcam: "black" }
        ]
    },
    // 2위: 메르세데스
    {
        rank: 2,
        teamName: "메르세데스",
        teamNameFull: "Mercedes-AMG PETRONAS F1 Team",
        teamSlug: "mercedes",
        points: 398,
        carImage: "메르세데스.png",
        logoImage: "메르세데스.png",

        base: "Brackley, United Kingdom",
        teamChief: "Toto Wolff",
        techChief: "James Allison",
        chassis: "W16",
        powerUnit: "Mercedes",
        firstEntry: "1954 ~",
        worldChampionships: "8",
        history: "하이브리드 시대의 절대 지배자. 2014년부터 2021년까지 8년 연속 컨스트럭터 챔피언이라는 전무후무한 대기록을 세웠습니다. '실버 애로우'라 불리며 독일의 정밀한 기술력과 영국의 레이싱 인프라가 결합된 팀입니다. 루이스 해밀턴이 떠난 후, 조지 러셀과 신성 키미 안토넬리 체제로 새로운 시대를 열어가고 있습니다.",

        drivers: [
            { name: "조지 러셀", rank: 4, points: 276, tcam: "black" },
            { name: "키미 안토넬리", rank: 7, points: 122, tcam: "yellow" }
        ]
    },
    // 3위: 레드불
    {
        rank: 3,
        teamName: "레드불",
        teamNameFull: "Oracle Red Bull Racing",
        teamSlug: "redbull",
        points: 366,
        carImage: "레드불.png",
        logoImage: "레드불.png",

        base: "Milton Keynes, United Kingdom",
        teamChief: "Christian Horner",
        techChief: "Pierre Waché",
        chassis: "RB21",
        powerUnit: "Honda RBPT",
        firstEntry: "2005 ~",
        worldChampionships: "6",
        history: "에너지 드링크 회사가 만든 팀으로 시작해 F1의 패러다임을 바꾼 팀입니다. 세바스찬 베텔에 이어 막스 베르스타펜 시대를 열며 압도적인 공기역학 성능과 과감한 전략을 자랑합니다. 특히 2초대의 경이로운 피트스탑 속도는 타의 추종을 불허합니다.",

        drivers: [
            { name: "막스 베르스타펜", rank: 3, points: 341, tcam: "black" },
            { name: "츠노다 유키", rank: 17, points: 28, tcam: "yellow" }
        ]
    },
    // 4위: 페라리
    {
        rank: 4,
        teamName: "페라리",
        teamNameFull: "Scuderia Ferrari HP",
        teamSlug: "ferrari",
        points: 362,
        carImage: "페라리.png",
        logoImage: "페라리.png",

        base: "Maranello, Italy",
        teamChief: "Frédéric Vasseur",
        techChief: "Enrico Gualtieri",
        chassis: "SF-25",
        powerUnit: "Ferrari",
        firstEntry: "1950 ~",
        worldChampionships: "16",
        history: "F1 그 자체이자 역사상 가장 유명한 레이싱 팀입니다. 1950년 첫 시즌부터 참가한 유일한 팀으로, 이탈리아의 자존심이자 '티포시(Tifosi)'라 불리는 전 세계적인 팬덤을 보유하고 있습니다. 2025년 루이스 해밀턴의 합류로 드림팀을 구성하며 다시 한번 왕좌 탈환을 노리고 있습니다.",

        drivers: [
            { name: "샤를 르클레르", rank: 5, points: 214, tcam: "black" },
            { name: "루이스 해밀턴", rank: 6, points: 148, tcam: "yellow" }
        ]
    },
    // 5위: 윌리엄스
    {
        rank: 5,
        teamName: "윌리엄스",
        teamNameFull: "Williams Racing",
        teamSlug: "williams",
        points: 111,
        carImage: "윌리엄스.png",
        logoImage: "윌리엄스.png",

        base: "Grove Oxfordshire, United Kingdom",
        teamChief: "James Vowles",
        techChief: "Pat Fry",
        chassis: "FW47",
        powerUnit: "Mercedes",
        firstEntry: "1977 ~",
        worldChampionships: "9",
        history: "프랭크 윌리엄스 경이 차고에서 시작해 세계 챔피언까지 오른 입지전적인 팀입니다. 80-90년대 F1을 지배했던 명문 팀으로, 긴 침체기를 겪었으나 최근 제임스 바울스 감독의 지휘 아래 알렉스 알본과 카를로스 사인츠라는 강력한 라인업을 구축하며 명가 재건에 속도를 내고 있습니다.",

        drivers: [
            { name: "알렉스 알본", rank: 8, points: 73, tcam: "black" },
            { name: "카를로스 사인츠", rank: 13, points: 38, tcam: "yellow" }
        ]
    },
    // 6위: 레이싱 불스 (RB)
    {
        rank: 6,
        teamName: "레이싱 불스",
        teamNameFull: "Visa Cash App RB Formula One Team",
        teamSlug: "rb",
        points: 82,
        carImage: "레이싱 불스.png",
        logoImage: "레이싱불스2.png",

        base: "Faenza, Italy",
        teamChief: "Laurent Mekies",
        techChief: "Jody Egginton",
        chassis: "VCARB 02",
        powerUnit: "Honda RBPT",
        firstEntry: "1985(as Minardi) ~",
        worldChampionships: "0",
        history: "미나르디, 토로 로쏘, 알파타우리의 계보를 잇는 이탈리아 팀입니다. 레드불의 자매팀으로서 유망주를 육성하는 역할을 넘어, 이제는 독자적인 경쟁력을 갖춘 중위권의 강자로 거듭나고 있습니다. 츠노다 유키와 리암 로슨의 젊은 에너지가 팀의 핵심 동력입니다.",

        drivers: [
            { name: "아이작 하자르", rank: 10, points: 43, tcam: "black" },
            { name: "리암 로슨", rank: 14, points: 36, tcam: "yellow" }
        ]
    },
    // 7위: 애스턴 마틴
    {
        rank: 7,
        teamName: "애스턴 마틴",
        teamNameFull: "Aston Martin Aramco F1 Team",
        teamSlug: "astonmartin",
        points: 72,
        carImage: "에스턴 마틴.png",
        logoImage: "에스턴마틴.png",

        base: "Silverstone, United Kingdom",
        teamChief: "Mike Krack",
        techChief: "Dan Fallows",
        chassis: "AMR25",
        powerUnit: "Mercedes",
        firstEntry: "2021 ~",
        worldChampionships: "0",
        history: "전설적인 영국 스포츠카 브랜드의 이름을 달고 F1에 복귀한 팀입니다. 억만장자 로렌스 스트롤의 전폭적인 투자 아래 최첨단 팩토리를 건설하며 챔피언십 도전을 목표로 하고 있습니다. 백전노장 페르난도 알론소의 경험과 팀의 야망이 결합되어 있습니다.",

        drivers: [
            { name: "페르난도 알론소", rank: 12, points: 40, tcam: "yellow" },
            { name: "랜스 스트롤", rank: 15, points: 32, tcam: "black" }
        ]
    },
    // 8위: 하스
    {
        rank: 8,
        teamName: "하스",
        teamNameFull: "MoneyGram Haas F1 Team",
        teamSlug: "haas",
        points: 70,
        carImage: "하스.png",
        logoImage: "하스.png",

        base: "Kannapolis, United States / Banbury, UK",
        teamChief: "Ayao Komatsu",
        techChief: "Andrea De Zordo",
        chassis: "VF-25",
        powerUnit: "Ferrari",
        firstEntry: "2016 ~",
        worldChampionships: "0",
        history: "2016년에 창단한 가장 젊은 미국 팀입니다. 페라리와의 긴밀한 기술 제휴를 통해 효율적인 운영을 추구합니다. 아야오 코마츠 감독 체제 이후 실용적인 전략으로 중위권 싸움에서 끈질긴 생존력을 보여주고 있으며, 2025년 올리버 베어먼과 에스테반 오콘의 새로운 조합으로 도약을 꿈꿉니다.",

        drivers: [
            { name: "올리버 베어먼", rank: 11, points: 40, tcam: "yellow" },
            { name: "에스테반 오콘", rank: 16, points: 30, tcam: "black" }
        ]
    },
    // 9위: 자우버 (킥)
    {
        rank: 9,
        teamName: "자우버",
        teamNameFull: "Stake F1 Team Kick Sauber",
        teamSlug: "sauber",
        points: 62,
        carImage: "킥 자우버.png",
        logoImage: "킥자우버.png",

        base: "Hinwil, Switzerland",
        teamChief: "Mattia Binotto",
        techChief: "Stefan Strahinz",
        chassis: "C45",
        powerUnit: "Ferrari",
        firstEntry: "1993 ~",
        worldChampionships: "0",
        history: "스위스에 본부를 둔 유서 깊은 독립 팀입니다. 2026년 아우디(Audi)의 팩토리 팀으로 재탄생하기 전 마지막 과도기를 보내고 있습니다. 페라리 전 감독 마티아 비노토가 합류하여 아우디 시대를 위한 기초를 다지고 있으며, 베테랑 휠켄베르크와 유망주 보르툴레투가 그 가교 역할을 맡았습니다.",

        drivers: [
            { name: "니코 휠켄베르크", rank: 18, points: 10, tcam: "black" },
            { name: "가브리에우 보르툴레투", rank: 20, points: 2, tcam: "yellow" }
        ]
    },
    // 10위: 알핀
    {
        rank: 10,
        teamName: "알핀",
        teamNameFull: "BWT Alpine F1 Team",
        teamSlug: "alpine",
        points: 22,
        carImage: "알핀.png",
        logoImage: "알핀.png",

        base: "Enstone, United Kingdom / Viry, France",
        teamChief: "Oliver Oakes",
        techChief: "David Sanchez",
        chassis: "A525",
        powerUnit: "Renault",
        firstEntry: "1981(as Toleman) ~",
        worldChampionships: "2 (as Renault)",
        history: "프랑스 자동차 기업 르노 그룹의 스포츠카 브랜드 팀입니다. 베네통과 르노 시절 미하엘 슈마허, 페르난도 알론소와 함께 챔피언에 올랐던 영광스러운 역사를 가지고 있습니다. 최근 경영진 교체와 조직 개편을 통해 혼란을 수습하고 다시 상위권으로 올라서기 위해 고군분투하고 있습니다.",

        drivers: [
            { name: "피에르 가슬리", rank: 9, points: 42, tcam: "black" },
            /* { name: "잭 두한", rank: 19, points: 3, tcam: "yellow" } */
            { name: "프랑코 콜라핀토", rank: 20, points: 0, tcam: "yellow" }
        ]
    }
];