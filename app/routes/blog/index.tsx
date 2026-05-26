import type { MetaFunction } from "react-router";
import { Nav } from "~/components/Nav";
import { articles } from "./articles";
import "~/styles/blog.css";

export const meta: MetaFunction = () => [
  { title: "Writing — Humza Khan" },
  {
    name: "description",
    content: "Essays and notes on building software, systems, and startups.",
  },
];

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default function BlogIndex() {
  return (
    <div className="content">
      <Nav />
      <main className="blog-index">
        <header className="blog-index-header">
          <p className="eyebrow">writing</p>
          <h1 className="blog-index-title">Essays &amp; Notes</h1>
          <p className="blog-index-lead">
            Occasional writing on software, building, and the things in between.
          </p>
        </header>

        <ul className="article-list">
          {articles.map((article) => (
            <li key={article.slug} className="article-row">
              <a href={`/blog/${article.slug}`} className="article-row-link">
                <div className="article-row-body">
                  <h2 className="article-row-title">{article.title}</h2>
                  <p className="article-row-desc">{article.description}</p>
                </div>
                <time
                  className="article-row-date"
                  dateTime={article.date}
                >
                  {formatDate(article.date)}
                </time>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
