# Plan

## Architecture

### Content contract

Each post is two files in `app/content/blog/`:

- `<slug>.html`: semantic HTML body fragment. No `<h1>`, `<script>`, inline handlers or `style` attributes. External links get `rel="noopener"`.
- `<slug>.json`: metadata (`slug`, `title`, `seoTitle?`, `description`, `date`, `updated?`, `tags`, `keywords`, `image?`, `originalUrl?`, `readingMinutes`).

The `slug` must match the file name. Images live in `public/blog/<slug>/` and are referenced by site-absolute path.

### Content modules

- `app/lib/blog.ts`: meta-only and client-safe. Globs and validates the JSON, exports `getPosts()`, `postPath()` (trailing slash), `absoluteUrl()`, `formatDate()`, `countWords()` and site/author constants.
- `app/lib/blog.server.ts`: server-only. Globs the `?raw` HTML and exports `getPost()`. Only loaders import it, so article bodies stay out of client bundles.
- `app/lib/seo.ts`: shared canonical link and JSON-LD author helpers.

### Prerender

`react-router.config.ts` keeps `ssr: true` and adds `prerender()`. It returns `/blog`, every `/blog/<slug>` (slugs read from `app/content/blog/*.json` with `node:fs`), `/sitemap.xml`, `/robots.txt`, `/rss.xml` and `/llms.txt`.

Pages serves `blog/<slug>/index.html` at `/blog/<slug>/` and 308s the slashless form. All internal links, canonicals, sitemap, RSS and llms.txt use the trailing-slash form.

### `staticPage` handle

Blog routes and discovery routes export `handle = { staticPage: true }`. `app/root.tsx` omits `<Scripts/>`, `<ScrollRestoration/>` and the theme no-FOUC script when any match has the flag. Blog pages ship no app JS and do not hydrate.

The only scripts on blog pages are Plausible, JSON-LD and the standalone `/ascii-bg.js` module (progressive enhancement). `public/ascii-bg.js` is the single source of the ASCII background animation. Static pages load it via an inline `<script type="module">` emitted by `<AsciiBackground staticPage />`; hydrated pages `import()` it from `AsciiBackground`'s effect. With no `data-theme` it follows the system colour scheme.

Links from hydrated pages to blog pages must be real document loads (`<a href>` or `reloadDocument`). A client-side navigation would unmount `<Scripts/>` and drop `data-theme`. `Nav` uses a plain `<a href="/blog/">` for this reason.

### Discovery routes

- `sitemap[.]xml.ts`: home, works, resume, writings, blog index and every post.
- `robots[.]txt.ts`: allows crawlers, points at the sitemap.
- `rss[.]xml.ts`: full-content RSS. Root-relative `src`/`href` in post HTML are made absolute before embedding.
- `llms[.]txt.ts`: plain-text index of posts for AI search.

## How to publish a post

1. Add `app/content/blog/<slug>.html` (body fragment per the contract).
2. Add `app/content/blog/<slug>.json` (description 140-160 chars, `seoTitle` up to 60 chars, `date` as `YYYY-MM-DD`).
3. Put images in `public/blog/<slug>/` and reference them as `/blog/<slug>/<file>`. Give the first image `loading="eager" fetchpriority="high"` (likely LCP); lazy-load the rest.
4. Run `pnpm build` and `pnpm typecheck` on a machine that may run them.
5. Run `pnpm run deploy`.

The index, sitemap, RSS, llms.txt and `/writings` pick the post up automatically.

## Markdown for agents

`scripts/build-markdown.mjs` (between `react-router build` and the worker bundle) renders every sitemap URL, converts `<main>` to Markdown and writes `<path>.md`, `blog/<slug>/index.md`, `blog/<slug>.md` and `llms-full.txt` into `build/client`. The worker serves them on `Accept: text/markdown` or a direct `.md` URL and adds `Vary: Accept` to HTML, so posts need no extra step: publishing a post regenerates its Markdown on the next build. The blog HTML stays static and ships no extra JS.

## Not verified

No install, build, typecheck, test or wrangler run happened on this host (execution restricted). Unchecked:

- `pnpm build` and `pnpm typecheck` pass.
- Prerender emits `build/client/blog/<slug>/index.html` and the four discovery files.
- Prerendered blog HTML contains no `<script src>` other than Plausible and JSON-LD, plus the inline `/ascii-bg.js` module import (no `modulepreload`, no `entry.client`).
- Pages serves the prerendered files before SSR and applies `public/_headers`.
- The `.server` module split keeps article bodies out of the `/writings` client chunk.
- Rich Results and RSS validators accept the output.

## Validation (run elsewhere)

- `pnpm run build`
- After deploy: `pnpm run indexnow` (submits every sitemap URL to IndexNow; key file at `public/b1d2b9065317c5636a6560d9459a6d59.txt`)
- `pnpm run typecheck`
- `git diff --check`
- Inspect `build/client/blog/` and the four discovery files.
