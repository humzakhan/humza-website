import type { MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { Nav } from "~/components/Nav";
import {
  AUTHOR,
  BLOG_PATH,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  formatDate,
  getPosts,
  postPath,
} from "~/lib/blog";
import { DEFAULT_OG_IMAGE, PERSON_ID, TWITTER_HANDLE, authorPerson, canonicalLink } from "~/lib/seo";
import "~/styles/blog.css";

// Static page: prerendered, shipped without app JS.
export const handle = { staticPage: true };

export async function loader() {
  return { posts: getPosts() };
}

const TITLE = "Blog — Humza Khan";
const DESCRIPTION =
  "Essays and notes by Humza Khan on building software, data systems, and AI products.";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const posts = data?.posts ?? [];
  const url = absoluteUrl(BLOG_PATH);
  return [
    { title: TITLE },
    { name: "description", content: DESCRIPTION },
    { name: "author", content: AUTHOR.name },
    canonicalLink(BLOG_PATH),
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION },
    { property: "og:image", content: DEFAULT_OG_IMAGE },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: TWITTER_HANDLE },
    { name: "twitter:creator", content: TWITTER_HANDLE },
    { name: "twitter:title", content: TITLE },
    { name: "twitter:description", content: DESCRIPTION },
    { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${url}#blog`,
        name: `${SITE_NAME} — Blog`,
        description: DESCRIPTION,
        url,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        author: authorPerson,
        publisher: { "@id": PERSON_ID },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          url: absoluteUrl(postPath(p.slug)),
          datePublished: p.date,
          dateModified: p.updated ?? p.date,
          author: { "@id": PERSON_ID },
        })),
      },
    },
  ];
};

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="content">
      <Nav staticPage />
      <main className="blog-index">
        <header className="blog-index-header">
          <p className="eyebrow">blog</p>
          <h1 className="blog-index-title">Essays &amp; Notes</h1>
          <p className="blog-index-lead">
            Occasional writing on software, building, and the things in between.
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
  );
}
