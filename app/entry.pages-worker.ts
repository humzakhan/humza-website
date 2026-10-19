/**
 * Cloudflare Pages Advanced Mode worker entry (_worker.js).
 *
 * This file is bundled by `scripts/build-pages-worker.mjs` into
 * `build/client/_worker.js` after `react-router build` runs.
 *
 * Pages Advanced Mode: when `_worker.js` exists at the root of the deployed
 * directory, Pages uses it as the sole request handler. `env.ASSETS` is
 * automatically bound by Pages and lets us fall through to static assets.
 *
 * Pattern: module Worker (`export default { async fetch(...) }`) — NOT the
 * Pages Functions middleware pattern (`EventContext`). We use `createRequestHandler`
 * from `react-router` directly (not `createPagesFunctionHandler` from
 * `@react-router/cloudflare`, which expects an EventContext).
 *
 * Load context shape follows the @react-router/cloudflare convention so that
 * loaders/actions can access `context.cloudflare.env`, `context.cloudflare.ctx`,
 * and `context.cloudflare.cf`.
 */

import { createRequestHandler, type ServerBuild } from "react-router";
import * as buildModule from "../build/server/index.js";

// The generated build's routeDiscovery.mode is typed as `string` rather than
// the literal union "lazy" | "initial", so a double-cast is required.
const build = buildModule as unknown as ServerBuild;

interface Env {
  ASSETS: Fetcher;
  [key: string]: unknown;
}

const handleSsrRequest = createRequestHandler(build, "production");

const SITE_URL = "https://humza.io";

/**
 * True when the client asks for Markdown at least as strongly as HTML.
 * Browsers and crawlers send text/html (or only a wildcard), so they keep HTML.
 */
function prefersMarkdown(request: Request): boolean {
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  const q: Record<string, number> = {};
  for (const part of (request.headers.get("Accept") ?? "").split(",")) {
    const [type, ...params] = part.trim().toLowerCase().split(";");
    if (!type) continue;
    const qParam = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    const value = qParam ? Number(qParam.slice(2)) : 1;
    q[type.trim()] = Number.isNaN(value) ? 0 : value;
  }
  const md = Math.max(q["text/markdown"] ?? 0, q["text/x-markdown"] ?? 0);
  return md > 0 && md >= (q["text/html"] ?? 0);
}

/** Map a page path to its generated Markdown asset, or null if it is already one. */
function mdPathFor(pathname: string): string | null {
  if (pathname === "/") return "/index.md";
  if (pathname.endsWith("/")) return `${pathname}index.md`;
  if (pathname.endsWith(".md")) return null;
  return `${pathname}.md`;
}

/** Canonical HTML path for a Markdown asset path (inverse of mdPathFor). */
function htmlPathFor(pathname: string): string {
  if (pathname === "/index.md") return "/";
  if (pathname.endsWith("/index.md")) return pathname.slice(0, -"index.md".length);
  const base = pathname.slice(0, -".md".length);
  // /blog.md and /blog/<slug>.md map to the trailing-slash blog pages.
  return base === "/blog" || base.startsWith("/blog/") ? `${base}/` : base;
}

function markdownResponse(asset: Response, htmlPath: string): Response {
  const headers = new Headers(asset.headers);
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Vary", "Accept");
  headers.set("Link", `<${SITE_URL}${htmlPath}>; rel="canonical"`);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return new Response(asset.body, { status: asset.status, headers });
}

/** HTML varies by Accept now, so shared caches must key on it. */
function withVaryAccept(response: Response): Response {
  if (!response.headers.get("Content-Type")?.includes("text/html")) return response;
  const headers = new Headers(response.headers);
  headers.append("Vary", "Accept");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      // 0. Markdown for agents: generated at build time by
      //    scripts/build-markdown.mjs, served here by Accept or a direct .md URL.
      const { pathname } = new URL(request.url);
      if (pathname.endsWith(".md")) {
        const direct = await env.ASSETS.fetch(request.url);
        if (direct.status === 200) {
          return markdownResponse(direct, htmlPathFor(pathname));
        }
      } else if (prefersMarkdown(request)) {
        const mdPath = mdPathFor(pathname);
        if (mdPath) {
          const md = await env.ASSETS.fetch(new URL(mdPath, request.url).toString());
          if (md.status === 200) return markdownResponse(md, htmlPathFor(mdPath));
        }
      }

      // 1. Try static assets first. ASSETS.fetch returns 404 for unknown paths.
      //    Pass the URL string to avoid Cloudflare-typed Request compat issues.
      const assetResponse = await env.ASSETS.fetch(request.url);
      if (assetResponse.status !== 404) {
        return withVaryAccept(assetResponse);
      }

      // 2. Fall through to SSR. Provide load context in the shape that
      //    @react-router/cloudflare loaders/actions expect.
      const loadContext = {
        cloudflare: {
          env,
          ctx: {
            waitUntil: ctx.waitUntil.bind(ctx),
            passThroughOnException: ctx.passThroughOnException.bind(ctx),
          },
          cf: (request as Request & { cf?: IncomingRequestCfProperties }).cf,
          caches,
        },
      };

      return withVaryAccept(await handleSsrRequest(request, loadContext));
    } catch (error) {
      console.error("Worker fetch error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
