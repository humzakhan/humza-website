export const SITE_URL = "https://humza.io";
export const SITE_NAME = "Humza Khan";
export const AUTHOR = {
  name: "Humza Khan",
  url: "https://humza.io/",
  sameAs: [
    "https://x.com/0xHumza",
    "https://humzaaa.substack.com",
    "https://github.com/humzakhan",
    "https://www.linkedin.com/in/humzakhaan/",
    "https://www.upwork.com/freelancers/~01da283dbe40c60c70",
  ],
};

/** Blog index URL path (trailing slash: Pages serves blog/index.html there). */
export const BLOG_PATH = "/blog/";

export type PostImage = {
  src: string; // site-absolute path, e.g. /blog/<slug>/cover.jpg
  alt: string;
  width: number;
  height: number;
};

export type PostMeta = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string; // YYYY-MM-DD
  tags: string[];
  keywords: string[];
  image?: PostImage;
  originalUrl?: string;
  readingMinutes: number;
};

/** Meta-only module: safe for client bundles. Post bodies live in blog.server.ts. */
const metaFiles = import.meta.glob<unknown>("/app/content/blog/*.json", {
  eager: true,
  import: "default",
});

function fail(file: string, problem: string): never {
  throw new Error(`Invalid blog post metadata in ${file}: ${problem}`);
}

function isString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((s) => typeof s === "string");
}

function requireDate(file: string, field: string, v: unknown): string {
  if (!isString(v) || !/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    fail(file, `"${field}" must be a YYYY-MM-DD string`);
  }
  return v;
}

function parseMeta(file: string, raw: unknown): PostMeta {
  if (typeof raw !== "object" || raw === null) fail(file, "expected a JSON object");
  const r = raw as Record<string, unknown>;

  if (!isString(r.slug)) fail(file, 'missing "slug"');
  if (!isString(r.title)) fail(file, 'missing "title"');
  if (!isString(r.description)) fail(file, 'missing "description"');
  if (!isStringArray(r.tags)) fail(file, '"tags" must be a string array');
  if (!isStringArray(r.keywords)) fail(file, '"keywords" must be a string array');
  if (typeof r.readingMinutes !== "number" || !(r.readingMinutes > 0)) {
    fail(file, '"readingMinutes" must be a positive number');
  }
  if (r.seoTitle !== undefined && !isString(r.seoTitle)) fail(file, '"seoTitle" must be a string');
  if (r.originalUrl !== undefined && !isString(r.originalUrl)) {
    fail(file, '"originalUrl" must be a string');
  }

  const date = requireDate(file, "date", r.date);
  const updated = r.updated === undefined ? undefined : requireDate(file, "updated", r.updated);

  let image: PostImage | undefined;
  if (r.image !== undefined) {
    const i = r.image as Record<string, unknown> | null;
    if (
      typeof i !== "object" ||
      i === null ||
      !isString(i.src) ||
      !i.src.startsWith("/") ||
      !isString(i.alt) ||
      typeof i.width !== "number" ||
      typeof i.height !== "number"
    ) {
      fail(file, '"image" needs src (site-absolute), alt, width, height');
    }
    image = { src: i.src, alt: i.alt, width: i.width, height: i.height };
  }

  return {
    slug: r.slug,
    title: r.title,
    seoTitle: r.seoTitle as string | undefined,
    description: r.description,
    date,
    updated,
    tags: r.tags,
    keywords: r.keywords,
    image,
    originalUrl: r.originalUrl as string | undefined,
    readingMinutes: r.readingMinutes,
  };
}

function loadPosts(): PostMeta[] {
  const posts: PostMeta[] = [];
  for (const [file, raw] of Object.entries(metaFiles)) {
    const meta = parseMeta(file, raw);
    if (!file.endsWith(`/${meta.slug}.json`)) {
      fail(file, `"slug" (${meta.slug}) must match the file name`);
    }
    posts.push(meta);
  }
  // Newest first; ties broken by slug so the order is stable.
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  return posts;
}

const posts = loadPosts();

export function getPosts(): PostMeta[] {
  return posts;
}

/** Trailing slash on purpose: Pages 308s the slashless form. */
export function postPath(slug: string): string {
  return `/blog/${slug}/`;
}

export function absoluteUrl(path: string): string {
  return SITE_URL + path;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/** Rough word count of an HTML fragment (tags stripped). */
export function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
  return text.split(/\s+/).filter(Boolean).length;
}
