# Phase 4 — Cutover & Deploy

> **STATUS: FUTURE — out of current scope.**
> Do not begin this phase until Phases 0–3 are complete and the React app has been verified on a staging/preview URL.

---

## Goal

Make the React Router v7 app the live site at humza.io. Retire `deploy.sh` and the old static files at repo root. Confirm all routes, redirects, and domain bindings are correct on the Cloudflare Workers production deployment.

---

## Dependencies

- Phases 0, 1, and 3 complete (Phase 2 deferred — works/resume remain static).
- React app has been deployed to a non-production Cloudflare Workers URL (e.g. `humza-website.<account>.workers.dev`) and manually verified.

---

## Phase 2 deferral note

**Phase 2 is deferred.** `/works` and `/resume` are served as **static assets from `public/works/index.html` and `public/resume/index.html`**, not as React routes. This phase verifies them as static assets and does **not** remove those `public/` copies.

---

## Steps (outline)

1. **Final pre-cutover audit.** Run a pixel diff (desktop, tablet, mobile × light, dark) of the production Workers preview URL against the live humza.io static site. Confirm no regressions on `/`, `/works`, `/resume`, `/blog`.

2. **Domain binding.** In the Cloudflare dashboard (or via `wrangler.jsonc` `routes`/`custom_domains`), bind humza.io and www.humza.io to the `humza-website` Worker. Confirm the existing Pages project is either deleted or unbound from the domain first to avoid conflicts.

   ```jsonc
   // wrangler.jsonc addition
   "routes": [
     { "pattern": "humza.io/*", "zone_name": "humza.io" },
     { "pattern": "www.humza.io/*", "zone_name": "humza.io" }
   ]
   ```

3. **Deploy to production.**

   ```bash
   npm run deploy
   # equivalent to: npm run build && wrangler deploy
   ```

4. **Verify on humza.io.** Manually check `/`, `/works`, `/resume`, `/blog`, at least one `/blog/:slug`. Check `curl -I` headers for correct `Content-Type` and status codes. Check no `www` vs apex redirect issues.

5. **Set up any needed redirects.** If the old Cloudflare Pages project had any redirect rules, replicate them in `_routes.json` or via Cloudflare's redirect rules UI.

6. **Retire deploy.sh.** Remove or archive `deploy.sh` from the repo. Update `README.md` to document the new `npm run deploy` workflow.

7. **Clean up root-level static files.** The original `index.html`, `works/index.html`, and `resume/index.html` at **repo root** are no longer needed and can be removed or archived in `design/source/` for reference. **Do not remove `public/works/index.html` or `public/resume/index.html`** — those copies are the live static assets that serve `/works` and `/resume` (Phase 2 is deferred; they are not React routes).

8. **Set up CI (optional but recommended).** Add a GitHub Actions workflow that runs `npm run build` and `npm run typecheck` on pull requests, and `npm run deploy` on merge to `main`.

---

## Verification

| Check | Criterion |
|---|---|
| `humza.io/` loads | 200, React-rendered landing, correct title |
| `humza.io/works` loads | 200, works page (static asset from `public/`) |
| `humza.io/resume` loads | 200, resume page (static asset from `public/`) |
| `humza.io/blog` loads | 200, blog index |
| `humza.io/blog/:slug` loads | 200, article content |
| HTTPS enforced | `http://humza.io` redirects to `https://` |
| www redirects to apex | `www.humza.io` redirects to `humza.io` |
| No CF Pages conflict | Old Pages project is unbound or deleted |
| `deploy.sh` removed | Not present in repo root (or clearly archived) |
| `README.md` updated | Reflects new deploy workflow |
