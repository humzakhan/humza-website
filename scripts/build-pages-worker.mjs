/**
 * Post-build step: bundle app/entry.pages-worker.ts into build/client/_worker.js.
 *
 * Run AFTER `react-router build` so that build/server/index.js exists.
 * Uses Vite in library mode so all dependencies (react-router, isbot, etc.)
 * are bundled into a single self-contained ESM file suitable for Cloudflare
 * Pages Advanced Mode (_worker.js).
 */

import { build } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { rename, unlink, access } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

await build({
  root,
  configFile: false,
  logLevel: "info",
  build: {
    // Output goes directly into build/client/ so wrangler pages deploy
    // picks it up as the _worker.js alongside the static assets.
    outDir: resolve(root, "build/client"),
    emptyOutDir: false, // keep the static assets already in build/client/
    copyPublicDir: false,
    ssr: true,
    lib: {
      entry: resolve(root, "app/entry.pages-worker.ts"),
      formats: ["es"],
      // fileName overridden via rollupOptions below for reliability in Vite 6.
    },
    rollupOptions: {
      // Bundle everything — Pages Advanced Mode has no npm runtime.
      external: [],
      output: {
        // Single flat file, no chunks, explicit output name.
        inlineDynamicImports: true,
        entryFileNames: "_worker.js",
        chunkFileNames: "_worker-[hash].js",
      },
    },
    minify: false,
  },
  resolve: {
    alias: {
      "~": resolve(root, "app"),
    },
  },
  // Suppress the Vite Node.js externalization warning for server-side build.
  ssr: {
    noExternal: true,
  },
});

// Belt-and-suspenders: if Vite still wrote entry.pages-worker.js (Vite 6
// lib mode can ignore entryFileNames when name collides), rename it.
const staleFile = resolve(root, "build/client/entry.pages-worker.js");
const targetFile = resolve(root, "build/client/_worker.js");
try {
  await access(staleFile);
  // staleFile exists — check if targetFile was also written
  try {
    await access(targetFile);
    // Both exist: remove the stale file
    await unlink(staleFile);
  } catch {
    // targetFile doesn't exist: rename staleFile → targetFile
    await rename(staleFile, targetFile);
  }
} catch {
  // staleFile doesn't exist: nothing to do
}

// Confirm the file exists.
await access(targetFile);

console.log("\nbuild/client/_worker.js written — ready for: wrangler pages deploy build/client --project-name humza-website");
