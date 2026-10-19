import { getPosts, type PostMeta } from "~/lib/blog";

export type Post = { meta: PostMeta; html: string };

// Server-only: keeps article bodies out of client bundles.
const htmlFiles = import.meta.glob<string>("/app/content/blog/*.html", {
  eager: true,
  query: "?raw",
  import: "default",
});

const posts: Post[] = getPosts().map((meta) => {
  const file = `/app/content/blog/${meta.slug}.html`;
  const html = htmlFiles[file];
  if (typeof html !== "string") {
    throw new Error(`Missing blog post body ${file} for "${meta.slug}"`);
  }
  return { meta, html };
});

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.meta.slug === slug);
}
