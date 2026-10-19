import { absoluteUrl, getPosts, postPath } from "~/lib/blog";

export const handle = { staticPage: true };

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const STATIC_PATHS = ["/", "/works", "/resume", "/writings", "/blog/"];

export async function loader() {
  const posts = getPosts();

  const pages = STATIC_PATHS.map(
    (path) => `  <url>\n    <loc>${escapeXml(absoluteUrl(path))}</loc>\n  </url>`,
  );

  const postEntries = posts.map((post) => {
    const lines = [
      `    <loc>${escapeXml(absoluteUrl(postPath(post.slug)))}</loc>`,
      `    <lastmod>${escapeXml(post.updated ?? post.date)}</lastmod>`,
    ];
    if (post.image) {
      lines.push(
        `    <image:image>\n      <image:loc>${escapeXml(absoluteUrl(post.image.src))}</image:loc>\n    </image:image>`,
      );
    }
    return `  <url>\n${lines.join("\n")}\n  </url>`;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[...pages, ...postEntries].join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
