# Architecture — humza.io React Migration

## Stack & Rationale

| Layer | Choice | Why |
|---|---|---|
| Framework | React Router v7 (framework mode) | Remix successor; first-class SSR + file-based routing + CF Workers adapter; no separate server abstraction needed |
| Language | TypeScript | Type safety in route modules, components, and loader data |
| Bundler | Vite | React Router v7's native bundler; fast HMR; Cloudflare Vite plugin integrates directly |
| SSR | `ssr: true` in `react-router.config.ts` | Enables server rendering per route; streaming-ready |
| Runtime | Cloudflare Workers | Edge-first; matches existing CF Pages account; `@react-router/cloudflare` adapter |
| Styling | Plain CSS | Pixel-perfect port of source CSS; no framework overhead; `[data-theme]` mechanism is trivially CSS-native |
| Package manager | pnpm | Adopted post-migration; `pnpm-workspace.yaml` `allowBuilds` enables esbuild/sharp/workerd build scripts. Run scripts via `pnpm run <script>` (`pnpm deploy` is a reserved builtin) |

---

## Project Directory Layout

```
humza-website/
├── app/
│   ├── root.tsx                  # App shell: <html>, <head>, fonts, blocking theme script, <Outlet>
│   ├── routes/
│   │   ├── home.tsx              # / — landing page route
│   │   └── blog/                 # Future: blog index + slug routes
│   ├── components/
│   │   ├── AsciiBackground.tsx   # Client-only canvas/div black-hole animation
│   │   ├── Clock.tsx             # Client-only live Montréal clock
│   │   └── ThemeToggle.tsx       # Animated SVG theme toggle button
│   └── styles/
│       ├── theme.css             # CSS custom properties + [data-theme] blocks — imported FIRST (no-FOUC)
│       └── landing.css           # Reset + all other landing styles
├── public/
│   ├── works/
│   │   └── index.html            # Byte-for-byte copy of works/index.html
│   └── resume/
│       └── index.html            # Byte-for-byte copy of resume/index.html
├── design/
│   └── source/
│       └── humza-io-landing.html # Reference copy of the design source file
├── react-router.config.ts
├── vite.config.ts
├── wrangler.jsonc                # Workers config (replaces wrangler Pages config)
├── tsconfig.json
├── package.json
└── .planning/                    # This directory
```

The existing `index.html`, `works/index.html`, and `resume/index.html` at the repo root are left untouched until Phase 4 cleanup; the React app is initialized alongside them.

---

## Routing Table

| URL | Served by | Mechanism |
|---|---|---|
| `/` | `app/routes/home.tsx` | React Router SSR route |
| `/works` | `public/works/index.html` | Cloudflare static asset serving |
| `/resume` | `public/resume/index.html` | Cloudflare static asset serving |
| `/blog` | Future — `app/routes/blog/index.tsx` | React Router SSR route |
| `/blog/:slug` | Future — `app/routes/blog/$slug.tsx` | React Router SSR route |

Cloudflare Workers + the React Router adapter serve static files from `public/` directly; no explicit redirect rules are needed for `/works` and `/resume` as long as `index.html` is present in the correct subdirectory.

---

## Design System Approach

### CSS Variables

The stylesheets (`app/styles/theme.css` and `app/styles/landing.css`) are ported verbatim from `design/source/humza-io-landing.html`. `theme.css` is imported before `landing.css` in `root.tsx` to ensure CSS custom properties are defined before layout styles paint. Variable names are preserved exactly:

```
--bg, --bg-hover, --ink, --ink-soft, --ink-muted, --ink-faint,
--label, --hairline, --whisper, --accent
```

Light values live on `:root, [data-theme="light"]`; dark values on `[data-theme="dark"]`. No renaming, no abstraction layer.

### Theme Mechanism

`data-theme` is set on `<html>`. Toggling is done in JS (ThemeToggle component) by mutating `document.documentElement.dataset.theme` and persisting to `localStorage`. The value is read back on next load by the blocking inline script (see SSR section below).

### Class Names

All class names from the source HTML (`.ascii-bg`, `.header`, `.nav-list`, `.hero`, `.project-card`, etc.) are carried over as-is. No BEM rename, no CSS modules — a single global stylesheet keeps the port auditable against the source file.

### Font Loading

In `root.tsx` `<head>`:
1. `<link rel="preconnect" href="https://fonts.googleapis.com" />`
2. `<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />`
3. `<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:opsz,wght@14..32,300..700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />`

These render server-side so the browser starts font fetch on first byte.

---

## Five SSR Considerations

### 1. Theme — No Flash of Unstyled Content (FOUC)

**Problem:** If theme is applied in a React effect, a light-mode flash occurs before hydration on dark-mode users.

**Solution:** Inject a small inline `<script>` in `root.tsx` `<head>` — before any stylesheets — that synchronously reads `localStorage.getItem('theme')` or `window.matchMedia('(prefers-color-scheme: dark)')` and sets `document.documentElement.dataset.theme`. This runs before paint, eliminating FOUC.

The script is inserted via React's `dangerouslySetInnerHTML` on a `<script>` tag. Because it is inline and synchronous, it blocks parsing just long enough to set the attribute — acceptable cost.

### 2. ASCII Black-Hole Background — Client Only

**Problem:** The animation uses `window`, `document`, `requestAnimationFrame`, and mouse events — none available on the server.

**Solution:** `AsciiBackground` renders an empty `<div className="ascii-bg" />` on initial render (which the server also renders, preserving hydration match). A `useEffect` — which only runs client-side — initializes the canvas/text animation. The component checks `window.matchMedia('(prefers-reduced-motion: reduce)')` inside the effect and skips animation setup if set.

### 3. Montréal Clock — Client Only

**Problem:** `new Date()` produces a server timestamp that will not match client time, causing a hydration mismatch.

**Solution:** `Clock` renders a placeholder (`"MTL --:--"`) on the server and on initial client render. A `useEffect` sets up a `setInterval` to update the displayed time every 30 seconds. This means the first paint shows the placeholder briefly, but there is no hydration mismatch and no error.

### 4. Fonts — Preconnect in `<head>`

Handled at the root layout level (see Font Loading above). React Router v7's `root.tsx` renders the full `<html>` document, so font `<link>` tags are straightforwardly placed before `<Links />` in `<head>`. This ensures the server response includes font hints on every page.

### 5. Meta / SEO — Route `meta` Export

Each route exports a `meta` function per the React Router v7 API:

```ts
export function meta() {
  return [
    { title: "Humza Khan — Product Engineer" },
    { name: "description", content: "Product Engineer based in Montréal, working at the intersection of AI and finance." },
  ];
}
```

The root layout also sets baseline meta (viewport, charset). Route-level `meta` merges with or overrides root meta via React Router's metadata cascade.

---

## Static Assets: works & resume

`public/works/index.html` and `public/resume/index.html` are byte-for-byte copies of the current `works/index.html` and `resume/index.html`. Cloudflare Workers serves files from the `public/` directory as static assets before the Worker script runs, so `/works` and `/resume` resolve to these files with no React routing involvement.

This means the existing pages continue working unchanged as static `public/` assets through the entire current build pass (Phases 0, 1, 3, and 4). Converting them to React routes is the deferred Phase 2 and is not done in this pass.

---

## Deployment

### wrangler.jsonc

```jsonc
{
  "name": "humza-website",
  "compatibility_date": "2025-01-01",
  "main": "build/server/index.js",   // output from React Router build
  "assets": {
    "directory": "./public"
  }
}
```

Account ID (`9f7eb5d8779c6286d8203d49e5c8de44`) and API token (`CLOUDFLARE_API_TOKEN`) are unchanged from the current setup. The `wrangler.jsonc` `name` field matches the existing Pages project name for continuity (though we move from Pages to Workers).

### npm Scripts

| Script | Command |
|---|---|
| `dev` | `react-router dev` (Vite dev server with SSR) |
| `build` | `react-router build` |
| `deploy` | `npm run build && wrangler deploy` |
| `typecheck` | `tsc --noEmit` |

### Migration from deploy.sh

`deploy.sh` (html-minifier-terser + `wrangler pages deploy`) is retired at Phase 4 cutover. Until then it remains in the repo but is not the active deploy path for the React app.

### Environment Variables

| Var | Source | Used by |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | `.env` / CI secret | `wrangler deploy` |
| `CLOUDFLARE_ACCOUNT_ID` | `9f7eb5d8779c6286d8203d49e5c8de44` (hardcoded in wrangler.jsonc or env) | `wrangler deploy` |

No application-level environment variables are needed in Phase 0 or 1.
