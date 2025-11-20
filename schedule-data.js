// schedule-data.js
// 2025 FIA Formula 1 Calendar (Base: KST / GMT+9)

const scheduleData = [
    {
        round: 1,
        country: "Australia",
        gpName: "호주 그랑프리",
        dates: "3월 14-16일",
        circuitName: "알버트 파크 서킷",
        location: "멜버른, 호주",
        circuitImage: "australia.png",
        isSprint: false,
        gmtOffset: 11, // 멜버른 (GMT+11)
        sessions: [
            { name: "FP1", date: "3/14 (금)", time: "10:30" },
            { name: "FP2", date: "3/14 (금)", time: "14:00" },
            { name: "FP3", date: "3/15 (토)", time: "10:30" },
            { name: "퀄리파잉", date: "3/15 (토)", time: "14:00" },
            { name: "레이스", date: "3/16 (일)", time: "13:00" }
        ]
    },
    {
        round: 2,
        country: "China",
        gpName: "중국 그랑프리",
        dates: "3월 21-23일",
        circuitName: "상하이 인터내셔널 서킷",
        location: "상하이, 중국",
        circuitImage: "china.png",
        isSprint: true,
        gmtOffset: 8, // 상하이 (GMT+8)
        sessions: [
            { name: "FP1", date: "3/21 (금)", time: "12:30" },
            { name: "스프린트 퀄리파잉", date: "3/21 (금)", time: "16:30" },
            { name: "스프린트", date: "3/22 (토)", time: "12:00" },
            { name: "퀄리파잉", date: "3/22 (토)", time: "16:00" },
            { name: "레이스", date: "3/23 (일)", time: "16:00" }
        ]
    },
    {
        round: 3,
        country: "Japan",
        gpName: "일본 그랑프리",
        dates: "4월 4-6일",
        circuitName: "스즈카 서킷",
        location: "스즈카, 일본",
        circuitImage: "suzuka.png",
        isSprint: false,
        gmtOffset: 9, // 일본 (GMT+9, 한국과 동일)
        sessions: [
            { name: "FP1", date: "4/4 (금)", time: "11:30" },
            { name: "FP2", date: "4/4 (금)", time: "15:00" },
            { name: "FP3", date: "4/5 (토)", time: "11:30" },
            { name: "퀄리파잉", date: "4/5 (토)", time: "15:00" },
            { name: "레이스", date: "4/6 (일)", time: "14:00" }
        ]
    },
    {
        round: 4,
        country: "Bahrain",
        gpName: "바레인 그랑프리",
        dates: "4월 11-14일",
        circuitName: "바레인 인터내셔널 서킷",
        location: "사키르, 바레인",
        circuitImage: "bahrain.png",
        isSprint: false,
        gmtOffset: 3, // 바레인 (GMT+3)
        sessions: [
            { name: "FP1", date: "4/11 (금)", time: "20:30" }, // 현지 14:30
            { name: "FP2", date: "4/12 (토)", time: "00:00" }, // 현지 18:00
            { name: "FP3", date: "4/12 (토)", time: "21:30" },
            { name: "퀄리파잉", date: "4/13 (일)", time: "01:00" },
            { name: "레이스", date: "4/14 (월)", time: "00:00" } // 현지 일요일 18:00
        ]
    },
    {
        round: 5,
        country: "Saudi Arabia",
        gpName: "사우디 아라비아 그랑프리",
        dates: "4월 18-21일",
        circuitName: "제다 코니쉬 서킷",
        location: "제다, 사우디아라비아",
        circuitImage: "saudi.png",
        isSprint: false,
        gmtOffset: 3, // 사우디 (GMT+3)
        sessions: [
            { name: "FP1", date: "4/18 (금)", time: "22:30" },
            { name: "FP2", date: "4/19 (토)", time: "02:00" },
            { name: "FP3", date: "4/19 (토)", time: "22:30" },
            { name: "퀄리파잉", date: "4/20 (일)", time: "02:00" },
            { name: "레이스", date: "4/21 (월)", time: "02:00" }
        ]
    },
    {
        round: 6,
        country: "USA",
        gpName: "마이애미 그랑프리",
        dates: "5월 3-5일",
        circuitName: "마이애미 인터내셔널 오토드로롬",
        location: "마이애미, 미국",
        circuitImage: "miami.png",
        isSprint: true,
        gmtOffset: -4, // 미국 동부 썸머타임 (GMT-4)
        sessions: [
            { name: "FP1", date: "5/3 (토)", time: "01:30" }, // 현지 금요일 12:30
            { name: "스프린트 퀄리파잉", date: "5/3 (토)", time: "05:30" },
            { name: "스프린트", date: "5/4 (일)", time: "01:00" },
            { name: "퀄리파잉", date: "5/4 (일)", time: "05:00" },
            { name: "레이스", date: "5/5 (월)", time: "05:00" } // 현지 일요일 16:00
        ]
    },
    {
        round: 7,
        country: "Italy",
        gpName: "에밀리아 로마냐 그랑프리",
        dates: "5월 16-18일",
        circuitName: "이몰라 서킷",
        location: "이몰라, 이탈리아",
        circuitImage: "imola.png",
        isSprint: false,
        gmtOffset: 2, // 유럽 썸머타임 (GMT+2)
        sessions: [
            { name: "FP1", date: "5/16 (금)", time: "20:30" },
            { name: "FP2", date: "5/17 (토)", time: "00:00" },
            { name: "FP3", date: "5/17 (토)", time: "19:30" },
            { name: "퀄리파잉", date: "5/17 (토)", time: "23:00" },
            { name: "레이스", date: "5/18 (일)", time: "22:00" }
        ]
    },
    {
        round: 8,
        country: "Monaco",
        gpName: "모나코 그랑프리",
        dates: "5월 23-25일",
        circuitName: "모나코 서킷",
        location: "몬테카를로, 모나코",
        circuitImage: "monaco.png",
        isSprint: false,
        gmtOffset: 2,
        sessions: [
            { name: "FP1", date: "5/23 (금)", time: "20:30" },
            { name: "FP2", date: "5/24 (토)", time: "00:00" },
            { name: "FP3", date: "5/24 (토)", time: "19:30" },
            { name: "퀄리파잉", date: "5/24 (토)", time: "23:00" },
            { name: "레이스", date: "5/25 (일)", time: "22:00" }
        ]
    },
    {
        round: 9,
        country: "Spain",
        gpName: "스페인 그랑프리",
        dates: "5월 30일 - 6월 1일",
        circuitName: "바르셀로나 카탈루냐 서킷",
        location: "바르셀로나, 스페인",
        circuitImage: "spain.png",
        isSprint: false,
        gmtOffset: 2,
        sessions: [
            { name: "FP1", date: "5/30 (금)", time: "20:30" },
            { name: "FP2", date: "5/31 (토)", time: "00:00" },
            { name: "FP3", date: "5/31 (토)", time: "19:30" },
            { name: "퀄리파잉", date: "5/31 (토)", time: "23:00" },
            { name: "레이스", date: "6/1 (일)", time: "22:00" }
        ]
    },
    {
        round: 10,
        country: "Canada",
        gpName: "캐나다 그랑프리",
        dates: "6월 14-16일",
        circuitName: "질 빌너브 서킷",
        location: "몬트리올, 캐나다",
        circuitImage: "canada.png",
        isSprint: false,
        gmtOffset: -4, // 캐나다 동부 썸머타임 (GMT-4)
        sessions: [
            { name: "FP1", date: "6/14 (토)", time: "02:30" },
            { name: "FP2", date: "6/14 (토)", time: "06:00" },
            { name: "FP3", date: "6/15 (일)", time: "01:30" },
            { name: "퀄리파잉", date: "6/15 (일)", time: "05:00" },
            { name: "레이스", date: "6/16 (월)", time: "03:00" }
        ]
    },
    {
        round: 11,
        country: "Austria",
        gpName: "오스트리아 그랑프리",
        dates: "6월 27-29일",
        circuitName: "레드불 링",
        location: "스피실베르크, 오스트리아",
        circuitImage: "austria.png",
        isSprint: true,
        gmtOffset: 2,
        sessions: [
            { name: "FP1", date: "6/27 (금)", time: "20:30" },
            { name: "스프린트 퀄리파잉", date: "6/28 (토)", time: "00:00" },
            { name: "스프린트", date: "6/28 (토)", time: "19:30" },
            { name: "퀄리파잉", date: "6/28 (토)", time: "23:00" },
            { name: "레이스", date: "6/29 (일)", time: "22:00" }
        ]
    },
    {
        round: 12,
        country: "UK",
        gpName: "영국 그랑프리",
        dates: "7월 4-6일",
        circuitName: "실버스톤 서킷",
        location: "실버스톤, 영국",
        circuitImage: "silverstone.png",
        isSprint: false,
        gmtOffset: 1, // 영국 썸머타임 (GMT+1)
        sessions: [
            { name: "FP1", date: "7/4 (금)", time: "20:30" },
            { name: "FP2", date: "7/5 (토)", time: "00:00" },
            { name: "FP3", date: "7/5 (토)", time: "19:30" },
            { name: "퀄리파잉", date: "7/5 (토)", time: "23:00" },
            { name: "레이스", date: "7/6 (일)", time: "23:00" }
        ]
    },
    {
        round: 13,
        country: "Belgium",
        gpName: "벨기에 그랑프리",
        dates: "7월 25-27일",
        circuitName: "스파 프랑코샹 서킷",
        location: "스파, 벨기에",
        circuitImage: "spa.png",
        isSprint: true,
        gmtOffset: 2,
        sessions: [
            { name: "FP1", date: "7/25 (금)", time: "19:30" },
            { name: "스프린트 퀄리파잉", date: "7/25 (금)", time: "23:30" },
            { name: "스프린트", date: "7/26 (토)", time: "19:00" },
            { name: "퀄리파잉", date: "7/26 (토)", time: "23:00" },
            { name: "레이스", date: "7/27 (일)", time: "22:00" }
        ]
    },
    {
        round: 14,
        country: "Hungary",
        gpName: "헝가리 그랑프리",
        dates: "8월 1-3일",
        circuitName: "헝가로링",
        location: "부다페스트, 헝가리",
        circuitImage: "hungary.png",
        isSprint: false,
        gmtOffset: 2,
        sessions: [
            { name: "FP1", date: "8/1 (금)", time: "20:30" },
            { name: "FP2", date: "8/2 (토)", time: "00:00" },
            { name: "FP3", date: "8/2 (토)", time: "19:30" },
            { name: "퀄리파잉", date: "8/2 (토)", time: "23:00" },
            { name: "레이스", date: "8/3 (일)", time: "22:00" }
        ]
    },
    {
        round: 15,
        country: "Netherlands",
        gpName: "네덜란드 그랑프리",
        dates: "8월 29-31일",
        circuitName: "잔트보르트 서킷",
        location: "잔트보르트, 네덜란드",
        circuitImage: "netherlands.png",
        isSprint: false,
        gmtOffset: 2,
        sessions: [
            { name: "FP1", date: "8/29 (금)", time: "19:30" },
            { name: "FP2", date: "8/29 (금)", time: "23:00" },
            { name: "FP3", date: "8/30 (토)", time: "18:30" },
            { name: "퀄리파잉", date: "8/30 (토)", time: "22:00" },
            { name: "레이스", date: "8/31 (일)", time: "22:00" }
        ]
    },
    {
        round: 16,
        country: "Italy",
        gpName: "이탈리아 그랑프리",
        dates: "9월 5-7일",
        circuitName: "몬자 서킷",
        location: "몬자, 이탈리아",
        circuitImage: "monza.png",
        isSprint: false,
        gmtOffset: 2,
        sessions: [
            { name: "FP1", date: "9/5 (금)", time: "20:30" },
            { name: "FP2", date: "9/6 (토)", time: "00:00" },
            { name: "FP3", date: "9/6 (토)", time: "19:30" },
            { name: "퀄리파잉", date: "9/6 (토)", time: "23:00" },
            { name: "레이스", date: "9/7 (일)", time: "22:00" }
        ]
    },
    {
        round: 17,
        country: "Azerbaijan",
        gpName: "아제르바이잔 그랑프리",
        dates: "9월 19-21일",
        circuitName: "바쿠 시티 서킷",
        location: "바쿠, 아제르바이잔",
        circuitImage: "baku.png",
        isSprint: false,
        gmtOffset: 4, // 아제르바이잔 (GMT+4)
        sessions: [
            { name: "FP1", date: "9/19 (금)", time: "17:30" },
            { name: "FP2", date: "9/19 (금)", time: "21:00" },
            { name: "FP3", date: "9/20 (토)", time: "17:30" },
            { name: "퀄리파잉", date: "9/20 (토)", time: "21:00" },
            { name: "레이스", date: "9/21 (일)", time: "20:00" }
        ]
    },
    {
        round: 18,
        country: "Singapore",
        gpName: "싱가포르 그랑프리",
        dates: "10월 3-5일",
        circuitName: "마리나 베이 스트리트 서킷",
        location: "싱가포르",
        circuitImage: "singapore.png",
        isSprint: false,
        gmtOffset: 8, // 싱가포르 (GMT+8)
        sessions: [
            { name: "FP1", date: "10/3 (금)", time: "18:30" },
            { name: "FP2", date: "10/3 (금)", time: "22:00" },
            { name: "FP3", date: "10/4 (토)", time: "18:30" },
            { name: "퀄리파잉", date: "10/4 (토)", time: "22:00" },
            { name: "레이스", date: "10/5 (일)", time: "21:00" }
        ]
    },
    {
        round: 19,
        country: "USA",
        gpName: "미국 그랑프리",
        dates: "10월 18-20일",
        circuitName: "서킷 오브 디 아메리카",
        location: "오스틴, 텍사스",
        circuitImage: "usa.png",
        isSprint: true,
        gmtOffset: -5, // 미국 중부 (GMT-5)
        sessions: [
            { name: "FP1", date: "10/18 (토)", time: "02:30" },
            { name: "스프린트 퀄리파잉", date: "10/18 (토)", time: "06:30" },
            { name: "스프린트", date: "10/19 (일)", time: "02:00" },
            { name: "퀄리파잉", date: "10/19 (일)", time: "06:00" },
            { name: "레이스", date: "10/20 (월)", time: "04:00" }
        ]
    },
    {
        round: 20,
        country: "Mexico",
        gpName: "멕시코 그랑프리",
        dates: "10월 25-27일",
        circuitName: "에르마노스 로드리게스 서킷",
        location: "멕시코시티, 멕시코",
        circuitImage: "mexico.png",
        isSprint: false,
        gmtOffset: -6, // 멕시코시티 (GMT-6)
        sessions: [
            { name: "FP1", date: "10/25 (토)", time: "03:30" },
            { name: "FP2", date: "10/25 (토)", time: "07:00" },
            { name: "FP3", date: "10/26 (일)", time: "02:30" },
            { name: "퀄리파잉", date: "10/26 (일)", time: "06:00" },
            { name: "레이스", date: "10/27 (월)", time: "05:00" }
        ]
    },
    {
        round: 21,
        country: "Brazil",
        gpName: "상파울루 그랑프리",
        dates: "11월 7-10일",
        circuitName: "인터라고스 서킷",
        location: "상파울루, 브라질",
        circuitImage: "brazil.png",
        isSprint: true,
        gmtOffset: -3, // 브라질 (GMT-3)
        sessions: [
            { name: "FP1", date: "11/7 (금)", time: "23:30" },
            { name: "스프린트 퀄리파잉", date: "11/8 (금)", time: "03:30" },
            { name: "스프린트", date: "11/8 (토)", time: "23:00" },
            { name: "퀄리파잉", date: "11/9 (토)", time: "03:00" },
            { name: "레이스", date: "11/10 (일)", time: "02:00" }
        ]
    },
    {
        round: 22,
        country: "USA",
        gpName: "라스베이거스 그랑프리",
        dates: "11월 21-23일",
        circuitName: "라스베이거스 시가지 서킷",
        location: "라스베이거스, 미국",
        circuitImage: "vegas.png",
        isSprint: false,
        gmtOffset: -8, // 미국 서부 (GMT-8)
        sessions: [
            { name: "FP1", date: "11/21 (금)", time: "11:30" }, // 현지 목 18:30
            { name: "FP2", date: "11/21 (금)", time: "15:00" }, // 현지 목 22:00
            { name: "FP3", date: "11/22 (토)", time: "11:30" }, // 현지 금 18:30
            { name: "퀄리파잉", date: "11/22 (토)", time: "15:00" }, // 현지 금 22:00
            { name: "레이스", date: "11/23 (일)", time: "15:00" }  // 현지 토 22:00
        ]
    },
    {
        round: 23,
        country: "Qatar",
        gpName: "카타르 그랑프리",
        dates: "11월 28일 - 12월 1일",
        circuitName: "루사일 인터내셔널 서킷",
        location: "루사일, 카타르",
        circuitImage: "qatar.png",
        isSprint: true,
        gmtOffset: 3, // 카타르 (GMT+3)
        sessions: [
            { name: "FP1", date: "11/28 (금)", time: "22:30" },
            { name: "스프린트 퀄리파잉", date: "11/29 (금)", time: "02:30" },
            { name: "스프린트", date: "11/29 (토)", time: "23:00" },
            { name: "퀄리파잉", date: "11/30 (토)", time: "03:00" },
            { name: "레이스", date: "12/1 (일)", time: "01:00" }
        ]
    },
    {
        round: 24,
        country: "Abu Dhabi",
        gpName: "아부다비 그랑프리",
        dates: "12월 5-7일",
        circuitName: "야스 마리나 서킷",
        location: "아부다비, UAE",
        circuitImage: "abudhabi.png",
        isSprint: false,
        gmtOffset: 4, // 아부다비 (GMT+4)
        sessions: [
            { name: "FP1", date: "12/5 (금)", time: "18:30" },
            { name: "FP2", date: "12/5 (금)", time: "22:00" },
            { name: "FP3", date: "12/6 (토)", time: "19:30" },
            { name: "퀄리파잉", date: "12/6 (토)", time: "23:00" },
            { name: "레이스", date: "12/7 (일)", time: "22:00" }
        ]
    }
];