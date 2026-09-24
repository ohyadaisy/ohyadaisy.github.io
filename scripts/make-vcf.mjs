// 由 card/config.js 重新產生靜態聯絡人檔（card/<vcardFile>）。
// 改了姓名／電話／Email／地址之後一定要跑一次，否則 npm test 會擋下。
//   用法：npm run vcf
import { writeFileSync } from "node:fs";
import { card } from "../card/config.js";
import { buildVCard } from "../card/vcard.js";

// 固定時戳：讓重跑的結果一致，diff 才看得出真正的改動
const vcf = buildVCard({
  language: "zh",
  timestamp: new Date("2026-09-14T00:00:00.000Z"),
  includeMemory: false,
});

const out = new URL(`../card/${card.site.vcardFile}`, import.meta.url);
writeFileSync(out, vcf, "utf8");
console.log(`已寫出 card/${card.site.vcardFile}（${Buffer.byteLength(vcf)} 位元組）`);
