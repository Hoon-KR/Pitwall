// G님의 기존 driver.js에서 이 데이터를 옮겨왔습니다.
// 🚨 driver.js에서는 이 부분을 반드시 삭제해야 합니다!
const driverData = [
    // === Mercedes ===
    {
        number: 63,
        name: "George Russell",
        nameKr: "조지 러셀",
        team: "Mercedes-AMG Petronas",
        teamSlug: "mercedes",
        slug: "george_russell", // ⬅️ (필수) URL용 ID
        image: "조지 러셀.png",
        teamLogo: "메르세데스.png",
        dob: "1998-02-15", // ⬅️ (추가) 생년월일
        nationality: "British 🇬🇧", // ⬅️ (추가) 국적
        career: [ // ⬅️ (추가) F1 경력
            { team: "Williams", years: "2019-2021" },
            { team: "Mercedes", years: "2022-ing" }
        ],
        stats: {
            championships: 0,
            wins: 5,
            podiums: 23,
            poles: 7,
            points: 276,
            entries: 149
        }
    },
    {
        number: 12,
        name: "Kimi Antonelli",
        nameKr: "키미 안토넬리",
        team: "Mercedes-AMG Petronas",
        teamSlug: "mercedes",
        slug: "kimi_antonelli",
        image: "키미 안토넬리.png",
        teamLogo: "메르세데스.png",
        dob: "2006-08-25",
        nationality: "Italian 🇮🇹",
        career: [
            { team: "Mercedes", years: "2025-ing" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 2,
            poles: 0,
            points: 122,
            entries: 21
        }
    },
    // === Ferrari ===
    {
        number: 16,
        name: "Charles Leclerc",
        nameKr: "샤를 르클레르",
        team: "Scuderia Ferrari",
        teamSlug: "ferrari",
        slug: "charles_leclerc",
        image: "샤를 르클레르.png",
        teamLogo: "페라리.png",
        dob: "1997-10-16",
        nationality: "Monegasque 🇲🇨",
        career: [
            { team: "Sauber", years: "2018" },
            { team: "Ferrari", years: "2019-ing" }
        ],
        stats: {
            championships: 0,
            wins: 8,
            podiums: 50,
            poles: 27,
            points: 214,
            entries: 170
        }
    },
    {
        number: 44,
        name: "Lewis Hamilton",
        nameKr: "루이스 해밀턴",
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
            { team: "Ferrari", years: "2025-ing" }
        ],
        stats: {
            championships: 7,
            wins: 105,
            podiums: 202,
            poles: 104,
            points: 148,
            entries: 377
        }
    },
    // === McLaren ===
    {
        number: 4,
        name: "Lando Norris",
        nameKr: "랜도 노리스",
        team: "McLaren F1 Team",
        teamSlug: "mclaren",
        slug: "lando_norris",
        image: "랜도 노리스.png",
        teamLogo: "맥라렌.png",
        dob: "1999-11-13",
        nationality: "British 🇬🇧",
        career: [
            { team: "McLaren", years: "2019-ing" }
        ],
        stats: {
            championships: 0,
            wins: 11,
            podiums: 43,
            poles: 15,
            points: 390,
            entries: 149
        }
    },
    {
        number: 81,
        name: "Oscar Piastri",
        nameKr: "오스카 피아스트리",
        team: "McLaren F1 Team",
        teamSlug: "mclaren",
        slug: "oscar_piastri",
        image: "오스카 피아스트리.png",
        teamLogo: "맥라렌.png",
        dob: "2001-04-06",
        nationality: "Australian 🇦🇺",
        career: [
            { team: "McLaren", years: "2023-ing" }
        ],
        stats: {
            championships: 0,
            wins: 9,
            podiums: 24,
            poles: 5,
            points: 366,
            entries: 67
        }
    },
    // === Red Bull Racing ===
    {
        number: 1,
        name: "Max Verstappen",
        nameKr: "막스 베르스타펜",
        team: "Red Bull Racing",
        teamSlug: "redbull",
        slug: "max_verstappen", // ⬅️ (필수) URL용 ID
        image: "막스 베르스타펜.png",
        teamLogo: "레드불.png",
        dob: "1997-09-30", // ⬅️ (추가) 생년월일
        nationality: "Dutch 🇳🇱", // ⬅️ (추가) 국적
        career: [ // ⬅️ (추가) F1 경력
            { team: "Toro Rosso", years: "2015-2016" },
            { team: "Red Bull", years: "2016-ing" }
        ],
        stats: {
            championships: 4,
            wins: 70,
            podiums: 126,
            poles: 47,
            points: 396,
            entries: 232
        }
    },
    {
        number: 22,
        name: "Yuki Tsunoda",
        nameKr: "츠노다 유키",
        team: "Red Bull Racing",
        teamSlug: "redbull",
        slug: "yuki_tsunoda",
        image: "츠노다 유키.png",
        teamLogo: "레드불.png",
        dob: "2000-05-11",
        nationality: "Japanese 🇯🇵",
        career: [
            { team: "AlphaTauri / RB", years: "2021-2025" },
            { team: "Red Bull", years: "2025-ing" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 0,
            poles: 0,
            points: 28,
            entries: 111
        }
    },
    // === Aston Martin ===
    {
        number: 14,
        name: "Fernando Alonso",
        nameKr: "페르난도 알론소",
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
            { team: "Aston Martin", years: "2023-ing" }
        ],
        stats: {
            championships: 2,
            wins: 32,
            podiums: 106,
            poles: 22,
            points: 40,
            entries: 425
        }
    },
    {
        number: 18,
        name: "Lance Stroll",
        nameKr: "랜스 스트롤",
        team: "Aston Martin F1 Team",
        teamSlug: "astonmartin",
        slug: "lance_stroll",
        image: "랜스 스트롤.png",
        teamLogo: "에스턴마틴.png",
        dob: "1998-10-29",
        nationality: "Canadian 🇨🇦",
        career: [
            { team: "Williams", years: "2017-2018" },
            { team: "Racing Point / Aston Martin", years: "2019-ing" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 3,
            poles: 1,
            points: 32,
            entries: 189
        }
    },
    // === Williams ===
    {
        number: 23,
        name: "Alex Albon",
        nameKr: "알렉스 알본",
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
            { team: "Williams", years: "2022-ing" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 2,
            poles: 0,
            points: 73,
            entries: 126
        }
    },
    {
        number: 55,
        name: "Carlos Sainz",
        nameKr: "카를로스 사인츠",
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
            { team: "Williams", years: "2025-ing" }
        ],
        stats: {
            championships: 0,
            wins: 4,
            podiums: 28,
            poles: 6,
            points: 38,
            entries: 229
        }
    },
    // === Visa Cash App RB ===

    {
        number: 30,
        name: "Liam Lawson",
        nameKr: "리암 로슨",
        team: "Visa Cash App RB",
        teamSlug: "rb",
        slug: "liam_lawson",
        image: "리암 로슨.png",
        teamLogo: "레이싱불스2.png",
        dob: "2002-02-11",
        nationality: "New Zealander 🇳🇿",
        career: [
            { team: "AlphaTauri / RB", years: "2023 (Sub) / 2025-ing" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 0,
            poles: 0,
            points: 36,
            entries: 32
        }

    },
    {
        number: 6,
        name: "Isack Hadjar",
        nameKr: "아이작 하자르",
        team: "Visa Cash App RB",
        teamSlug: "rb",
        slug: "isack_hadjar",
        image: "아이작 하자르.png",
        teamLogo: "레이싱불스2.png",
        dob: "2004-09-28",
        nationality: "French 🇫🇷",
        career: [
            { team: "RB", years: "2025-ing" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 1,
            poles: 0,
            points: 43,
            entries: 21
        }
    },
    // === Sauber ===
    {
        number: 27,
        name: "Nico Hülkenberg",
        nameKr: "니코 휠켄베르크",
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
            { team: "Sauber", years: "2025-ing" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 1,
            poles: 1,
            points: 43,
            entries: 251
        }
    },
    {
        number: 87,
        name: "Gabriel Bortoleto",
        nameKr: "가브리에우 보르툴레투",
        team: "Stake F1 Team Kick Sauber",
        teamSlug: "sauber",
        slug: "gabriel_bortoleto",
        image: "가브리에우 보르툴레투.png",
        teamLogo: "킥자우버.png",
        dob: "2004-10-14",
        nationality: "Brazilian 🇧🇷",
        career: [
            { team: "Sauber", years: "2025 (Debut)" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 0,
            poles: 0,
            points: 19,
            entries: 21
        }
    },
    // === Haas ===
    {
        number: 50,
        name: "Oliver Bearman",
        nameKr: "올리버 베어먼",
        team: "Haas F1 Team",
        teamSlug: "haas",
        slug: "oliver_bearman",
        image: "올리버 베어먼.png",
        teamLogo: "하스.png",
        dob: "2005-05-08",
        nationality: "British 🇬🇧",
        career: [
            { team: "Ferrari", years: "2024 (Sub)" },
            { team: "Haas", years: "2025-ing" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 0,
            poles: 0,
            points: 40,
            entries: 24
        }
    },
    {
        number: 31,
        name: "Esteban Ocon",
        nameKr: "에스테반 오콘",
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
            { team: "Haas", years: "2025-ing" }
        ],
        stats: {
            championships: 0,
            wins: 1,
            podiums: 4,
            poles: 0,
            points: 30,
            entries: 177
        }
    },
    // === Alpine ===
    {
        number: 10,
        name: "Pierre Gasly",
        nameKr: "피에르 가슬리",
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
            { team: "Alpine", years: "2023-ing" }
        ],
        stats: {
            championships: 0,
            wins: 1,
            podiums: 5,
            poles: 0,
            points: 22,
            entries: 175
        }
    },
    {
        number: 43,
        name: "Franco Colapinto",
        nameKr: "프랑코 콜라핀토",
        team: "Alpine F1 Team",
        teamSlug: "alpine",
        slug: "franco_colapinto",
        image: "프랑코 콜라핀토.png",
        teamLogo: "알핀.png",
        dob: "2003-05-27",
        nationality: "Argentine 🇦🇷",
        career: [
            { team: "Williams", years: "2024 (Replacement)" },
            { team: "Alpine", years: "2025-ing" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 0,
            poles: 0,
            points: 0,
            entries: 24
        }
    },
    {
        number: 7,
        name: "Jack Doohan",
        nameKr: "잭 두한",
        team: "Alpine F1 Team",
        teamSlug: "alpine",
        slug: "jack_doohan",
        image: "잭 두한.png",
        teamLogo: "알핀.png",
        dob: "2003-01-20",
        nationality: "Australian 🇦🇺",
        career: [
            { team: "Alpine", years: "2024 (Debut)" }
        ],
        stats: {
            championships: 0,
            wins: 0,
            podiums: 0,
            poles: 0,
            points: 0,
            entries: 7
        }
    }
];