/**
 * Post-build step: render every public page to Markdown for agents.
 *
 * Run AFTER `react-router build` (needs build/server/index.js and the
 * prerendered build/client/sitemap.xml) and BEFORE build-pages-worker.mjs.
 * Node-only: turndown is never bundled into the worker.
 *
 * Each URL in the sitemap is rendered through the SSR handler, reduced to its
 * <main> content and converted with turndown. Output goes to build/client so
 * Pages serves it as a static asset and the worker can negotiate on Accept:
 *   /          -> index.md
 *   /works     -> works.md
 *   /blog/     -> blog/index.md + blog.md
 *   /blog/<s>/ -> blog/<s>/index.md + blog/<s>.md
 * It also writes llms-full.txt, every page concatenated.
 */

import { createRequestHandler } from "react-router";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const clientDir = resolve(root, "build/client");
const SITE = "https://humza.io";
const AUTHOR = "Humza Khan";

const build = await import(pathToFileURL(resolve(root, "build/server/index.js")).href);
const handle = createRequestHandler(build, "production");

const loadContext = {
  cloudflare: {
    env: {},
    ctx: { waitUntil() {}, passThroughOnException() {} },
    cf: undefined,
    caches: undefined,
  },
};

const sitemap = await readFile(resolve(clientDir, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
if (!urls.length) throw new Error("No <loc> entries found in build/client/sitemap.xml");

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

// Read <meta> content by name/property; returns every match in document order.
function metaAll(head, key) {
  const out = [];
  for (const tag of head.match(/<meta\b[^>]*>/g) ?? []) {
    const k = tag.match(/\b(?:name|property)="([^"]*)"/)?.[1];
    if (k !== key) continue;
    const v = tag.match(/\bcontent="([^"]*)"/)?.[1];
    if (v !== undefined) out.push(decode(v));
  }
  return out;
}

const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*",
});
td.use(gfm);
td.remove((node) => {
  const name = node.nodeName.toLowerCase();
  if (["script", "style", "noscript", "svg", "nav"].includes(name)) return true;
  if (node.getAttribute?.("aria-hidden") === "true") return true;
  if (name === "button" && /^\s*[\u00d7x]?\s*$/i.test(node.textContent ?? "")) return true;
  const cls = node.getAttribute?.("class") ?? "";
  return /(^|\s)(ascii-bg|theme-toggle|clock|scroll-cue|skip-link)(\s|$)/.test(cls);
});

// Card-style links wrap headings and paragraphs; flatten them to one line so
// the output is `[Title — blurb](url)` instead of a link split across blocks.
const BLOCK = /^(h[1-6]|p|div|ul|ol|li|section|article|header|footer|figure|time)$/;
td.addRule("blockLink", {
  filter: (node) =>
    node.nodeName === "A" &&
    node.getAttribute("href") &&
    (node.querySelectorAll("*").length > 1 ||
      [...node.querySelectorAll("*")].some((el) => BLOCK.test(el.nodeName.toLowerCase()))),
  replacement: (content, node) => {
    const text = content
      .replace(/^#+\s+/gm, "")
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean)
      .join(" \u2014 ")
      .replace(/\s+/g, " ")
      .replace(/([\[\]])/g, "\\$1");
    return `\n\n[${text}](${node.getAttribute("href")})\n\n`;
  },
});
// Keep adjacent inline labels apart (e.g. stat value and unit spans).
td.addRule("spacedSpan", {
  filter: (node) => node.nodeName === "SPAN" && !node.closest("pre, code"),
  replacement: (content) => (content.trim() ? ` ${content.trim()} ` : content),
});

// Pick the content region: <main>, else .content container, else <body>.
function contentOf(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/);
  if (main) return main[1];
  const content = html.match(/<(div|section)\b[^>]*class="[^"]*\bcontent\b[^"]*"[^>]*>([\s\S]*)<\/\1>/);
  if (content) return content[2];
  return html.match(/<body\b[^>]*>([\s\S]*)<\/body>/)?.[1] ?? html;
}

// Root-relative links and images become absolute; protocol-relative stay as is.
const absolutize = (md) =>
  md.replace(/(\]\()(\/(?!\/)[^)\s]*)/g, (_, p, path) => `${p}${SITE}${path}`);

const yamlStr = (s) => JSON.stringify(s);

function canonicalToFiles(pathname) {
  if (pathname === "/") return ["index.md"];
  if (pathname.endsWith("/")) {
    const base = pathname.slice(1, -1);
    return [`${base}/index.md`, `${base}.md`];
  }
  return [`${pathname.slice(1)}.md`];
}

const pages = [];
for (const url of urls) {
  const res = await handle(new Request(url, { headers: { Accept: "text/html" } }), loadContext);
  if (res.status !== 200) throw new Error(`${url} rendered ${res.status}, expected 200`);
  const html = await res.text();

  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
  const title = decode(head.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? "").trim();
  const description = metaAll(head, "description")[0] ?? "";
  const canonical = decode(head.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1] ?? url);

  let body = td.turndown(contentOf(html));
  body = absolutize(body).replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();

  const fm = ["---", `title: ${yamlStr(title)}`];
  if (description) fm.push(`description: ${yamlStr(description)}`);
  fm.push(`url: ${canonical}`);
  const published = metaAll(head, "article:published_time")[0];
  if (published) {
    const modified = metaAll(head, "article:modified_time")[0];
    const tags = metaAll(head, "article:tag");
    fm.push(`author: ${yamlStr(AUTHOR)}`, `published: ${published}`);
    if (modified) fm.push(`modified: ${modified}`);
    if (tags.length) fm.push(`tags: [${tags.map(yamlStr).join(", ")}]`);
  }
  fm.push("---");

  const h1 = /^#\s/.test(body) ? "" : `# ${title.split(" | ")[0]}\n\n`;
  const markdown = `${fm.join("\n")}\n\n${h1}${body}\n`;

  const { pathname } = new URL(canonical);
  for (const file of canonicalToFiles(pathname)) {
    const out = resolve(clientDir, file);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, markdown);
    console.log(`markdown: build/client/${file} (${markdown.length} bytes) <- ${canonical}`);
  }
  pages.push({ url: canonical, body: `${h1}${body}` });
}

const full =
  `# ${AUTHOR} — full site content\n\n` +
  pages.map((p) => `Source: ${p.url}\n\n${p.body}`).join("\n\n---\n\n") +
  "\n";
await writeFile(resolve(clientDir, "llms-full.txt"), full);
console.log(`markdown: build/client/llms-full.txt (${full.length} bytes, ${pages.length} pages)`);
