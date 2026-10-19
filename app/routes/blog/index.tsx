import type { MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { AsciiBackground } from "~/components/AsciiBackground";
import { Nav } from "~/components/Nav";
import { BLOG_PATH, SITE_NAME, absoluteUrl, formatDate, getPosts, postPath } from "~/lib/blog";
import { BLOG_ID, PERSON_ID, WEBSITE_ID, jsonLd, pageMeta } from "~/lib/seo";
import "~/styles/blog.css";

// Static page: prerendered, shipped without app JS.
export const handle = { staticPage: true };

export async function loader() {
  return { posts: getPosts() };
}

const TITLE = "Blog: AI Engineering Essays | Humza Khan";
const DESCRIPTION =
  "Essays by Humza Khan, a product engineer in Montréal, on verifying AI-generated code, agent infrastructure, data systems and building AI products.";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const posts = data?.posts ?? [];
  const url = absoluteUrl(BLOG_PATH);
  return [
    ...pageMeta({ path: BLOG_PATH, title: TITLE, description: DESCRIPTION }),
    jsonLd(
      {
        "@type": "Blog",
        "@id": BLOG_ID,
        url,
        name: `${SITE_NAME} — Blog`,
        description: DESCRIPTION,
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        inLanguage: "en-CA",
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: absoluteUrl(postPath(p.slug)),
          datePublished: p.date,
          description: p.description,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: url },
        ],
      },
    ),
  ];
};

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <>
      <AsciiBackground staticPage />
      <div className="content">
        <Nav staticPage />
        <main className="blog-index">
          <header className="blog-index-header">
            <p className="eyebrow">blog</p>
            <h1 className="blog-index-title">Essays &amp; Notes</h1>
            <p className="blog-index-lead">
              Essays on AI engineering, agent infrastructure and verifying AI-generated code, by a product engineer in Montréal.
            </p>
          </header>

          <ul className="article-list">
            {posts.map((post) => (
              <li key={post.slug} className="article-row">
                <a href={postPath(post.slug)} className="article-row-link">
                  <div className="article-row-body">
                    <h2 className="article-row-title">{post.title}</h2>
                    <p className="article-row-desc">{post.description}</p>
                  </div>
                  <time className="article-row-date" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </a>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
