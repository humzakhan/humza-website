# Goal Prompt — Master Implementation (Phases 0 · 1 · 3 · 4)

You are implementing the humza.io React migration in one guided pass. This prompt covers **Phase 0 (scaffold) → Phase 1 (landing) → Phase 3 (blog) → Phase 4 (cutover/deploy)**. **Phase 2 (works/resume migration) is explicitly omitted** — `works/index.html` and `resume/index.html` remain served as static assets from `public/` and are NOT converted to React routes in this pass.

Work phase by phase in order. Do not start the next phase until the current phase's Stop Condition is met.

Design source of truth for pixel-perfect work: `design/source/humza-io-landing.html`. Open it and keep it open.

---

## Phase 0 — Scaffold

### Objective

Bootstrap a React Router v7 + Cloudflare Workers application inside the existing `humza-website` repo without breaking the currently live static site. At the end of this phase:

- The React app builds and runs locally.
- `GET /` serves a React-rendered page (placeholder, not yet the final design).
- `GET /works` and `GET /resume` serve the existing static HTML files unchanged (from `public/`).
- `wrangler dev` starts without errors.

### Prerequisites

- Node.js >= 20.
- `npm` available.
- `wrangler` CLI v3+ (global or via npx).
- Working directory: repo root `/Users/humza/projects/humza-website` on branch `feat/ssr-react-migration`.

### Steps

**Step 0.1 — Copy design source into repo**

```bash
mkdir -p design/source
cp /Users/humza/downloads/humza-io-landing.html design/source/humza-io-landing.html
```

**Step 0.2 — Initialize the React Router v7 app**

Use the official Cloudflare template. Because the repo is not empty, scaffold into a temp directory and merge:

```bash
npx create-react-router@latest _scaffold --template cloudflare
# Copy app/, react-router.config.ts, vite.config.ts,
# tsconfig.json, wrangler.jsonc into repo root.
# Merge package.json scripts/deps — do not drop existing entries.
rm -rf _scaffold
```

Key files to bring over: `app/root.tsx`, `app/routes/home.tsx` (placeholder), `app/routes.ts`, `react-router.config.ts`, `vite.config.ts`, `wrangler.jsonc`, `tsconfig.json`, `package.json` (merged).

Essential new dependencies:

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

**Step 0.3 — Configure `wrangler.jsonc`**

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

**Step 0.4 — Copy static HTML assets into `public/`**

```bash
mkdir -p public/works public/resume
cp works/index.html public/works/index.html
cp resume/index.html public/resume/index.html
```

These are served by Cloudflare as static assets before the Worker runs. No routing rule needed.

**Step 0.5 — npm scripts**

Ensure `package.json` contains:

```json
"scripts": {
  "dev": "react-router dev",
  "build": "react-router build",
  "deploy": "npm run build && wrangler deploy",
  "typecheck": "tsc --noEmit"
}
```

**Step 0.6 — Install and verify**

```bash
npm install
npm run build     # must exit 0; build/ created with build/server/index.js
npm run dev       # GET / → placeholder; GET /works and GET /resume → static HTML
```

### Phase 0 Stop Condition

1. `npm run build` exits 0.
2. `/`, `/works`, `/resume` all respond at `localhost:5173` in `npm run dev`.
3. `design/source/humza-io-landing.html` exists in the repo.
4. No existing file at repo root (`index.html`, `works/index.html`, `resume/index.html`, `deploy.sh`) has been modified.

---

## Phase 1 — Landing Page (Pixel-Perfect React Port)

### Objective

Port `design/source/humza-io-landing.html` into a React Router v7 SSR home route at `/`, pixel-perfect at all six viewport/theme combinations. No new design decisions. The one allowed change: rewire internal hrefs to real app routes (§1.6).

**Depends on:** Phase 0 Stop Condition met.

### 1.1 Preconditions

Before writing a single line of code, confirm all of the following. Stop and resolve any failures first.

- Phase 0 complete: `npm run dev` starts, `/works` and `/resume` return static HTML, `wrangler dev` starts without errors.
- `design/source/humza-io-landing.html` is in the repo — this is your ground truth, keep it open.
- Branch is `feat/ssr-react-migration`.
- `npx tsc --noEmit` exits 0.

### 1.2 Exact File Targets

Create or modify exactly these files. Do not create any other files.

| File | Action | Purpose |
|---|---|---|
| `app/root.tsx` | Modify | App shell: `<html>`, `<head>`, no-FOUC blocking script, font preconnects, CSS imports, `<Outlet>` |
| `app/routes/home.tsx` | Create | Home route (`/`): assembles all landing sections, exports `meta` |
| `app/routes.ts` | Modify | Register `home.tsx` as the `/` index route |
| `app/components/Nav.tsx` | Create | `.nav` — name, links, `Clock`, `ThemeToggle` |
| `app/components/ThemeToggle.tsx` | Create | `.theme-toggle` button with the full animated SVG |
| `app/components/Clock.tsx` | Create | `.nav-clock` — SSR placeholder `"MTL --:--"`, real time in `useEffect` |
| `app/components/Hero.tsx` | Create | `.hero` — eyebrow, `h1`, `hero-text` |
| `app/components/ScrollCue.tsx` | Create | `.scroll-cue` — static line + "SCROLL" label |
| `app/components/BuildingSection.tsx` | Create | `#building` section — two `.building-card` items (WordStack, Sendic) |
| `app/components/WorksSection.tsx` | Create | `#works` section — four `.works-row` items + "browse all →" link |
| `app/components/Contact.tsx` | Create | `.contact` — email anchor + social links |
| `app/components/Footer.tsx` | Create | `.footer` — static text |
| `app/components/AsciiBackground.tsx` | Create | `.ascii-bg` — client-only ASCII black-hole animation |
| `app/styles/theme.css` | Create | CSS custom properties: `:root`, `[data-theme="light"]`, `[data-theme="dark"]` blocks only |
| `app/styles/landing.css` | Create | All remaining CSS from the source `<style>` block |

**Route file note:** The home route is `app/routes/home.tsx`, registered in `app/routes.ts` as the index route:

```ts
// app/routes.ts
import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
] satisfies RouteConfig;
```

### 1.3 CSS — `app/styles/theme.css` and `app/styles/landing.css`

Open the `<style>` block in `design/source/humza-io-landing.html`. Copy it verbatim, split into two files:

**`app/styles/theme.css`** — contains only:
- `:root, [data-theme="light"] { … }` — light mode custom properties
- `[data-theme="dark"] { … }` — dark mode custom properties
- `*, *::before, *::after { transition: … }` — the global transition rule

**`app/styles/landing.css`** — contains everything else:
- Reset, `html, body`, `.ascii-bg`, `[data-theme="dark"] .ascii-bg`
- `.content`, `.nav`, `.nav-name`, `.nav-links`, `.nav-clock`, `.dot-blink`, `@keyframes blink`
- `.theme-toggle`, all `.tog-*` classes, `@keyframes planet-orbit`, `@keyframes sun-breathe`
- `.hero`, `.eyebrow`, `.hero-heading`, `.hero-heading em`, `.hero-text`, `.hero-text strong`
- `.scroll-cue`, `.scroll-line`
- `.section`, `.section-label`, `.section-label-right`
- `.building-grid`, `.building-card`, `.building-name`, `.building-desc`, `.building-meta`, `.building-arrow`
- `.works-row`, `.works-title`, `.works-desc`, `.works-metric`, `.works-meta`
- `.contact`, `.contact-email`, `.contact-links`
- `.footer`
- `@media (max-width: 640px) { … }`
- `@media (prefers-reduced-motion: reduce) { … }`

Rules: Keep every class name and CSS variable name unchanged. No renaming. No CSS Modules. No Tailwind. Do not alter specificity. `[data-theme="dark"] .ascii-bg` stays in `landing.css`.

Import order in `root.tsx` (theme.css first for no-FOUC):
```ts
import "~/styles/theme.css";
import "~/styles/landing.css";
```

### 1.4 `app/root.tsx`

```tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "~/styles/theme.css";
import "~/styles/landing.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* No-FOUC blocking script — must be first, before stylesheets */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var s=localStorage.getItem('theme');
  var p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  document.documentElement.setAttribute('data-theme', s||p);
})();`,
          }}
        />
        {/* Font preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:opsz,wght@14..32,300..700&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
```

Critical: `data-theme="light"` on `<html>` is the SSR default — overridden before paint by the no-FOUC script. Do not derive theme in `useState`. Do not duplicate `<title>` or `<meta name="description">` here; they come from route `meta` exports.

### 1.5 Components

Work component by component in this order. After each, verify no TypeScript errors before moving on.

**`app/routes/home.tsx`**

```tsx
import type { MetaFunction } from "react-router";
import { AsciiBackground } from "~/components/AsciiBackground";
import { Nav } from "~/components/Nav";
import { Hero } from "~/components/Hero";
import { ScrollCue } from "~/components/ScrollCue";
import { BuildingSection } from "~/components/BuildingSection";
import { WorksSection } from "~/components/WorksSection";
import { Contact } from "~/components/Contact";
import { Footer } from "~/components/Footer";

export const meta: MetaFunction = () => [
  { title: "Humza Khan — Product Engineer" },
  {
    name: "description",
    content:
      "Product Engineer based in Montréal, working at the intersection of AI and finance.",
  },
];

export default function Home() {
  return (
    <>
      <AsciiBackground />
      <div className="content">
        <Nav />
        <Hero />
        <ScrollCue />
        <BuildingSection />
        <WorksSection />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
```

**`app/components/Nav.tsx`** — apply href rewires from §1.6:

```tsx
import { Clock } from "./Clock";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <nav className="nav">
      <span className="nav-name">humza khan</span>
      <div className="nav-links">
        <a href="/works">works</a>
        <a href="/resume">résumé</a>
        <a href="mailto:hello@humza.io">hello</a>
        <Clock />
        <ThemeToggle />
      </div>
    </nav>
  );
}
```

**`app/components/Clock.tsx`** — SSR-safe Montréal clock:

```tsx
import { useState, useEffect } from "react";

export function Clock() {
  const [display, setDisplay] = useState("MTL --:--");

  useEffect(() => {
    function tick() {
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "America/Montreal",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setDisplay("MTL " + new Intl.DateTimeFormat("en-CA", opts).format(new Date()));
    }
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="nav-clock">
      <span className="dot-blink" />
      <span id="clock">{display}</span>
    </span>
  );
}
```

Do not call `new Date()` during render or in `useState` initializer — server/client mismatch.

**`app/components/ThemeToggle.tsx`** — reads/writes `data-theme` on `<html>` via DOM, no React state:

```tsx
function handleClick() {
  const root = document.documentElement;
  const current = root.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}
```

Copy the full `<svg viewBox="0 0 22 22">` verbatim from source (all `.tog-*` elements). HTML `class` → React `className`.

**`app/components/Hero.tsx`** — copy source text verbatim:

```tsx
export function Hero() {
  return (
    <section className="hero">
      <p className="eyebrow">— PRODUCT ENGINEER · MONTRÉAL</p>
      <h1 className="hero-heading">AI &amp; finance, <em>shipped.</em></h1>
      <p className="hero-text">
        Working at the intersection of <strong>AI and finance</strong>. Spend most
        days using AI to ship production systems faster, automate legacy
        infrastructure, and translate business problems into working software.
      </p>
    </section>
  );
}
```

**`app/components/ScrollCue.tsx`:**

```tsx
export function ScrollCue() {
  return (
    <div className="scroll-cue">
      <span className="scroll-line" />
      <span>SCROLL</span>
    </div>
  );
}
```

**`app/components/BuildingSection.tsx`** — two building cards; hrefs remain `#` (real URLs unknown):

```tsx
export function BuildingSection() {
  return (
    <section className="section" id="building">
      <div className="section-label">
        <span>— CURRENTLY BUILDING</span>
        <span className="section-label-right">02 ACTIVE</span>
      </div>
      <div className="building-grid">
        <a className="building-card" href="#">
          <h3 className="building-name">WordStack</h3>
          <p className="building-desc">[ one-line description of WordStack — what it is and who it's for ]</p>
          <div className="building-meta">
            <span>[ stack ]</span>
            <span className="building-arrow">→</span>
          </div>
        </a>
        <a className="building-card" href="#">
          <h3 className="building-name">Sendic</h3>
          <p className="building-desc">[ one-line description of Sendic — what it is and who it's for ]</p>
          <div className="building-meta">
            <span>[ stack ]</span>
            <span className="building-arrow">→</span>
          </div>
        </a>
      </div>
    </section>
  );
}
```

**`app/components/WorksSection.tsx`** — "browse all →" rewired to `/works`; row hrefs remain `#`:

```tsx
export function WorksSection() {
  return (
    <section className="section" id="works">
      <div className="section-label">
        <span>— WORKS</span>
        <a className="section-label-right" href="/works">browse all →</a>
      </div>
      <div>
        <a className="works-row" href="#">
          <div>
            <h3 className="works-title">TCA — Transaction Cost Analytics</h3>
            <p className="works-desc">Real-time trade analytics for NYSE, NASDAQ, TSX.</p>
            <p className="works-metric">400M messages/day · delivery time cut 60%</p>
          </div>
          <div className="works-meta">Revelate<br />2019–2022</div>
        </a>
        <a className="works-row" href="#">
          <div>
            <h3 className="works-title">Lookout Ingestion Service</h3>
            <p className="works-desc">Redesigned ingestion across 12M mobile devices.</p>
            <p className="works-metric">$60K saved annually · 30% infra cost reduction</p>
          </div>
          <div className="works-meta">Lookout<br />2022–2024</div>
        </a>
        <a className="works-row" href="#">
          <div>
            <h3 className="works-title">Derivatives Data Monetisation</h3>
            <p className="works-desc">Web distribution platform for derivatives data.</p>
            <p className="works-metric">55% API latency reduction · ARR contribution</p>
          </div>
          <div className="works-meta">CME Group<br />2022</div>
        </a>
        <a className="works-row" href="#">
          <div>
            <h3 className="works-title">RepoMap</h3>
            <p className="works-desc">CLI that maps any codebase into an interactive architecture diagram.</p>
            <p className="works-metric">Open source · MIT</p>
          </div>
          <div className="works-meta">Personal<br />2024</div>
        </a>
      </div>
    </section>
  );
}
```

**`app/components/Contact.tsx`** — "résumé" rewired to `/resume`:

```tsx
export function Contact() {
  return (
    <section className="contact">
      <div className="section-label">
        <span>— CONTACT</span>
      </div>
      <a className="contact-email" href="mailto:hello@humza.io">hello@humza.io</a>
      <p className="contact-links">
        <a href="#">github</a> · <a href="#">linkedin</a> · <a href="#">twitter</a> · <a href="/resume">résumé</a>
      </p>
    </section>
  );
}
```

**`app/components/Footer.tsx`:**

```tsx
export function Footer() {
  return (
    <footer className="footer">
      <span>humza.io — 2026</span>
      <span>{"</>"} with ♥ and ☕</span>
    </footer>
  );
}
```

**`app/components/AsciiBackground.tsx`** — server renders empty div; all animation logic in `useEffect`:

```tsx
import { useEffect } from "react";

export function AsciiBackground() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bg = document.getElementById("ascii-bg");
    if (!bg) return;

    // PORT THE IIFE VERBATIM from design/source/humza-io-landing.html
    // Copy lines 704–952 (from `const charW = 7.4;` to `render();`) into this body.
    // Replace the leading `const bg = document.getElementById('ascii-bg'); if (!bg) return;`
    // with the declarations above. Add `let running = true;` and return `() => { running = false; }`.
    //
    // Key constants (do not rename or change values):
    // charW=7.4, charH=15.4, BH_X=0.75, BH_Y=0.35, EH_RX=0.055, EH_RY=0.032,
    // EH_TILT=-0.18, LENS_INNER=1.0, LENS_OUTER=5.5, GRAVITY_FADE=9.0, GW_INTERVAL=280
    //
    // isDark() reads document.documentElement.getAttribute('data-theme') — no prop needed.
    // bg.textContent = out in the render loop: React does not manage this div's textContent,
    // so there is no hydration mismatch.

    let running = true;
    // [paste full IIFE body from source here]
    return () => { running = false; };
  }, []);

  return <div className="ascii-bg" id="ascii-bg" aria-hidden="true" />;
}
```

You MUST copy the full IIFE body from the source file, adapted minimally for TypeScript. Do not summarize or re-implement.

### 1.6 Href Rewire Table

The only intentional content changes from the source:

| Location | Source `href` | React `href` | Component |
|---|---|---|---|
| Nav — "works" link | `#works` | `/works` | `Nav.tsx` |
| Nav — "résumé" link | `#resume` | `/resume` | `Nav.tsx` |
| Works section — "browse all →" | `#` | `/works` | `WorksSection.tsx` |
| Contact — "résumé" link | `#` | `/resume` | `Contact.tsx` |
| Nav — "hello" link | `mailto:hello@humza.io` | `mailto:hello@humza.io` | `Nav.tsx` (unchanged) |
| Contact email | `mailto:hello@humza.io` | `mailto:hello@humza.io` | `Contact.tsx` (unchanged) |
| Contact — github/linkedin/twitter | `#` | `#` | `Contact.tsx` (real URLs unknown) |
| Building cards (WordStack, Sendic) | `#` | `#` | `BuildingSection.tsx` (real URLs unknown) |
| Works rows (all 4) | `#` | `#` | `WorksSection.tsx` (real URLs unknown) |

### 1.7 Five SSR Must-Handles

**Must-Handle 1 — Theme No-FOUC**

Place the blocking inline `<script>` as the **first child of `<head>`** in `root.tsx`, before any stylesheet links. No `async`, no `defer`.

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `(function(){
  var s=localStorage.getItem('theme');
  var p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  document.documentElement.setAttribute('data-theme', s||p);
})();`,
  }}
/>
```

Pitfall: Do not derive theme in `useState` — runs after hydration, causes mismatch. DOM attribute is single source of truth.

**Must-Handle 2 — ASCII Black-Hole (Client-Only)**

Server renders empty `<div className="ascii-bg" id="ascii-bg" aria-hidden="true" />`. All animation in `useEffect` (never called during SSR). Port IIFE verbatim. Guard with `prefers-reduced-motion` check at top of effect. `isDark()` reads `document.documentElement.getAttribute('data-theme')` directly. `bg.textContent = out` causes no hydration mismatch — React does not own this div's content.

**Must-Handle 3 — Montréal Clock (Client-Only)**

Server renders `"MTL --:--"` (safe, no mismatch). `useEffect` fires after hydration, calls `tick()` immediately, repeats every 30 s. Do not call `new Date()` during render or in `useState` initializer.

**Must-Handle 4 — Fonts via `<head>` Preconnect**

Font `<link>` tags go in `root.tsx` `<head>` after the no-FOUC script, before `<Meta />` and `<Links />`. React requires `crossOrigin` (camelCase), not `crossorigin`.

**Must-Handle 5 — Meta / SEO via Route `meta` Export**

Export `meta` from `app/routes/home.tsx` (shown in §1.5). `root.tsx` must not duplicate `<title>` or `<meta name="description">`.

### 1.8 Acceptance Criteria (Pixel-Perfect Checklist)

**Typography**
- [ ] Outfit: hero heading (`clamp(44px, 6.5vw, 60px)`, weight 600, `letter-spacing: -0.025em`), building names (28px), works titles (24px), contact email (`clamp(38px, 5vw, 52px)`)
- [ ] Inter: body (17px, line-height 1.65), works desc (15px), building desc (14px)
- [ ] Geist Mono: nav (12px), eyebrow (12px), section labels (12px), scroll cue (11px, `letter-spacing: 0.15em`), works metric (11px), building meta (11px), footer (12px)
- [ ] Hero `<em>`: italic, weight 500, `var(--accent)`
- [ ] `<strong>` in hero-text: weight 600, `var(--ink)`

**Color — Light Theme**
- [ ] `--bg: #faf8f3`, `--ink: #1a1612`, `--ink-soft: #3a3228`, `--ink-muted: #5a4e3e`, `--ink-faint: #6b6052`, `--label: #8a7f6f`, `--hairline: #e8e2d6`, `--whisper: #b0a590`, `--accent: #5a4e3e`

**Color — Dark Theme**
- [ ] `--bg: #0e1320`, `--ink: #f0f4fc`, `--ink-soft: #d0d8ec`, `--ink-muted: #b0bcd4`, `--ink-faint: #8fa0bc`, `--label: #8a9ab8`, `--hairline: #1e2a3e`, `--whisper: #6a7a96`, `--accent: #a0c0e0`
- [ ] Dark `.ascii-bg`: `opacity: 1`, `color: transparent`, `text-shadow` with `rgba(138,170,208,…)`, `-webkit-text-stroke: 0.5px rgba(138,170,208,0.13)`
- [ ] Global `transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, fill 0.5s ease, stroke 0.5s ease` on all elements

**Spacing & Layout**
- [ ] `.content`: `max-width: 880px`, `margin: 0 auto`, `padding: 0 2rem`
- [ ] `.hero`: `padding: 7rem 0 5rem`, `max-width: 640px`
- [ ] `.section`: `padding: 3.5rem 0`, `border-top: 0.5px solid var(--hairline)`
- [ ] `.contact`: `padding: 5rem 0 3rem`
- [ ] `.building-grid`: `grid-template-columns: 1fr 1fr`, `gap: 1px`, `background: var(--hairline)`
- [ ] `.works-row`: `padding-left` nudges to `0.5rem` on hover

**640px Breakpoint**
- [ ] `.content` padding → `0 1.25rem`
- [ ] `.nav-links` gap `1rem`, font-size `11px`
- [ ] `.nav-clock` `display: none`
- [ ] `.hero` padding `4rem 0 3rem`
- [ ] `.building-grid` → `grid-template-columns: 1fr`
- [ ] `.works-row` → `grid-template-columns: 1fr`
- [ ] `.works-meta` `text-align: left`, `padding-top: 0.25rem`
- [ ] `.ascii-bg` `font-size: 9px`, `opacity: 0.05`

**Theme Toggle SVG**
- [ ] Light mode: orbit system visible — star body, 4 rays, dashed ellipse orbit ring, planet dot animating `planet-orbit 3s linear infinite`
- [ ] Dark mode: sun — larger circle + 8 rays animating `sun-breathe 4s ease-in-out infinite`; orbit system hidden (`opacity: 0`, `scale(0.3)`)
- [ ] Hover `scale(1.15)`, active `scale(0.92)`, transition animated (`opacity 0.4s`, `transform 0.5s cubic-bezier(0.4,0,0.2,1)`)
- [ ] Clicking persists to `localStorage`; no-FOUC applies before next paint

**ASCII Background**
- [ ] Fixed full-viewport overlay, `pointer-events: none`, `z-index: 0`
- [ ] Black-hole ellipse ~75% x, ~35% y of viewport
- [ ] Lensing chars, photon ring, gravitational wave pulses, cursor ripples animate
- [ ] Light: `opacity: 0.06`, ink-colored chars; Dark: `opacity: 1`, transparent text with blue glow
- [ ] `prefers-reduced-motion`: CSS hides `.ascii-bg`; JS loop exits early

**Clock**
- [ ] `"MTL --:--"` in SSR HTML
- [ ] Real Montreal time (HH:MM, 24h) within 1 s of page load
- [ ] Updates every 30 s; blinking dot `blink 1.6s ease-in-out infinite`
- [ ] Hidden at ≤640px

**Content Fidelity**
- [ ] All source text reproduced verbatim (including `[ placeholder ]` copy)
- [ ] Internal hrefs rewired per §1.6
- [ ] `mailto:`, social, building/works hrefs unchanged from source

### 1.9 Verification Procedure

```bash
npx tsc --noEmit                     # must exit 0
npm run build                        # must exit 0

# Terminal 1
npm run dev                          # React app on localhost:5173

# Terminal 2 — original source for visual comparison
python3 -m http.server 8888 --directory /Users/humza/downloads
# open: http://localhost:8888/humza-io-landing.html
```

SSR smoke tests:
```bash
curl -s http://localhost:5173/ | grep -o 'localStorage.getItem.*data-theme'
curl -s http://localhost:5173/ | grep 'data-theme="light"'
curl -s http://localhost:5173/ | grep 'MTL --:--'
```

Screenshot comparison at 6 viewport/theme combinations (1280×900, 768×1024, 390×844 × light/dark). Accept ≤ 1% pixel difference.

### Phase 1 Stop Condition

1. All acceptance criteria in §1.8 pass.
2. Screenshot diff ≤ 1% at all 6 combinations.
3. SSR smoke tests pass (no-FOUC script present, `data-theme="light"` in raw response, `"MTL --:--"` in raw response).
4. `npx tsc --noEmit` exits 0.
5. `wrangler deploy --dry-run` exits 0.

---

## Phase 2 — DEFERRED (Explicit Omission)

> **Works and resume pages are NOT migrated to React routes in this pass.**

`public/works/index.html` and `public/resume/index.html` remain as static assets served by Cloudflare Workers. The nav links `/works` and `/resume` point to these static files. Do not delete, move, or convert these files.

When Phase 2 is eventually executed (after Phases 0, 1, 3, and 4 are complete and stable), it will replace these static files with proper React routes (`app/routes/works.tsx`, `app/routes/resume.tsx`) using the shared design system.

---

## Phase 3 — Blog

### Objective

Add `/blog` index and `/blog/:slug` article routes as plain `.tsx` route modules. No MDX. Design inherits from `root.tsx` shell and the shared stylesheets (`app/styles/theme.css` + `app/styles/landing.css`).

**Depends on:** Phase 1 Stop Condition met.

### Steps

**Step 3.1 — Design the article data shape**

Define a TypeScript interface for article metadata. Articles are self-contained in their route file; no external CMS or data layer.

```ts
// app/routes/blog/articles.ts (or inline in index)
export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;        // ISO 8601 date string, e.g. "2026-05-01"
  description: string;
  tags?: string[];
}
```

**Step 3.2 — Blog index route**

Create `app/routes/blog/index.tsx` (or `app/routes/blog.tsx` — whichever React Router v7 picks up as the `/blog` index).

- Export `meta` with title `"Writing — Humza Khan"`.
- Render a list of articles; article metadata imported statically from each article module or from a hand-maintained `app/routes/blog/articles.ts` manifest.

**Step 3.3 — ArticleLayout component**

Create `app/components/ArticleLayout.tsx`.

- Handles consistent typography, date display, back-link to `/blog`, and `<article>` semantics.
- Accepts article metadata as props.

**Step 3.4 — First article**

Create the first article as a named route file, e.g. `app/routes/blog.my-first-post.tsx` (or under `app/routes/blog/$slug.tsx` if using a catch-all).

- Export `meta` using the article's title and description.
- Use `<ArticleLayout>` for chrome; body is plain JSX (headings, paragraphs, `<pre><code>` for code blocks).

**Step 3.5 — Register routes**

React Router v7 file-based routing picks up these files automatically. Confirm routes appear in `npm run dev`. Add to `app/routes.ts` if needed.

**Step 3.6 — Blog CSS**

Add blog/article-specific CSS (prose max-width, line-height, heading hierarchy, code block styling with Geist Mono) to a new `app/styles/blog.css`, imported in the blog routes (or in `root.tsx` if global). Do not add blog styles to `landing.css` — keep concerns separate.

**Step 3.7 — Update nav**

Add a "Writing" link in the nav (in `Nav.tsx` or a shared component) pointing to `/blog`. This link appears on all pages via the shared nav component.

### Phase 3 Verification

| Check | Criterion |
|---|---|
| `/blog` renders index | 200, lists at least one article |
| `/blog/:slug` renders article | 200, correct title meta, article content visible |
| Back-link works | Returns to `/blog` |
| Theme toggle works | Blog pages respond to `[data-theme]` switch |
| "Writing" nav link present | Appears in header on all pages |
| No hydration errors | Browser console clean |

### Phase 3 Stop Condition

1. `/blog` returns 200 with at least one article listed.
2. `/blog/:slug` returns 200 for the first article with correct `<title>`.
3. Theme toggle works on blog pages.
4. "Writing" nav link appears on all pages.
5. `npx tsc --noEmit` exits 0.

---

## Phase 4 — Cutover & Deploy

### Objective

Make the React Router v7 app the live site at humza.io. Retire `deploy.sh`. Verify all routes. Note: **works and resume are still served as static assets from `public/`** (Phase 2 deferred) — do NOT delete `public/works/index.html` or `public/resume/index.html`.

**Depends on:** Phases 0, 1, and 3 Stop Conditions met. React app verified on a preview URL.

### Steps

**Step 4.1 — Pre-cutover audit on preview URL**

Deploy to the `workers.dev` preview URL:

```bash
npm run deploy
```

Manually verify on `humza-website.<account>.workers.dev`:
- `/` — React-rendered landing, pixel-perfect
- `/works` — static works page from `public/works/index.html`
- `/resume` — static resume page from `public/resume/index.html`
- `/blog` — blog index
- `/blog/:slug` — article

Run a pixel diff (desktop, tablet, mobile × light, dark) against the current live humza.io static site. Confirm no regressions.

**Step 4.2 — Domain binding**

In Cloudflare dashboard or via `wrangler.jsonc`, bind humza.io and www.humza.io to the `humza-website` Worker. Unbound or delete the existing Pages project first to avoid conflicts.

```jsonc
// wrangler.jsonc addition
"routes": [
  { "pattern": "humza.io/*", "zone_name": "humza.io" },
  { "pattern": "www.humza.io/*", "zone_name": "humza.io" }
]
```

**Step 4.3 — Production deploy**

```bash
npm run deploy
# equivalent: npm run build && wrangler deploy
```

**Step 4.4 — Verify on humza.io**

| URL | Expected |
|---|---|
| `humza.io/` | 200, React-rendered landing, correct title |
| `humza.io/works` | 200, static works page (from `public/works/index.html`) |
| `humza.io/resume` | 200, static resume page (from `public/resume/index.html`) |
| `humza.io/blog` | 200, blog index |
| `humza.io/blog/:slug` | 200, article content |

Check `curl -I` headers for correct `Content-Type` and status codes. Confirm no `www` vs apex redirect issues. Confirm HTTPS enforced.

**Step 4.5 — Redirects**

If the old Cloudflare Pages project had redirect rules, replicate them in `_routes.json` or via Cloudflare's redirect rules UI.

**Step 4.6 — Retire `deploy.sh`**

Remove or archive `deploy.sh` from the repo. Update `README.md` to document `npm run deploy` as the active deploy workflow.

**Step 4.7 — Do NOT delete static files**

`public/works/index.html` and `public/resume/index.html` remain in place — they are how `/works` and `/resume` are served. The original root-level `index.html`, `works/index.html`, and `resume/index.html` (outside `public/`) are no longer needed and may be archived, but this is optional.

**Step 4.8 — CI (optional)**

Add a GitHub Actions workflow: `npm run build` + `npm run typecheck` on pull requests; `npm run deploy` on merge to `main`.

### Phase 4 Verification

| Check | Criterion |
|---|---|
| `humza.io/` loads | 200, React-rendered landing, correct title |
| `humza.io/works` loads | 200, static works page (served from `public/`) |
| `humza.io/resume` loads | 200, static resume page (served from `public/`) |
| `humza.io/blog` loads | 200, blog index |
| `humza.io/blog/:slug` loads | 200, article content |
| HTTPS enforced | `http://humza.io` → `https://` |
| www redirects to apex | `www.humza.io` → `humza.io` |
| No CF Pages conflict | Old Pages project unbound or deleted |
| `deploy.sh` removed | Not present in repo root (or clearly archived) |
| `public/works/index.html` present | Static asset intact, `/works` resolves correctly |
| `public/resume/index.html` present | Static asset intact, `/resume` resolves correctly |

### Phase 4 Stop Condition

1. All URLs in the verification table return correct status codes and content.
2. HTTPS and www redirect verified.
3. `deploy.sh` retired.
4. `public/works/index.html` and `public/resume/index.html` remain in place and are reachable.

---

## Consolidated Stop Condition (All Phases)

The full implementation pass is complete when ALL of the following are true:

1. **Phase 0:** `npm run build` exits 0; `/`, `/works`, `/resume` respond locally; design source in repo; no existing root files modified.
2. **Phase 1:** All acceptance criteria pass; screenshot diff ≤ 1% at 6 viewports/themes; SSR smoke tests pass; TypeScript clean; `wrangler deploy --dry-run` exits 0.
3. **Phase 2:** Explicitly deferred. `public/works/index.html` and `public/resume/index.html` present and serving correctly.
4. **Phase 3:** `/blog` and `/blog/:slug` return 200 with correct content; theme toggle works; "Writing" nav link present; TypeScript clean.
5. **Phase 4:** All production URLs verified; HTTPS and www redirects working; `deploy.sh` retired; static assets for works/resume intact.
