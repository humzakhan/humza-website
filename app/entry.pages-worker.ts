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


export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      // 1. Try static assets first. ASSETS.fetch returns 404 for unknown paths.
      //    Pass the URL string to avoid Cloudflare-typed Request compat issues.
      const assetResponse = await env.ASSETS.fetch(request.url);
      if (assetResponse.status !== 404) {
        return assetResponse;
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

      return await handleSsrRequest(request, loadContext);
    } catch (error) {
      console.error("Worker fetch error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
