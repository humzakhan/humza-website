import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import { defineConfig } from "vite";
import { createReadStream, existsSync } from "node:fs";
import { resolve, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { ServerResponse } from "node:http";

const __dirname = dirname(fileURLToPath(import.meta.url));

function staticHtmlPlugin() {
  return {
    name: "static-html-for-public-dirs",
    configureServer(server: { middlewares: { use: (fn: (req: { url?: string }, res: ServerResponse, next: () => void) => void) => void } }) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "/").split("?")[0];
        const publicDir = resolve(__dirname, "public");
        const candidatePath = resolve(__dirname, "public", url.replace(/^\//, ""), "index.html");
        // Boundary check: reject any path that escapes the public directory.
        if (!candidatePath.startsWith(publicDir + sep)) {
          next();
          return;
        }
        if (existsSync(candidatePath)) {
          (res as ServerResponse).setHeader("Content-Type", "text/html; charset=utf-8");
          const stream = createReadStream(candidatePath);
          stream.pipe(res as unknown as NodeJS.WritableStream);
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [cloudflareDevProxy(), reactRouter(), staticHtmlPlugin()],
});
