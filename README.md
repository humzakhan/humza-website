# humza-website

Personal website at [humza.io](https://humza.io).

Built with **React Router v7** (framework mode, SSR) + **Cloudflare Workers**, TypeScript, and Vite.

## Stack

| Layer | Technology |
|---|---|
| Routing & SSR | React Router v7 (framework mode) |
| Runtime | Cloudflare Workers |
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

Outputs to `build/server/index.js` (Worker entry) and `build/client/` (static assets).

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

Equivalent to `pnpm run build && wrangler deploy`. Requires a `CLOUDFLARE_API_TOKEN` environment variable with Workers deploy permissions. The `wrangler.jsonc` `routes` block binds `humza.io/*` and `www.humza.io/*` to the Worker on deploy.

## Requirements

- Node >= 20
- [pnpm](https://pnpm.io) (the package manager — version pinned via `packageManager` in `package.json`)
- [wrangler](https://developers.cloudflare.com/workers/wrangler/) (installed as a dev dependency via `pnpm install`)
