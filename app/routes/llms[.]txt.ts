import { absoluteUrl, getPosts, postPath, SITE_URL } from "~/lib/blog";

export const handle = { staticPage: true };

export async function loader() {
  const posts = getPosts();

  const postLines = posts.map(
    (post) => `- [${post.title}](${absoluteUrl(postPath(post.slug))}): ${post.description}`,
  );

  const sections = [
    `# Humza Khan

> Humza Khan is a product engineer and AI engineer in Montréal (Montreal), Canada. He builds AI agents, LLM evaluation, agent safeguards and production data systems.`,
    `## Key facts

- Location: Montréal, Québec, Canada
- Current role: Founding Engineer at a stealth spatial-intelligence startup (since April 2026)
- Past roles: Senior Software Engineer at Integral (2024-2025); Senior Software Engineer at Lookout (2022-2024); Full Stack Engineer at Revelate (2019-2022); earlier consulting
- Stack: Python, TypeScript, Go, Postgres, pgvector, React, Next.js; also experienced with Java, Scala, Kafka, AWS, Terraform
- Focus: AI agents, LLM evaluation, AI safety and safeguards, distributed systems, financial data platforms
- Credential: AWS Certified Solutions Architect – Associate
- Open source: Provenant and Fauxbooks (Go)
- Languages: English, French (basic), Urdu
- Profiles: [GitHub](https://github.com/humzakhan), [LinkedIn](https://www.linkedin.com/in/humzakhaan/), [X](https://x.com/0xHumza), [Substack](https://humzaaa.substack.com)`,
    `## Pages

- [Home](${absoluteUrl("/")}): Overview of Humza Khan, a product engineer in Montréal, Canada.
- [Works](${absoluteUrl("/works")}): Projects across AI agent safeguards, LLM evaluation, trade analytics at 200-400M messages per day, and open-source Go tools.
- [Resume](${absoluteUrl("/resume")}): Experience, tech stack and recognition. [PDF version](${SITE_URL}/humza-khan-resume.pdf).
- [Writings](${absoluteUrl("/writings")}): Essays and notes on AI agents, verifying AI-generated code, LLM evaluation and production systems.
- [Blog](${absoluteUrl("/blog/")}): Full-text essays on AI engineering.`,
    `## Blog\n\n${postLines.length ? postLines.join("\n") : "- No posts yet."}`,
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
