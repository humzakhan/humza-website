import { absoluteUrl, getPosts, postPath, SITE_URL } from "~/lib/blog";
import { getPost } from "~/lib/blog.server";

export const handle = { staticPage: true };

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// "]]>" would end the CDATA section early, so split it across two sections.
const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

// Feed readers resolve root-relative URLs against their own origin, so make them absolute.
const absolutizeUrls = (html: string) =>
  html.replace(/(\s(?:src|href)=")\/(?!\/)/g, `$1${SITE_URL}/`);

// RFC 822 date from a YYYY-MM-DD string (midnight UTC).
const rfc822 = (date: string) => new Date(`${date}T00:00:00Z`).toUTCString();

export async function loader() {
  const posts = getPosts();
  const latest = posts[0];

  const items = posts.map((meta) => {
    const url = absoluteUrl(postPath(meta.slug));
    const html = absolutizeUrls(getPost(meta.slug)?.html ?? "");
    return [
      "    <item>",
      `      <title>${escapeXml(meta.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${rfc822(meta.date)}</pubDate>`,
      `      <description>${escapeXml(meta.description)}</description>`,
      ...meta.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      `      <content:encoded>${cdata(html)}</content:encoded>`,
      "    </item>",
    ].join("\n");
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Humza Khan — Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Writing by Humza Khan on AI products, agents, evals, and production systems.</description>
    <language>en</language>
${latest ? `    <lastBuildDate>${rfc822(latest.updated ?? latest.date)}</lastBuildDate>\n` : ""}    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
