import { SITE_URL } from "~/lib/blog";

export const handle = { staticPage: true };

// Search, answer-engine, and training crawlers are all explicitly welcome.
const CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "DuckAssistBot",
  "meta-externalagent",
  "Amazonbot",
];

export async function loader() {
  const groups = [
    "User-agent: *\nAllow: /",
    ...CRAWLERS.map((agent) => `User-agent: ${agent}\nAllow: /`),
  ];

  const body = `${groups.join("\n\n")}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
