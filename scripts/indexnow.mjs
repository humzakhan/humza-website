// Submit URLs to IndexNow (Bing, Yandex, etc.). Run after deploy:
//   node scripts/indexnow.mjs [url ...]
// With no args, submits every <loc> in build/client/sitemap.xml.
import { readFileSync } from "node:fs";

const HOST = "humza.io";
const KEY = "b1d2b9065317c5636a6560d9459a6d59"; // public by design, see public/<key>.txt
const ENDPOINT = "https://api.indexnow.org/indexnow";

let urlList = process.argv.slice(2).filter((a) => a !== "--");
if (urlList.length === 0) {
  const xml = readFileSync(new URL("../build/client/sitemap.xml", import.meta.url), "utf8");
  urlList = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}
if (urlList.length === 0) {
  console.error("indexnow: no URLs to submit");
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`indexnow: HTTP ${res.status}, ${urlList.length} URL(s) submitted`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
