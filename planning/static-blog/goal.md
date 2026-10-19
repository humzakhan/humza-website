# Goal

Ship a zero-JS, prerendered blog at `/blog/` and `/blog/<slug>/`, with the SEO and AI-search plumbing a content site needs.

## Success criteria

- `/blog/` and every `/blog/<slug>/` are prerendered to static HTML and served from `env.ASSETS`.
- Blog pages ship no app JavaScript (no `<Scripts/>`, no `<ScrollRestoration/>`, no theme inline script). Plausible analytics is the one approved script.
- Each post has a canonical URL, Open Graph and Twitter tags, and `BlogPosting` plus `BreadcrumbList` JSON-LD.
- `/sitemap.xml`, `/robots.txt`, `/rss.xml` and `/llms.txt` are prerendered and list every post.
- Publishing a post needs two new files in `app/content/blog/` and a deploy. No code change.
- Existing pages (`/`, `/works`, `/resume`, `/writings`) keep working, including the dark-mode toggle.

## Out of scope

- A markdown pipeline or CMS.
- Comments, search, tag pages, pagination.
- Redesigns of existing pages.
