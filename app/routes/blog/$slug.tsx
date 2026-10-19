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
import { BLOG_ID, DEFAULT_OG_IMAGE, PERSON_ID, jsonLd, pageMeta } from "~/lib/seo";
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
  const modified = m.updated ?? m.date;
  const image = m.image
    ? {
        url: absoluteUrl(m.image.src),
        alt: m.image.alt ?? m.title,
        width: m.image.width,
        height: m.image.height,
      }
    : undefined;

  return [
    ...pageMeta({ path, title, description: m.description, image, type: "article" }),
    { name: "keywords", content: m.keywords.join(", ") },
    { name: "author", content: AUTHOR.name },
    { property: "article:published_time", content: m.date },
    { property: "article:modified_time", content: modified },
    { property: "article:author", content: AUTHOR.url },
    ...m.tags.map((tag) => ({ property: "article:tag", content: tag })),
    jsonLd(
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: m.title,
        description: m.description,
        datePublished: m.date,
        dateModified: modified,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": BLOG_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        image: {
          "@type": "ImageObject",
          url: image?.url ?? DEFAULT_OG_IMAGE,
          width: image?.width ?? 1200,
          height: image?.height ?? 630,
        },
        keywords: m.keywords.join(", "),
        articleSection: m.tags[0],
        wordCount,
        inLanguage: "en-CA",
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
    ),
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
