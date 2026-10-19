import { absoluteUrl, getPosts, postPath, SITE_URL } from "~/lib/blog";

export const handle = { staticPage: true };

export async function loader() {
  const posts = getPosts();

  const postLines = posts.map(
    (post) => `- [${post.title}](${absoluteUrl(postPath(post.slug))}): ${post.description}`,
  );

  const sections = [
    `# Humza Khan

> Humza Khan is a product engineer in Montréal who builds AI products, agents, and production systems, with a focus on agent safety, LLM evaluation, and distributed systems.`,
    `He has a decade of experience across distributed systems, financial data platforms, mobile security, and production AI tooling. He is currently a founding engineer at a stealth spatial-intelligence startup, and builds open-source projects such as Provenant and Fauxbooks on GitHub (https://github.com/humzakhan).`,
    `## Blog\n\n${postLines.length ? postLines.join("\n") : "- No posts yet."}`,
    `## Pages

- [Works](${absoluteUrl("/works")}): Selected work across AI, finance, infrastructure, and open source.
- [Resume](${absoluteUrl("/resume")}): Experience, tech stack, and recognition.
- [Writings](${absoluteUrl("/writings")}): Essays and where to follow his writing.`,
    `## Optional

- [RSS feed](${SITE_URL}/rss.xml): Full-text feed of every blog post.
- [Sitemap](${SITE_URL}/sitemap.xml): All indexable pages.`,
  ];

  return new Response(`${sections.join("\n\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
