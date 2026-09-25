// ─────────────────────────────────────────────────────────────
// 名片內容的單一真相。改名片資料只要改這個檔，
// 頁面、介面用語與 vCard 都會一起跟著變。
//
// 每個可翻譯欄位都是 { zh, en, ja } 三語對照，缺一不可
// （漏翻時 npm test 會擋下）。
//
// 資料來源：沈怡如本人提供的紙本名片與簡介（2026-09-24）。
// ─────────────────────────────────────────────────────────────
export const card = {
  site: {
    // 名片頁本身的網址（GitHub Pages）。格式：https://<你的帳號>.github.io/card/
    publicUrl: "https://ohyadaisy.github.io/card/",

    // NFC 貼紙與對外 QR Code 要寫入的「永久入口」，也就是 repo 根目錄那一頁。
    // 這個網址永遠不要改——它不變，已發出的名片與貼紙就永遠不用重做。
    entryUrl: "https://ohyadaisy.github.io/",

    title: "沈怡如 Daisy Shen｜儲存電子名片",
    description: "儲存沈怡如的聯絡資訊，並在手機本機記錄相識時間、場合與地點。",

    // 靜態聯絡人檔名。建議用「英文名-姓.vcf」，中間不要有空白。
    vcardFile: "Daisy-Shen.vcf",
  },

  person: {
    // 漢字姓名是 vCard 的正式識別，三語共用，不隨介面語言改變
    name:    { zh: "沈怡如", en: "Daisy Shen", ja: "Daisy Shen" },
    nameSub: { zh: "Daisy Shen", en: "沈怡如", ja: "沈怡如" },
    title:   { zh: "研究員", en: "Researcher", ja: "研究員" },
    domain:  {
      zh: "智慧車輛（聯網自駕車、車用電子）、無人載具（無人機）",
      en: "Smart Vehicles (Connected & Autonomous Vehicles, Automotive Electronics) and Unmanned Vehicles (Drones)",
      ja: "スマートビークル（コネクテッド自動運転車・車載エレクトロニクス）、無人機（ドローン）",
    },
    organization: {
      zh: ["工業技術研究院", "產業科技國際策略發展所", "智慧移動載具與應用研究部 機械與系統研究組"],
      en: ["Industrial Technology Research Institute (ITRI)",
           "Industry, Science and Technology International Strategy Center (ISTI)",
           "Intelligent Mobility & Applications Research Dept. / Machinery & System Research Division"],
      ja: ["台湾工業技術研究院（ITRI）", "産業科学技術国際戦略発展所",
           "スマートモビリティ・応用研究部 機械・システム研究グループ"],
    },
    phone: { display: "03 591 3338", international: "+886-3-591-3338" },
    email: "DaisyShen@itri.org.tw",
    website:  { url: "https://www.itri.org.tw/", label: "itri.org.tw" },
    // 第二個連結。沒有第二個網站時，指回公司首頁即可（這一區不可省略）。
    research: {
      url: "https://www.linkedin.com/in/ohyadaisy/",
      label: { zh: "LinkedIn", en: "LinkedIn", ja: "LinkedIn" },
    },
    // LINE 好友連結。不想放 LINE 時設為 null，並依 SETUP.md 移除該區塊。
    line: { url: "https://line.me/ti/p/tc1YUITu0u" },
  },

  expertise: {
    heading: {
      zh: "智慧車輛與無人載具研究",
      en: "Smart Vehicle & Unmanned Vehicle Research",
      ja: "スマートビークルと無人機の研究",
    },
    bio: {
      zh: "沈怡如（Daisy Shen）現任工研院產業科技國際策略發展所研究員，畢業於國立交通大學運輸科技與管理學系研究所，專長領域為智慧車輛及陸空無人載具。",
      en: "Daisy Shen is a Researcher at ITRI's Industry, Science and Technology International Strategy Center (ISTI). She holds a master's degree from the Department of Transportation Technology and Management at National Chiao Tung University, and specializes in smart vehicles and unmanned ground and aerial vehicles.",
      ja: "沈怡如（Daisy Shen）は台湾工業技術研究院（ITRI）産業科学技術国際戦略発展所の研究員。国立交通大学 運輸科技・管理学系 大学院修了。専門はスマートビークル、無人地上車両・ドローン。",
    },
    advisory: {
      zh: "曾任先進駕駛輔助系統軟體公司專案管理，及 FPGA 高階開發套件公司生產管理職務。目前研究領域為無人機、聯網自駕車、智慧交通及車用電子等相關產業。",
      en: "She previously worked in project management at an ADAS software company and in production management at an FPGA high-end development kit company. Her current research covers drones, connected and autonomous vehicles, smart transportation, and automotive electronics.",
      ja: "以前は先進運転支援システム（ADAS）ソフトウェア企業でプロジェクト管理を、FPGA ハイエンド開発キット企業で生産管理を担当。現在はドローン、コネクテッド自動運転車、スマート交通、車載エレクトロニクスなどの関連産業を研究している。",
    },
    // 3～5 項為宜，手機上超過 5 項會變長條
    items: [
      { zh: "聯網自駕車",             en: "Connected & Autonomous Vehicles",           ja: "コネクテッド自動運転車" },
      { zh: "車用電子",               en: "Automotive Electronics",                    ja: "車載エレクトロニクス" },
      { zh: "無人載具（無人機）",     en: "Unmanned Vehicles (Drones)",                ja: "無人機（ドローン）" },
      { zh: "先進駕駛輔助系統（ADAS）", en: "Advanced Driver Assistance Systems (ADAS)", ja: "先進運転支援システム（ADAS）" },
      { zh: "智慧運輸系統（ITS）",     en: "Intelligent Transportation Systems (ITS)",  ja: "高度道路交通システム（ITS）" },
    ],
  },

  // 主色、深色、輔色。primary 會用在按鈕與重點，dark 用在漸層與文字。
  theme: { primary: "#0a85b8", dark: "#075a91", accent: "#06a89d" },

  assets: {
    logo: "logo.png",              // 公司／單位標誌，橫式。沒有的話見 SETUP.md「可選區塊」
    portrait: "portrait.png",      // 個人照，正方形，建議 404×404 以上
    lineQr: "line-qr.jpg",         // LINE 好友 QR，正方形；換圖規則見 README
    socialPreview: "og.png",       // 分享到社群時的預覽圖，1200×630

    // 紙本名片掃描圖。沒有紙本名片、或不想放的話：
    // 把 paperCard 整段設為 null，並依 SETUP.md 移除頁面上的該區塊。
    paperCard: {
      front: { webp: "card-front-zh.webp", jpg: "card-front-zh.jpg" },
      back:  { webp: "card-back-en.webp",  jpg: "card-back-en.jpg" },
      width: 1057,
      height: 634,

      // 圖上「實際印著」的資料。上面的欄位改了卻沒重掃名片時，
      // npm test 會比對這裡並擋下——圖是點陣檔，不會跟著 config.js 變。
      printed: {
        titleZh: "研究員",
        titleEn: "Researcher",
        phone: "03 591 3338",
        email: "DaisyShen@itri.org.tw",
        address: "中興路四段195號",
      },
    },
  },

  // vCard 內的機構與地址固定用中文原文，不隨介面語言切換——
  // 這是聯絡人的正式紀錄，保持單一寫法才不會同一個人存出三種版本。
  vcard: {
    organization: ["工業技術研究院", "產業科技國際策略發展所", "智慧移動載具與應用研究部 機械與系統研究組"],
    // [郵政信箱, 樓層, 街道, 鄉鎮市區, 縣市, 郵遞區號, 國家]
    address: ["", "10館208室", "中興路四段195號", "竹東鎮", "新竹縣", "310401", "台灣"],
  },
};

export default card;
