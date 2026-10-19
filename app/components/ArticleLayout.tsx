import { BLOG_PATH, formatDate, type PostMeta } from "~/lib/blog";

interface ArticleLayoutProps {
  meta: PostMeta;
  /** Trusted, build-time HTML fragment from app/content/blog/<slug>.html */
  html: string;
}

export function ArticleLayout({ meta, html }: ArticleLayoutProps) {
  const hasUpdate = meta.updated && meta.updated !== meta.date;

  return (
    <main className="article-main">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href={BLOG_PATH}>Blog</a>
          </li>
          <li aria-current="page">{meta.title}</li>
        </ol>
      </nav>
      <article className="article">
        <header className="article-header">
          <h1 className="article-title">{meta.title}</h1>
          <p className="dek">{meta.description}</p>
          <p className="article-meta">
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            {hasUpdate && (
              <>
                {" · updated "}
                <time dateTime={meta.updated}>{formatDate(meta.updated!)}</time>
              </>
            )}
            {` · ${meta.readingMinutes} min read`}
          </p>
          <p className="article-byline">
            By <a href="/">Humza Khan</a>, product engineer in Montréal
          </p>
          {meta.tags.length > 0 && (
            <ul className="article-tags">
              {meta.tags.map((tag) => (
                <li key={tag} className="article-tag">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
        {meta.originalUrl && (
          <footer className="article-footer">
            <p>
              Originally published on{" "}
              <a href={meta.originalUrl} rel="noopener">
                Substack
              </a>
              .
            </p>
          </footer>
        )}
      </article>
    </main>
  );
}
