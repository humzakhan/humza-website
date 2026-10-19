import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { AsciiBackground } from "~/components/AsciiBackground";
import { Nav } from "~/components/Nav";
import { ArticleLayout } from "~/components/ArticleLayout";
import {
  AUTHOR,
  BLOG_PATH,
  SITE_NAME,
  absoluteUrl,
  countWords,
  postPath,
} from "~/lib/blog";
import { getPost } from "~/lib/blog.server";
import { DEFAULT_OG_IMAGE, PERSON_ID, TWITTER_HANDLE, authorPerson, canonicalLink } from "~/lib/seo";
import "~/styles/blog.css";

// Static page: prerendered, shipped without app JS.
export const handle = { staticPage: true };

export async function loader({ params }: LoaderFunctionArgs) {
  const post = getPost(params.slug ?? "");
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return { post, wordCount: countWords(post.html) };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "Not Found — Humza Khan" }];
  }
  const { post, wordCount } = data;
  const m = post.meta;
  const path = postPath(m.slug);
  const url = absoluteUrl(path);
  const title = m.seoTitle ?? `${m.title} — ${SITE_NAME}`;
  const image = m.image ? absoluteUrl(m.image.src) : DEFAULT_OG_IMAGE;
  const imageAlt = m.image?.alt ?? m.title;
  const modified = m.updated ?? m.date;

  return [
    { title },
    { name: "description", content: m.description },
    { name: "keywords", content: m.keywords.join(", ") },
    { name: "author", content: AUTHOR.name },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    canonicalLink(path),
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { property: "og:title", content: m.title },
    { property: "og:description", content: m.description },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: imageAlt },
    ...(m.image
      ? [
          { property: "og:image:width", content: String(m.image.width) },
          { property: "og:image:height", content: String(m.image.height) },
        ]
      : []),
    { property: "og:site_name", content: SITE_NAME },
    { property: "article:published_time", content: m.date },
    { property: "article:modified_time", content: modified },
    { property: "article:author", content: AUTHOR.url },
    ...m.tags.map((tag) => ({ property: "article:tag", content: tag })),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: TWITTER_HANDLE },
    { name: "twitter:creator", content: TWITTER_HANDLE },
    { name: "twitter:title", content: m.title },
    { name: "twitter:description", content: m.description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: imageAlt },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: m.title,
            description: m.description,
            datePublished: m.date,
            dateModified: modified,
            author: authorPerson,
            publisher: { "@id": PERSON_ID },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            url,
            image,
            keywords: m.keywords.join(", "),
            articleSection: m.tags[0],
            wordCount,
            inLanguage: "en",
            ...(m.originalUrl ? { isBasedOn: m.originalUrl } : {}),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl(BLOG_PATH) },
              { "@type": "ListItem", position: 3, name: m.title, item: url },
            ],
          },
        ],
      },
    },
  ];
};

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <>
      <AsciiBackground staticPage />
      <div className="content">
        <Nav staticPage />
        <ArticleLayout meta={post.meta} html={post.html} />
      </div>
    </>
  );
}
