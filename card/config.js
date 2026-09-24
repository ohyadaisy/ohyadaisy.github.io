// ─────────────────────────────────────────────────────────────
// 名片內容的單一真相。改名片資料只要改這個檔，
// 頁面、介面用語與 vCard 都會一起跟著變。
//
// 每個可翻譯欄位都是 { zh, en, ja } 三語對照，缺一不可
// （漏翻時 npm test 會擋下）。
//
// ⚠️ 目前全部是「範例」資料。npm test 會因為偵測到範例資料而失敗，
//    這是刻意的——確保沒有人不小心把範例名片發布出去。
//    把下面每一處換成你自己的資料後，測試就會通過。
// ─────────────────────────────────────────────────────────────
export const card = {
  site: {
    // 名片頁本身的網址（GitHub Pages）。格式：https://<你的帳號>.github.io/card/
    publicUrl: "https://範例帳號.github.io/card/",

    // NFC 貼紙與對外 QR Code 要寫入的「永久入口」，也就是 repo 根目錄那一頁。
    // 這個網址永遠不要改——它不變，已發出的名片與貼紙就永遠不用重做。
    entryUrl: "https://範例帳號.github.io/",

    title: "範例姓名 Sample Name｜儲存電子名片",
    description: "儲存範例姓名的聯絡資訊，並在手機本機記錄相識時間、場合與地點。",

    // 靜態聯絡人檔名。建議用「英文名-姓.vcf」，中間不要有空白。
    vcardFile: "Sample-Name.vcf",
  },

  person: {
    // 漢字姓名是 vCard 的正式識別，三語共用，不隨介面語言改變
    name:    { zh: "範例姓名", en: "Sample Name", ja: "Sample Name" },
    nameSub: { zh: "Sample Name", en: "範例姓名", ja: "範例姓名" },
    title:   { zh: "範例職稱", en: "Sample Title", ja: "サンプル職位" },
    domain:  { zh: "範例領域", en: "Sample Domain", ja: "サンプル分野" },
    organization: {
      zh: ["範例股份有限公司", "範例事業部"],
      en: ["Sample Company Ltd.", "Sample Business Unit"],
      ja: ["サンプル株式会社", "サンプル事業部"],
    },
    phone: { display: "02 1234 5678", international: "+886-2-1234-5678" },
    email: "sample@example.com",
    website:  { url: "https://example.com/", label: "example.com" },
    // 第二個連結。沒有第二個網站時，指回公司首頁即可（這一區不可省略）。
    research: {
      url: "https://example.com/about",
      label: { zh: "範例連結", en: "Sample Link", ja: "サンプルリンク" },
    },
    // LINE 好友連結。不想放 LINE 時設為 null，並依 SETUP.md 移除該區塊。
    line: { url: "https://line.me/ti/p/範例代碼" },
  },

  expertise: {
    heading: {
      zh: "範例專業領域標題",
      en: "Sample Expertise Heading",
      ja: "サンプル専門分野の見出し",
    },
    bio: {
      zh: "這裡寫兩三句自我介紹：你做什麼、專長是什麼、對方為什麼會想記住你。",
      en: "Two or three sentences about what you do, what you are good at, and why someone would want to remember you.",
      ja: "自己紹介を 2〜3 文で。何をしていて、何が得意で、なぜ覚えてもらいたいのか。",
    },
    advisory: {
      zh: "第二段補充：目前參與的專案、可以提供的協助，或想讓對方知道的合作方向。",
      en: "A second paragraph: current projects, how you can help, or the kind of collaboration you are open to.",
      ja: "2 段落目：現在の取り組み、提供できる支援、期待する協業の方向性など。",
    },
    // 3～5 項為宜，手機上超過 5 項會變長條
    items: [
      { zh: "核心專長一", en: "Core Skill One",   ja: "コアスキル 1" },
      { zh: "核心專長二", en: "Core Skill Two",   ja: "コアスキル 2" },
      { zh: "核心專長三", en: "Core Skill Three", ja: "コアスキル 3" },
      { zh: "核心專長四", en: "Core Skill Four",  ja: "コアスキル 4" },
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
        titleZh: "範例職稱",
        titleEn: "Sample Title",
        phone: "02 1234 5678",
        email: "sample@example.com",
        address: "範例路一段 1 號",
      },
    },
  },

  // vCard 內的機構與地址固定用中文原文，不隨介面語言切換——
  // 這是聯絡人的正式紀錄，保持單一寫法才不會同一個人存出三種版本。
  vcard: {
    organization: ["範例股份有限公司", "範例事業部"],
    // [郵政信箱, 樓層, 街道, 鄉鎮市區, 縣市, 郵遞區號, 國家]
    address: ["", "", "範例路一段 1 號", "範例區", "範例市", "100", "台灣"],
  },
};

export default card;
