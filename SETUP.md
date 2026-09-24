# SETUP.md — 給 Claude Code 的作業指南

這份是空白範本，附了一組「範例」資料讓它一開箱就跑得起來。
你的工作是把它變成使用者本人的名片，並協助上線。

**原則**
- 先問清楚再改，不要替使用者編造職稱、經歷或聯絡方式。
- 三語（zh／en／ja）缺一不可，`npm test` 會擋。不確定的翻譯要跟使用者確認，不要硬翻。
- 每改一段就跑一次 `npm test`，不要等到最後。
- 涉及刪除既有內容（移除可選區塊）前，先說明會動到哪些檔案。

---

## 第一步：問資料

一次問完，讓使用者一次回答（沒有的可以說「沒有」）：

1. 姓名：中文、英文（日文欄位通常沿用英文拼音）
2. 職稱：中文、英文、日文
3. 公司／單位：中文、英文、日文（可兩層，例如「公司 → 部門」）
4. 專業領域一句話（中英日）
5. 電話（含國碼）、Email
6. 官方網站網址；第二個連結（團隊頁、作品集、個人網站皆可）
7. 自我介紹兩段（中英日，每段 2～3 句）
8. 核心專長 3～5 項（中英日）
9. LINE 好友連結（沒有就說沒有）
10. 公司地址（會寫進通訊錄檔）
11. GitHub 帳號名稱（決定網址：`https://<帳號>.github.io/`）
12. 主色（沒有想法就沿用預設的藍綠）

圖檔另外要：個人照（正方形）、公司 logo（橫式）、LINE QR（正方形）、
紙本名片正反面掃描圖（沒有就跳過）。

### 日文的坑
- 日文沒有「科技」，要寫「科学技術」。
- 半導體機台的日文是「**装置**」，不是「設備」（日文的「設備」指廠房水電）。
- 日文漢字用新字體：産・発・戦・検，不要用繁體字形。

---

## 第二步：改內容

### 1. `card/config.js`
名片內容的唯一真相，**先改這個**。每個欄位上面都有註解說明。
特別注意：
- `site.publicUrl` = `https://<帳號>.github.io/card/`
- `site.entryUrl` = `https://<帳號>.github.io/`（永久入口，NFC 與 QR 寫這個）
- `site.vcardFile` = 通訊錄檔名，建議 `英文名-姓.vcf`，中間不要空白
- `vcard.address` 是七格陣列：`[信箱, 樓層, 街道, 鄉鎮市區, 縣市, 郵遞區號, 國家]`

### 2. `card/index.html`
中文版內容**直接寫在 HTML 裡**（這是刻意的：JS 失效時名片仍然完整可讀、
可撥號、可寄信）。所以 `config.js` 裡改過的中文內容，這裡要同步改一份。
英文與日文由 `app.js` 在切換語言時套上，不必寫進 HTML。

同步更新：`<title>`、`description`、`og:title`、`og:description`、
`manual-fallback` 的 `download` 檔名、`save-result-title` 的檔名。

### 3. `index.html`（根目錄，轉址層）
**三處網址必須一致**，否則會轉到別人的名片：
`<link rel="canonical">`、`<meta http-equiv="refresh">`、JS 裡的 `var TARGET`。
另外把上面顯示的姓名與職稱換掉（轉址那一瞬間會看到）。

### 4. 圖檔
放進 `card/`，檔名對上 `config.js` 的 `assets`：

| 檔案 | 規格 | 備註 |
|---|---|---|
| `logo.png` | 橫式，建議 1200×388 | 去背 PNG 最好看 |
| `portrait.png` | 正方形，404×404 以上 | |
| `line-qr.jpg` | 正方形 | **留白至少 4 個模組**，見下方 |
| `og.png` | 1200×630 | 分享到社群的預覽圖 |
| `card-front-zh.webp` / `.jpg` | 1057×634 | 紙本名片中文面 |
| `card-back-en.webp` / `.jpg` | 1057×634 | 紙本名片英文面 |

圖片尺寸換了就要同步改 `card/index.html` 的 `width`／`height`
與 `config.js` 的 `paperCard.width`／`height`——這兩個數字在防止載入時版面跳動。

#### LINE QR 的三條規則（踩過坑，別重蹈）
1. **四周留白至少 4 個模組**（quiet zone）。算法：黑色定位點方塊邊長 = 7 個模組，
   由此推出單一模組的像素寬。留白不足時掃描容錯會變差。
2. **不要重新取樣**（縮放／模糊）。要加留白就把原圖**以原解析度貼到更大的白底**上。
3. **圖片本身不可加 `border-radius`**。QR 的角落就是定位點，圓角會直接啃掉它。
   視覺圓角交給外層白框（`.line-qr`），只修到留白。

換完用解碼器實測（例如 Python 的 `opencv-python`，`cv2.QRCodeDetector`）
確認解出來的網址正確，再 `npm test`。

### 5. 重新產生通訊錄檔
```bash
npm run vcf
```
改了姓名／電話／Email／地址一定要跑，否則 `npm test` 會擋下
（靜態 `.vcf` 是預先產生的檔案，不會自己跟著 `config.js` 變）。

---

## 可選區塊：沒有的東西怎麼整段拿掉

先跟使用者確認再動手。每一項都要改到「三個地方」：HTML、app.js、config.js，
外加 tests 裡對應的測試。

### 沒有紙本名片掃描圖
1. `card/index.html`：刪掉 `<section class="paper-card">` 整段（含上方註解）。
2. `card/app.js`：
   - `render()` 裡刪掉 `$("paper-step")` 到 `$("paper-hint")` 那一段（約 7 行）。
   - 檔案末尾刪掉 `$("paper-flip").addEventListener(...)` 那一行。
   - 語言切換處若有 `setPaperFace(defaultPaperFace(lang))` 也一併刪。
   - `setPaperFace` 函式與 `paperBack`、`turning`、`HALF_TURN_MS`、`defaultPaperFace`
     可一併刪除（刪之前先 grep 確認沒有別處引用）。
   - UI 表裡三語的 `paper*` 欄位可留可刪，留著不影響。
3. `card/config.js`：`assets.paperCard` 整段設為 `null`。
4. `tests/card.test.mjs`：刪掉「紙本名片翻卡」那一整區的測試
   （從 `const paper = card.assets.paperCard;` 開始到 QR 區之前）。
5. 刪掉 `card/card-front-zh.*`、`card/card-back-en.*` 四個圖檔。
6. `npm test` 要全過。

### 沒有 LINE
1. `card/index.html`：刪掉 `<section class="line-connect">` 整段。
2. `card/app.js`：`render()` 裡刪掉 `$("line-title")`…`$("line-qr-link")` 四行。
3. `card/config.js`：`person.line` 設為 `null`。
4. `card/vcard.js`：刪掉 `X-SOCIALPROFILE` 那一行
   （否則 `card.person.line.url` 會取不到而報錯）。
5. 刪掉 `card/line-qr.jpg`，以及 tests 裡的兩項 QR 測試。

### 沒有公司 logo
`card/index.html` 刪掉 `<div class="org-logo-frame">…</div>`，
`config.js` 的 `assets.logo` 設為 `null`，刪掉 `card/logo.png`。

### 沒有個人照
`card/index.html` 刪掉 `<img class="portrait" …>` 那一行，
`card/app.js` 的 `render()` 刪掉 `$("portrait").alt = t.portraitAlt;`，
`config.js` 的 `assets.portrait` 設為 `null`，刪掉 `card/portrait.png`。

---

## 第三步：驗收

```bash
npm test      # 34 項要全過，包含「已經換成自己的資料」那一關
npm start     # http://localhost:8080/card/
```

**自己先看過這些**（不要只看首屏）：
- [ ] 中文／English／日本語 三顆按鈕都能切換全部內容
- [ ] 手機寬度（390px 以下）沒有橫向捲動、文字沒被切掉
- [ ] 電話點得下去會撥號、Email 點得下去會開信
- [ ] LINE 按鈕與 QR 都開得到正確的好友頁
- [ ] 紙本名片點一下會翻面，**背面沒有鏡像**
- [ ] 圖片都有出現（沒有破圖的替代文字）
- [ ] 分享預覽圖（og.png）有換掉

**再請使用者用實機測，兩個平台都要**：
- [ ] **iPhone**：按「儲存到聯絡人」→ 什麼都不填時應**直接跳出聯絡人卡片**；
      填了相識場合時應走分享選單，且存出來的聯絡人備註含所填內容
- [ ] **Android**：檔案會下載（這是平台限制，Android 沒有任何網頁 API
      能直接開啟「新增聯絡人」——不要再嘗試 `intent://`，實測完全無反應）。
      下載後頁面要跳出綠色成功卡片，使用者不需自己去翻下載資料夾
- [ ] 拒絕 GPS 權限時仍然能存聯絡人

「程式碼一樣所以應該兩邊都會過」是錯的推論——這個坑真的踩過，
Android 的儲存聯絡人曾經整整壞著沒人發現。

---

## 第四步：上線

1. 在 GitHub 建一個 **public** repo，名字必須是 `<帳號>.github.io`
   （使用者站台，一個帳號只能有一個）。
2. 把整包推上去（`main` 分支，根目錄）。
3. repo → Settings → Pages → Source 選 **Deploy from a branch**，
   分支 `main`、資料夾 `/ (root)`，並勾選 **Enforce HTTPS**。
4. 等約 1 分鐘，開 `https://<帳號>.github.io/` 確認會自動轉到 `/card/`。

### 產生對外 QR Code
```bash
pip install segno
python3 scripts/make-qr.py
```
輸出在 `qr/`：`site-qr.svg`（印刷首選）、`site-qr-print.png`（1800px）、
`site-qr.png`（螢幕用）。指向**永久入口**，不是名片頁本體。

**印刷注意**：四周留白不可裁掉（實測裁掉後完全掃不出來），
成品至少 2.5 公分見方，不要在 QR 上壓字或放 logo。
拿去印之前，**用另一支手機實際掃一次**。

### 寫入 NFC 貼紙
- 貼紙：NTAG213 就夠，建議直接買 NTAG215（價差極小、通用性最好）。
  要貼在金屬上（筆電、金屬名片盒）**必須買防金屬款**，一般貼紙貼金屬完全無法感應。
- App：Android 用 NFC Tools 或 NXP TagWriter；iPhone 用 NFC Tools（iOS 13 以上）。
- 步驟：寫入分頁 → 新增一筆記錄 → 選 **URL／URI**（**不要選「文字／Text」**，
  選錯的話掃到只會顯示純文字，不會開網頁，這是最常見的失誤）→
  貼上 `https://<帳號>.github.io/`（含 `https://`）→ 寫入 → 貼近手機 2～3 秒。
- **不要鎖成唯讀**。鎖了沒有任何好處，卻讓貼紙變成廢片——
  有轉址層在，換內容、換平台都不需要碰貼紙。
- 測試要用**另一支手機**，不要用寫入的那支。
- 多片貼紙不可疊放（會互相干擾完全失效）；貼紙不要重複撕貼（天線是印刷線圈，會斷）。

---

## 最後

在 `README.md` 開頭補一行上線日期與網址，方便日後回頭查。
如果使用者有在用 Notion 或其他筆記工具，建議把網址、GitHub repo、
NFC 貼紙買了幾片貼在哪，記在同一個地方——這些東西半年後一定會忘。
