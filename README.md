# humza-website

Personal website at [humza.io](https://humza.io).

Built with **React Router v7** (framework mode, SSR) + **Cloudflare Pages** (Advanced Mode / `_worker.js`), TypeScript, and Vite.

## Stack

| Layer | Technology |
|---|---|
| Routing & SSR | React Router v7 (framework mode) |
| Runtime | Cloudflare Pages (Advanced Mode) |
| Bundler | Vite + `@cloudflare/vite-plugin` |
| Language | TypeScript |

## Routes

| Path | Source | Notes |
|---|---|---|
| `/` | `app/routes/home.tsx` | SSR |
| `/works` | `app/routes/works.tsx` | SSR |
| `/resume` | `app/routes/resume.tsx` | SSR |
| `/writings` | `app/routes/writings.tsx` | SSR, lists blog essays and X posts |
| `/blog/` | `app/routes/blog/index.tsx` | Prerendered, no app JS |
| `/blog/<slug>/` | `app/routes/blog/$slug.tsx` | Prerendered, no app JS |
| `/sitemap.xml` | `app/routes/sitemap[.]xml.ts` | Prerendered |
| `/robots.txt` | `app/routes/robots[.]txt.ts` | Prerendered |
| `/rss.xml` | `app/routes/rss[.]xml.ts` | Prerendered |
| `/llms.txt` | `app/routes/llms[.]txt.ts` | Prerendered |

Blog and discovery routes export `handle = { staticPage: true }`, which makes the root layout drop `<Scripts/>`, `<ScrollRestoration/>` and the theme script. Link to them with a plain `<a href>`, not a client-side `<Link>`.

## Project Layout

```
app/
  routes/             → route modules (see Routes)
  components/         → shared UI components
  content/blog/       → blog posts: <slug>.html + <slug>.json
  lib/                → blog.ts (meta), blog.server.ts (bodies), seo.ts
  styles/             → global CSS

public/
  blog/<slug>/        → post images
  _headers            → Cloudflare Pages headers

planning/             → goal.md + plan.md per workstream
design/source/        → design source files (Figma exports, etc.)
```

## Publishing a blog post

1. Add `app/content/blog/<slug>.html`: a body fragment (no `<h1>`, no scripts, no inline styles).
2. Add `app/content/blog/<slug>.json`: `slug`, `title`, `description`, `date`, `tags`, `keywords`, `readingMinutes`, plus optional `seoTitle`, `updated`, `image`, `originalUrl`.
3. Put images in `public/blog/<slug>/` and reference them as `/blog/<slug>/<file>`.
4. Run `pnpm build`, then `pnpm run deploy`.

The post is prerendered at `/blog/<slug>/` and added to the blog index, `/writings`, sitemap, RSS and `llms.txt` automatically. See `planning/static-blog/plan.md` for the full contract.

## Local Development

```bash
pnpm install
pnpm dev
```

Starts a local Vite dev server with Cloudflare Workers emulation via Wrangler.

## Build

```bash
pnpm build
```

Runs `react-router build` then `scripts/build-pages-worker.mjs`.

Outputs:
- `build/client/` — static assets (JS chunks, CSS, favicons, etc.)
- `build/client/_worker.js` — self-contained SSR Worker bundle (Pages Advanced Mode)
- `build/server/index.js` — intermediate RR server build (input to the worker bundler)

## Type Check

```bash
pnpm typecheck
```

Runs `tsc --noEmit` against the full project.

## Deploy

```bash
CLOUDFLARE_API_TOKEN=<token> pnpm run deploy
```

> Note: use `pnpm run deploy` (not `pnpm deploy`) — `deploy` is a reserved pnpm built-in command.

Equivalent to:

```bash
pnpm run build && wrangler pages deploy build/client --project-name humza-website --commit-dirty=true
```

Requires a `CLOUDFLARE_API_TOKEN` environment variable with Pages deploy permissions.

Deploys to the **`humza-website` Cloudflare Pages project**. The custom domain `humza.io` is already bound to that Pages project in the Cloudflare dashboard — no local domain configuration is needed. Pages Advanced Mode picks up `build/client/_worker.js` as the SSR request handler automatically.

## Requirements

- Node >= 20
- [pnpm](https://pnpm.io) (the package manager — version pinned via `packageManager` in `package.json`)
- [wrangler](https://developers.cloudflare.com/workers/wrangler/) (installed as a dev dependency via `pnpm install`)
