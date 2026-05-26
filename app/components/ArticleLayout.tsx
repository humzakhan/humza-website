import { Link } from "react-router";
import type { ArticleMeta } from "~/routes/blog/articles";

interface ArticleLayoutProps {
  meta: ArticleMeta;
  children: React.ReactNode;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function ArticleLayout({ meta, children }: ArticleLayoutProps) {
  return (
    <article className="article">
      <header className="article-header">
        <Link to="/blog" className="article-back">
          ← Writing
        </Link>
        <h1 className="article-title">{meta.title}</h1>
        <time className="article-date" dateTime={meta.date}>
          {formatDate(meta.date)}
        </time>
        {meta.tags && meta.tags.length > 0 && (
          <ul className="article-tags">
            {meta.tags.map((tag) => (
              <li key={tag} className="article-tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>
      <div className="article-body">{children}</div>
    </article>
  );
}
