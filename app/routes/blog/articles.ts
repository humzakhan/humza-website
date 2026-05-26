export interface ArticleMeta {
  slug: string;
  title: string;
  date: string; // ISO 8601, e.g. "2026-05-01"
  description: string;
  tags?: string[];
}

export const articles: ArticleMeta[] = [
  {
    slug: "on-building-things",
    title: "On Building Things",
    date: "2026-05-20",
    description:
      "A few thoughts on why I build, what I've learned after a decade of shipping software, and the small habits that keep momentum alive.",
    tags: ["craft", "building", "software"],
  },
];

/** Lookup by slug — returns undefined if not found. */
export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug);
}
