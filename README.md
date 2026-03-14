# humza-website

Personal website deployed to Cloudflare Pages.

## Structure

```
index.html          → /
works/index.html    → /works
resume/index.html   → /resume
```

Directory-based routing for clean URLs — no framework, no build step.

## Deploy

```bash
CLOUDFLARE_API_TOKEN=<token> ./deploy.sh
```

Minifies all HTML files and deploys to Cloudflare Pages.

## Requirements

- [wrangler](https://developers.cloudflare.com/workers/wrangler/) — Cloudflare CLI
- [html-minifier-terser](https://github.com/terser/html-minifier-terser) — HTML minification
