# Phase 2 — Works & Resume Migration

> **STATUS: FUTURE — out of current scope.**
> Do not begin this phase until Phase 0 and Phase 1 are complete and verified on production.

---

## Goal

Replace `public/works/index.html` and `public/resume/index.html` (static file serving) with proper React Router v7 routes that use the shared design system (`app/styles/theme.css` + `app/styles/landing.css`, `root.tsx` shell, CSS variables, theme toggle). After this phase, all three top-level pages are React-rendered and share a consistent visual design.

---

## Dependencies

- Phase 0 (scaffold) complete and merged.
- Phase 1 (landing page) complete, verified, and on production — including the finalized `root.tsx`, `app/styles/theme.css`, `app/styles/landing.css`, shared components (`ThemeToggle`, `AsciiBackground` if shared), and CSS variable system.

---

## Steps (outline)

1. **Audit the static pages.** Review `public/works/index.html` and `public/resume/index.html` for all markup, CSS, and JS. Identify what is site-chrome (header, nav, theme toggle, fonts) vs. page-specific content.

2. **Create route files.**
   - `app/routes/works.tsx` — `/works`
   - `app/routes/resume.tsx` — `/resume`

3. **Extract page-specific CSS.** Any styles unique to works or resume that are not in `app/styles/landing.css` should be added as separate `works.css` / `resume.css` files imported only in those route modules.

4. **Port markup into JSX.** Convert HTML to JSX (className, self-closing tags, etc.). Reuse shared components from `app/components/` where applicable (ThemeToggle, nav, footer).

5. **Export `meta` from each route** for correct `<title>` and description on each page.

6. **Remove the static files.** Once the React routes are confirmed working, delete `public/works/index.html` and `public/resume/index.html` so they no longer shadow the React routes.

7. **Test.** `/works` and `/resume` render correctly, theme toggle works, no regressions on `/`.

---

## Verification

| Check | Criterion |
|---|---|
| `/works` route renders | 200, React-rendered HTML, correct title |
| `/resume` route renders | 200, React-rendered HTML, correct title |
| Theme toggle works | Both pages respond to `[data-theme]` switch |
| `/` unaffected | Landing still pixel-perfect after CSS changes |
| No hydration errors | Browser console clean |
| Pixel diff (optional) | Screenshot `/works` and `/resume` against the old static HTML |
