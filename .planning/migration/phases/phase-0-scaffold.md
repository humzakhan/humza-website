# Phase 0 — Scaffold

**STATUS: In current scope — execute this phase first.**

---

## Objective

Bootstrap a React Router v7 + Cloudflare Workers application inside the existing `humza-website` repo without breaking the currently live static site. At the end of this phase:

- The React app builds and runs locally.
- `GET /` serves a React-rendered page (placeholder, not yet the final design).
- `GET /works` and `GET /resume` serve the existing static HTML files unchanged.
- The wrangler config is wired and `wrangler dev` starts without errors.

---

## Prerequisites

- Node.js >= 20 (check with `node -v`).
- `npm` available.
- `wrangler` CLI installed globally or via npx (v3+).
- Working directory: repo root `/Users/humza/projects/humza-website` on branch `feat/ssr-react-migration`.

---

## Steps

### Step 1 — Copy design source into repo

```bash
mkdir -p design/source
cp /Users/humza/downloads/humza-io-landing.html design/source/humza-io-landing.html
```

Commit this file as a reference artifact. It is the single source of truth for Phase 1 implementation.

### Step 2 — Initialize the React Router v7 app

Use the official Cloudflare template to scaffold into the repo. Because the repo is not empty, scaffold into a temp directory and merge files manually, or use the `--force` flag if the CLI supports it:

```bash
# Option A: scaffold into a subdirectory, then hoist
npx create-react-router@latest _scaffold --template cloudflare
# copy app/, public/ (empty), react-router.config.ts, vite.config.ts,
# tsconfig.json, package.json (merge scripts/deps), wrangler.jsonc into repo root
rm -rf _scaffold
```

Key files to bring over:
- `app/root.tsx` — app shell
- `app/routes/home.tsx` — placeholder home route
- `react-router.config.ts`
- `vite.config.ts` (with `@cloudflare/vite-plugin`)
- `wrangler.jsonc`
- `tsconfig.json`
- `package.json` — merge with any existing entries; do not drop existing scripts

If merging `package.json` manually, the essential new dependencies are:

```json
{
  "dependencies": {
    "@react-router/cloudflare": "^7",
    "react": "^19",
    "react-dom": "^19",
    "react-router": "^7"
  },
  "devDependencies": {
    "@cloudflare/vite-plugin": "^1",
    "@react-router/dev": "^7",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "vite": "^6",
    "wrangler": "^3"
  }
}
```

### Step 3 — Configure wrangler.jsonc

Confirm or create `wrangler.jsonc` at repo root:

```jsonc
{
  "name": "humza-website",
  "compatibility_date": "2025-01-01",
  "main": "build/server/index.js",
  "assets": {
    "directory": "./public"
  }
}
```

The `assets.directory` points to `public/`, where the static HTML files will live.

### Step 4 — Copy static HTML assets into public/

```bash
mkdir -p public/works public/resume
cp works/index.html public/works/index.html
cp resume/index.html public/resume/index.html
```

These files are served by Cloudflare as static assets before the Worker runs. No routing rule or redirect is needed.

### Step 5 — Add npm scripts

Ensure `package.json` contains:

```json
"scripts": {
  "dev": "react-router dev",
  "build": "react-router build",
  "deploy": "npm run build && wrangler deploy",
  "typecheck": "tsc --noEmit"
}
```

### Step 6 — Install dependencies

```bash
npm install
```

### Step 7 — Verify the scaffold builds

```bash
npm run build
```

Expected: no TypeScript or Vite errors; `build/` directory created with `build/server/index.js` and `build/client/`.

### Step 8 — Verify local dev server

```bash
npm run dev
```

- `GET http://localhost:5173/` — React placeholder home renders.
- `GET http://localhost:5173/works` — existing works HTML renders (Vite dev proxies static assets from `public/`).
- `GET http://localhost:5173/resume` — existing resume HTML renders.

### Step 9 — Verify wrangler dev (optional but recommended)

```bash
npx wrangler dev
```

- Same three URLs as above must work.
- No unhandled errors in wrangler output.

---

## Stop Condition

Phase 0 is complete when:

1. `npm run build` exits 0.
2. All three routes (`/`, `/works`, `/resume`) respond at `localhost:5173` in `npm run dev`.
3. `design/source/humza-io-landing.html` exists in the repo.
4. No existing files at repo root (`index.html`, `works/index.html`, `resume/index.html`, `deploy.sh`, `README.md`) have been modified.

---

## Verification Checklist

| Check | How |
|---|---|
| Build exits 0 | `npm run build` |
| `/` returns 200 with React HTML | `curl -s http://localhost:5173/ \| head -5` |
| `/works` returns 200 with static works page | Browser or curl |
| `/resume` returns 200 with static resume page | Browser or curl |
| No TS errors | `npm run typecheck` |
| Design source file present | `ls design/source/humza-io-landing.html` |

---

## What This Phase Does NOT Do

- Implement the landing design (that is Phase 1).
- Touch the blog routes.
- Retire `deploy.sh`.
- Deploy to production.
