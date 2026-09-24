#!/usr/bin/env python3
"""把「永久入口網址」做成對外 QR Code，輸出到 qr/。

    pip install segno
    python3 scripts/make-qr.py

網址取自 card/config.js 的 site.entryUrl —— 寫的是永久入口，不是名片頁本體。
印在紙本名片上的是這一張；名片內容日後怎麼換，這張都不用重印。

輸出：
  qr/site-qr.svg        向量檔，印刷首選
  qr/site-qr-print.png  1800px，送印方不收 SVG 時用
  qr/site-qr.png        900px，螢幕與簡報用

印刷注意：四周留白（quiet zone）不可裁掉，成品至少 2.5 公分見方，
不要在 QR 上壓字或放 logo。
"""
import pathlib, re, sys

try:
    import segno
except ImportError:
    sys.exit("找不到 segno，請先執行：pip install segno")

ROOT = pathlib.Path(__file__).resolve().parent.parent
config = (ROOT / "card" / "config.js").read_text(encoding="utf-8")
m = re.search(r'entryUrl:\s*"([^"]+)"', config)
if not m:
    sys.exit("在 card/config.js 找不到 site.entryUrl")
url = m.group(1)
if "範例" in url:
    sys.exit(f"site.entryUrl 還是範例網址（{url}），請先改成你自己的 GitHub Pages 網址")

qr = segno.make(url, error="h")   # H 級容錯：破損或被遮住一角仍掃得到
out = ROOT / "qr"; out.mkdir(exist_ok=True)
qr.save(out / "site-qr.svg", scale=10, border=4)
qr.save(out / "site-qr-print.png", scale=max(1, 1800 // qr.symbol_size(scale=1, border=4)[0]), border=4)
qr.save(out / "site-qr.png", scale=max(1, 900 // qr.symbol_size(scale=1, border=4)[0]), border=4)
print(f"已產生 qr/ 三個檔案，指向 {url}")
print("請務必用『另一支手機』實際掃一次再拿去印。")
