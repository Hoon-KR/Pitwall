// G님의 기존 driver.js에서 이 데이터를 옮겨왔습니다.
// 🚨 driver.js에서는 이 부분을 반드시 삭제해야 합니다!
const driverData = [
    // === Mercedes ===
    {
        number: 63,
        name: "George Russell",
        team: "Mercedes-AMG Petronas",
        teamSlug: "mercedes",
        slug: "george_russell", // ⬅️ (필수) URL용 ID
        image: "조지 러셀.png",
        teamLogo: "메르세데스.png",
        dob: "1998-02-15", // ⬅️ (추가) 생년월일
        nationality: "British 🇬🇧", // ⬅️ (추가) 국적
        career: [ // ⬅️ (추가) F1 경력
            { team: "Williams", years: "2019-2021" },
            { team: "Mercedes", years: "2022-Present" }
        ]
    },
    {
        number: 12,
        name: "Kimi Antonelli",
        team: "Mercedes-AMG Petronas",
        teamSlug: "mercedes",
        slug: "kimi_antonelli",
        image: "키미 안토넬리.png",
        teamLogo: "메르세데스.png",
        dob: "2006-08-25",
        nationality: "Italian 🇮🇹",
        career: [
            { team: "Mercedes", years: "2025 (Debut)" }
        ]
    },
    // === Ferrari ===
    {
        number: 16,
        name: "Charles Leclerc",
        team: "Scuderia Ferrari",
        teamSlug: "ferrari",
        slug: "charles_leclerc",
        image: "샤를 르클레르.png",
        teamLogo: "페라리.png",
        dob: "1997-10-16",
        nationality: "Monegasque 🇲🇨",
        career: [
            { team: "Sauber", years: "2018" },
            { team: "Ferrari", years: "2019-Present" }
        ]
    },
    {
        number: 44,
        name: "Lewis Hamilton",
        team: "Scuderia Ferrari",
        teamSlug: "ferrari",
        slug: "lewis_hamilton",
        image: "루이스 해밀턴.png",
        teamLogo: "페라리.png",
        dob: "1985-01-07",
        nationality: "British 🇬🇧",
        career: [
            { team: "McLaren", years: "2007-2012" },
            { team: "Mercedes", years: "2013-2024" },
            { team: "Ferrari", years: "2025-Present" }
        ]
    },
    // === McLaren ===
    {
        number: 4,
        name: "Lando Norris",
        team: "McLaren F1 Team",
        teamSlug: "mclaren",
        slug: "lando_norris",
        image: "랜도 노리스.png",
        teamLogo: "맥라렌.png",
        dob: "1999-11-13",
        nationality: "British 🇬🇧",
        career: [
            { team: "McLaren", years: "2019-Present" }
        ]
    },
    {
        number: 81,
        name: "Oscar Piastri",
        team: "McLaren F1 Team",
        teamSlug: "mclaren",
        slug: "oscar_piastri",
        image: "오스카 피아스트리.png",
        teamLogo: "맥라렌.png",
        dob: "2001-04-06",
        nationality: "Australian 🇦🇺",
        career: [
            { team: "McLaren", years: "2023-Present" }
        ]
    },
    // === Red Bull Racing ===
    {
        number: 1,
        name: "Max Verstappen",
        team: "Red Bull Racing",
        teamSlug: "redbull",
        slug: "max_verstappen", // ⬅️ (필수) URL용 ID
        image: "막스 베르스타펜.png",
        teamLogo: "레드불.png",
        dob: "1997-09-30", // ⬅️ (추가) 생년월일
        nationality: "Dutch 🇳🇱", // ⬅️ (추가) 국적
        career: [ // ⬅️ (추가) F1 경력
            { team: "Toro Rosso", years: "2015-2016" },
            { team: "Red Bull", years: "2016-Present" }
        ]
    },
    {
        number: 22,
        name: "Yuki Tsunoda",
        team: "Red Bull Racing",
        teamSlug: "redbull",
        slug: "yuki_tsunoda",
        image: "츠노다 유키.png",
        teamLogo: "레드불.png",
        dob: "2000-05-11",
        nationality: "Japanese 🇯🇵",
        career: [
            { team: "AlphaTauri / RB", years: "2021-2025" },
            { team: "Red Bull", years: "2025-Present" }
        ]
    },
    // === Aston Martin ===
    {
        number: 14,
        name: "Fernando Alonso",
        team: "Aston Martin F1 Team",
        teamSlug: "astonmartin",
        slug: "fernando_alonso",
        image: "페르난도 알론소.png",
        teamLogo: "에스턴마틴.png",
        dob: "1981-07-29",
        nationality: "Spanish 🇪🇸",
        career: [
            { team: "Minardi", years: "2001" },
            { team: "Renault", years: "2003-2006" },
            { team: "McLaren", years: "2007" },
            { team: "Renault", years: "2008-2009" },
            { team: "Ferrari", years: "2010-2014" },
            { team: "McLaren", years: "2015-2018" },
            { team: "Alpine", years: "2021-2022" },
            { team: "Aston Martin", years: "2023-Present" }
        ]
    },
    {
        number: 18,
        name: "Lance Stroll",
        team: "Aston Martin F1 Team",
        teamSlug: "astonmartin",
        slug: "lance_stroll",
        image: "랜스 스트롤.png",
        teamLogo: "에스턴마틴.png",
        dob: "1998-10-29",
        nationality: "Canadian 🇨🇦",
        career: [
            { team: "Williams", years: "2017-2018" },
            { team: "Racing Point / Aston Martin", years: "2019-Present" }
        ]
    },
    // === Williams ===
    {
        number: 23,
        name: "Alex Albon",
        team: "Williams Racing",
        teamSlug: "williams",
        slug: "alex_albon",
        image: "알렉스 알본.png",
        teamLogo: "윌리엄스.png",
        dob: "1996-03-23",
        nationality: "Thai 🇹🇭",
        career: [
            { team: "Toro Rosso", years: "2019" },
            { team: "Red Bull", years: "2019-2020" },
            { team: "Williams", years: "2022-Present" }
        ]
    },
    {
        number: 55,
        name: "Carlos Sainz",
        team: "Williams Racing",
        teamSlug: "williams",
        slug: "carlos_sainz",
        image: "카를로스 사인츠.png",
        teamLogo: "윌리엄스.png",
        dob: "1994-09-01",
        nationality: "Spanish 🇪🇸",
        career: [
            { team: "Toro Rosso", years: "2015-2017" },
            { team: "Renault", years: "2017-2018" },
            { team: "McLaren", years: "2019-2020" },
            { team: "Ferrari", years: "2021-2024" },
            { team: "Williams", years: "2025-Present" }
        ]
    },
    // === Visa Cash App RB ===

    {
        number: 30,
        name: "Liam Lawson",
        team: "Visa Cash App RB",
        teamSlug: "rb",
        slug: "liam_lawson",
        image: "리암 로슨.png",
        teamLogo: "레이싱불스2.png",
        dob: "2002-02-11",
        nationality: "New Zealander 🇳🇿",
        career: [
            { team: "AlphaTauri / RB", years: "2023 (Sub) / 2025-Present" }
        ]

    },
    {
        number: 6,
        name: "Isack Hadjar",
        team: "Visa Cash App RB",
        teamSlug: "rb",
        slug: "isack_hadjar",
        image: "아이작 하자르.png",
        teamLogo: "레이싱불스2.png",
        dob: "2004-09-28",
        nationality: "French 🇫🇷",
        career: [ /* ... (경력 추가) ... */]
    },
    // === Sauber ===
    {
        number: 27,
        name: "Nico Hülkenberg",
        team: "Stake F1 Team Kick Sauber",
        teamSlug: "sauber",
        slug: "nico_hulkenberg",
        image: "니코 휠켄베르크.png",
        teamLogo: "킥자우버.png",
        dob: "1987-08-19",
        nationality: "German 🇩🇪",
        career: [ 
            { team: "Williams", years: "2010" },
            { team: "Force India", years: "2012" },
            { team: "Sauber", years: "2013" },
            { team: "Force India", years: "2014-2016" },
            { team: "Renault", years: "2017-2019" },
            { team: "Racing Point / Aston Martin", years: "2020, 2022 (Sub)" },
            { team: "Haas", years: "2023-2024" },
            { team: "Sauber", years: "2025-Present" }
        ]
    },
    {
        number: 87,
        name: "Gabriel Bortoleto",
        team: "Stake F1 Team Kick Sauber",
        teamSlug: "sauber",
        slug: "gabriel_bortoleto",
        image: "가브리에우 보르툴레투.png",
        teamLogo: "킥자우버.png",
        dob: "2004-10-14",
        nationality: "Brazilian 🇧🇷",
        career: [ 
            { team: "Sauber", years: "2025 (Debut)" }
        ]
    },
    // === Haas ===
    {
        number: 50,
        name: "Oliver Bearman",
        team: "Haas F1 Team",
        teamSlug: "haas",
        slug: "oliver_bearman",
        image: "올리버 베어먼.png",
        teamLogo: "하스.png",
        dob: "2005-05-08",
        nationality: "British 🇬🇧",
        career: [ 
            { team: "Ferrari", years: "2024 (Sub)" },
            { team: "Haas", years: "2025-Present" }
        ]
    },
    {
        number: 31,
        name: "Esteban Ocon",
        team: "Haas F1 Team",
        teamSlug: "haas",
        slug: "esteban_ocon",
        image: "에스테반 오콘.png",
        teamLogo: "하스.png",
        dob: "1996-09-17",
        nationality: "French 🇫🇷",
        career: [ 
            { team: "Manor", years: "2016" },
            { team: "Force India", years: "2017-2018" },
            { team: "Renault / Alpine", years: "2020-2024" },
            { team: "Haas", years: "2025-Present" }
        ]
    },
    // === Alpine ===
    {
        number: 10,
        name: "Pierre Gasly",
        team: "Alpine F1 Team",
        teamSlug: "alpine",
        slug: "pierre_gasly",
        image: "피에르 가슬리.png",
        teamLogo: "알핀.png",
        dob: "1996-02-07",
        nationality: "French 🇫🇷",
        career: [ 
            { team: "Toro Rosso", years: "2017-2018" },
            { team: "Red Bull", years: "2019" },
            { team: "Toro Rosso / AlphaTauri", years: "2019-2022" },
            { team: "Alpine", years: "2023-Present" }
        ]
    },
    {
        number: 43,
        name: "Franco Colapinto",
        team: "Alpine F1 Team",
        teamSlug: "alpine",
        slug: "franco_colapinto",
        image: "프랑코 콜라핀토.png",
        teamLogo: "알핀.png",
        dob: "2003-05-27",
        nationality: "Argentine 🇦🇷",
        career: [ 
            { team: "Williams", years: "2024 (Replacement)" },
            { team: "Alpine", years: "2025-Present" }
        ]
    },
    {
        number: 7,
        name: "Jack Doohan",
        team: "Alpine F1 Team",
        teamSlug: "alpine",
        slug: "jack_doohan",
        image: "잭 두한.png",
        teamLogo: "알핀.png",
        dob: "2003-01-20",
        nationality: "Australian 🇦🇺",
        career: [ 
            { team: "Alpine", years: "2024 (Debut)" }
        ]
    }
];