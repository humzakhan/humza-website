import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
  useRouteError,
} from "react-router";
import "~/styles/theme.css";
import "~/styles/landing.css";

export function Layout({ children }: { children: React.ReactNode }) {
  // Static pages (blog, discovery files) ship no app JS: no hydration, no
  // theme script. They follow the system colour scheme through CSS alone.
  const isStatic = useMatches().some(
    (m) => (m.handle as { staticPage?: boolean } | undefined)?.staticPage,
  );

  // Every page has a generated Markdown twin (scripts/build-markdown.mjs).
  const { pathname } = useLocation();
  const markdownHref =
    pathname === "/"
      ? "/index.md"
      : pathname.endsWith("/")
        ? `${pathname}index.md`
        : `${pathname}.md`;

  return (
    <html lang="en-CA" data-theme={isStatic ? undefined : "light"}>
      <head>
        {/* No-FOUC blocking script — must be first, before stylesheets */}
        {!isStatic && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){
  var s=localStorage.getItem('theme');
  var p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  document.documentElement.setAttribute('data-theme', s||p);
})();`,
            }}
          />
        )}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Plausible Analytics (self-hosted) */}
        <script
          async
          src="https://plausible.humza.io/js/pa-pMW_-6ihKg-uns8xvnmp8.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}},plausible.init()",
          }}
        />
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Humza Khan — Blog"
          href="/rss.xml"
        />
        <link rel="alternate" type="text/markdown" href={markdownHref} />
        {/* Font preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Lora:wght@500;600;700&family=Inter:opsz,wght@14..32,300..700&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {!isStatic && (
          <>
            <ScrollRestoration />
            <Scripts />
          </>
        )}
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  const title = notFound ? "Page not found | Humza Khan" : "Something went wrong | Humza Khan";

  return (
    <main style={{ maxWidth: "40rem", margin: "4rem auto", padding: "0 1.5rem" }}>
      <title>{title}</title>
      <meta name="robots" content="noindex" />
      <h1>{notFound ? "Page not found" : "Something went wrong"}</h1>
      <p>
        {notFound
          ? "That page does not exist or has moved."
          : "An unexpected error occurred. Please try again."}
      </p>
      <p>
        <a href="/">Home</a> · <a href="/works">Works</a> · <a href="/resume">Resume</a> ·{" "}
        <a href="/blog/">Blog</a>
      </p>
    </main>
  );
}
