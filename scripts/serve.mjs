// 零依賴的本機預覽伺服器（開發用，不是正式主機）。
//   npm start   → http://localhost:8080/card/
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname } from "node:path";

const ROOT = new URL("../", import.meta.url);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".vcf": "text/vcard; charset=utf-8",
};

createServer(async (req, res) => {
  let path = decodeURIComponent(req.url.split("?")[0]);
  if (path.endsWith("/")) path += "index.html";
  try {
    const body = await readFile(new URL(`.${path}`, ROOT));
    res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("404");
  }
}).listen(8080, () => console.log("預覽：http://localhost:8080/card/　（Ctrl+C 結束）"));
