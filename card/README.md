# card/ — 名片頁本體

| 檔案 | 用途 |
|---|---|
| `config.js` | **名片內容的唯一真相**。改資料只改這裡 |
| `index.html` | 頁面骨架。中文版內容直接寫在 HTML 裡，JS 失效時仍可讀、可撥號、可寄信 |
| `app.js` | 三語介面用語與互動。姓名與檔名從 `config.js` 取，不寫死 |
| `styles.css` | 樣式 |
| `vcard.js` | vCard 3.0 產生器。折行、跳脫與欄位順序決定通訊錄認不認得這張卡，不要隨意改 |
| `save-strategy.js` | 「存到通訊錄」的逐級降級邏輯 |
| `<vcardFile>.vcf` | 預先產生的純聯絡人檔。`npm run vcf` 重新產生 |
| `favicon.svg` | 分頁圖示 |

圖檔：`logo.png`、`portrait.png`、`line-qr.jpg`、`og.png`、
`card-front-zh.{webp,jpg}`、`card-back-en.{webp,jpg}`。

詳細維護方式見上層的 `README.md`。
