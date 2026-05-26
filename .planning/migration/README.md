# Migration Planning — humza.io

## Goal

Migrate humza.io from a no-build-step static site (plain HTML + `deploy.sh`) to a server-side-rendered React Router v7 app deployed on Cloudflare Workers, with a new pixel-perfect landing page, while keeping `/works` and `/resume` functional throughout.

---

## Canonical Decisions (summary)

| Concern | Decision |
|---|---|
| Framework | React Router v7 (framework mode, Remix successor) |
| Language | TypeScript |
| Bundler | Vite |
| SSR | Enabled (`ssr: true`) |
| Runtime | Cloudflare Workers via `wrangler` |
| Styling | Plain CSS — global stylesheet + CSS custom properties, NO Tailwind/CSS-in-JS |
| CSS theme mechanism | `[data-theme="light"\|"dark"]` on `<html>`, same variable names as source (`--bg`, `--ink`, `--accent`, `--hairline`, …) |
| Fonts | Google Fonts (Outfit, Inter, Geist Mono) via `<link>` preconnect in `<head>` |
| Blog format | Plain `.tsx` route modules under `app/routes/blog.*` — no MDX |
| Package manager | pnpm (run scripts via `pnpm run <script>`; `pnpm deploy` is a reserved builtin) |
| Account | CF account `9f7eb5d8779c6286d8203d49e5c8de44`, existing `CLOUDFLARE_API_TOKEN`, domain humza.io |
| Design source | `design/source/humza-io-landing.html` (copy of `/Users/humza/downloads/humza-io-landing.html`) |

---

## Phase Map

| Phase | Name | Description | Status |
|---|---|---|---|
| 0 | Scaffold | Init React Router v7 + CF Workers app in repo; wire static assets for /works and /resume | **In scope** |
| 1 | Landing page | Port the new landing design pixel-perfect into a React home route with full SSR | **In scope** |
| 2 | Works & Resume | Migrate works/resume static HTML into React routes using the shared design system | **Deferred — works/resume stay as static assets in `public/` for now** |
| 3 | Blog | Add `/blog` index + `/blog/:slug` plain `.tsx` article routes | **In scope** |
| 4 | Cutover & Deploy | Finalize `wrangler deploy`, redirects, retire `deploy.sh`, verify on humza.io | **In scope** |

**Current scope is Phases 0, 1, 3, and 4.** Phase 2 (works/resume migration) is explicitly deferred — `public/works/index.html` and `public/resume/index.html` remain as static assets throughout this pass. Do not begin Phase 2 until it is explicitly re-scoped.

---

## How to Use These Docs

1. Read **[00-architecture.md](./00-architecture.md)** first to understand the full target state.
2. Execute **[phases/phase-0-scaffold.md](./phases/phase-0-scaffold.md)** to bootstrap the app.
3. Use **[phases/phase-1-landing.md](./phases/phase-1-landing.md)** (written by a separate agent) as the step-by-step implementation spec for the landing page. The companion **[prompts/goal-implementation.md](./prompts/goal-implementation.md)** is a master implementation prompt covering Phases 0, 1, 3, and 4 (Phase 2 omitted) — paste it as a `/goal` prompt to execute the full build in one guided pass.
4. Phase 2 is explicitly deferred; its doc is in `phases/` for future reference. Phases 3 and 4 are in scope and covered by the master prompt.

---

## Document Index

| File | Purpose |
|---|---|
| [README.md](./README.md) | This file — index and orientation |
| [00-architecture.md](./00-architecture.md) | Full target architecture, directory layout, routing, SSR plan, deployment |
| [phases/phase-0-scaffold.md](./phases/phase-0-scaffold.md) | Step-by-step scaffold plan (in scope) |
| [phases/phase-1-landing.md](./phases/phase-1-landing.md) | Landing page implementation spec — **written by separate agent** |
| [phases/phase-2-works-resume.md](./phases/phase-2-works-resume.md) | Future: migrate works/resume into React |
| [phases/phase-3-blog.md](./phases/phase-3-blog.md) | Future: blog routes |
| [phases/phase-4-cutover-deploy.md](./phases/phase-4-cutover-deploy.md) | Future: production cutover |
| [prompts/goal-implementation.md](./prompts/goal-implementation.md) | Master `/goal` implementation prompt — covers Phases 0, 1, 3, 4 (Phase 2 omitted) |
