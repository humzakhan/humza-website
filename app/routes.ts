import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("works", "routes/works.tsx"),
  route("resume", "routes/resume.tsx"),
  route("writings", "routes/writings.tsx"),
  route("blog", "routes/blog/index.tsx"),
  route("blog/:slug", "routes/blog/$slug.tsx"),
  // Discovery resources (prerendered at build time)
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("robots.txt", "routes/robots[.]txt.ts"),
  route("rss.xml", "routes/rss[.]xml.ts"),
  route("llms.txt", "routes/llms[.]txt.ts"),
] satisfies RouteConfig;
