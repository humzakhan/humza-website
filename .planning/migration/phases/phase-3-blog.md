# Phase 3 — Blog

> **STATUS: In scope** — execute after Phase 1 is complete and verified.

---

## Goal

Add a `/blog` index page and `/blog/:slug` article pages as React Router v7 route modules. No MDX dependency — each article is a plain `.tsx` file. The design inherits from the shared `root.tsx` shell and stylesheets (`app/styles/theme.css` + `app/styles/landing.css`).

---

## Dependencies

- Phase 0 (scaffold) complete.
- Phase 1 (landing) complete — `root.tsx`, `app/styles/theme.css`, `app/styles/landing.css`, and shared components finalized.
- Phase 2 (works/resume) is deferred; works/resume remain as static assets in `public/` — this is expected and does not block Phase 3.

---

## Steps (outline)

1. **Design the article data shape.** Define a TypeScript interface for article metadata (slug, title, date, description, tags). Articles are self-contained in their route file — no external CMS or data layer in Phase 3.

2. **Create the blog index route** at `app/routes/blog/index.tsx` (or `app/routes/blog.tsx`).
   - Export `meta` with title "Writing — Humza Khan".
   - Render a list of articles; article metadata is imported statically from each article module or from a hand-maintained `app/routes/blog/articles.ts` manifest.

3. **Create a shared Article layout component** at `app/components/ArticleLayout.tsx`.
   - Handles consistent typography, date display, back-link, and `<article>` semantics.
   - Pulls article metadata as props.

4. **Write the first article** as `app/routes/blog/$slug.tsx` (or a named file like `app/routes/blog.my-first-post.tsx`).
   - Exports `meta` using the article's title and description.
   - Uses `<ArticleLayout>` for chrome; body is plain JSX (headings, paragraphs, code blocks using `<pre><code>`).

5. **Add routing.** React Router v7 file-based routing picks up these files automatically; confirm the routes appear in `npm run dev`.

6. **Style article typography.** Add blog/article-specific CSS to a new `app/styles/blog.css` file — prose max-width, line-height, heading hierarchy, code block styling (Geist Mono). Import it in the blog routes (or in `root.tsx` if used globally). Do not add blog styles to `landing.css`.

7. **Update nav.** Add a "Writing" link in the site header (in `root.tsx` or a shared nav component) pointing to `/blog`.

---

## Verification

| Check | Criterion |
|---|---|
| `/blog` renders index | 200, lists at least one article |
| `/blog/:slug` renders article | 200, correct title meta, article content visible |
| Back-link works | Returns to `/blog` |
| Theme toggle works | Blog pages respond to theme switch |
| Nav link present | "Writing" appears in header on all pages |
| No hydration errors | Browser console clean |
