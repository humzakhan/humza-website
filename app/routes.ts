import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("works", "routes/works.tsx"),
  route("resume", "routes/resume.tsx"),
  route("blog", "routes/blog/index.tsx"),
  route("blog/:slug", "routes/blog/$slug.tsx"),
] satisfies RouteConfig;
