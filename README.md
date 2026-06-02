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

## Project Layout

```
app/
  routes/
    home.tsx          → /
    blog/
      index.tsx       → /blog
      $slug.tsx       → /blog/:slug
  components/         → shared UI components
  styles/             → global CSS

public/
  works/index.html    → /works  (static asset, Phase 2 deferred)
  resume/index.html   → /resume (static asset, Phase 2 deferred)

design/source/        → design source files (Figma exports, etc.)
```

`/works` and `/resume` are served as static HTML assets from `public/` — React migration of those pages is deferred to Phase 2.

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
