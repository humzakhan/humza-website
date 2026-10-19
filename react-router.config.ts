import type { Config } from "@react-router/dev/config";
import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const blogDir = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "app/content/blog",
);

function blogSlugs(): string[] {
  return readdirSync(blogDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.slice(0, -".json".length))
    .sort();
}

export default {
  ssr: true,
  // Blog and discovery files are prerendered to static assets at build time;
  // env.ASSETS serves them first, SSR handles everything else.
  async prerender() {
    return [
      "/blog",
      ...blogSlugs().map((slug) => `/blog/${slug}`),
      "/sitemap.xml",
      "/robots.txt",
      "/rss.xml",
      "/llms.txt",
    ];
  },
} satisfies Config;
