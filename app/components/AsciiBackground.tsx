import { useEffect } from "react";

// Animation lives in public/ascii-bg.js so static pages (no React) share it.
const SCRIPT_URL = "/ascii-bg.js";
const STATIC_BOOT = 'import{start}from"/ascii-bg.js";start();';

export function AsciiBackground({ staticPage = false }: { staticPage?: boolean }) {
  useEffect(() => {
    if (staticPage) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import(/* @vite-ignore */ SCRIPT_URL).then((m) => {
      const stop = m.start() as () => void;
      if (cancelled) stop();
      else cleanup = stop;
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [staticPage]);

  return (
    <>
      <div className="ascii-bg" id="ascii-bg" aria-hidden="true" />
      {staticPage && <script type="module" dangerouslySetInnerHTML={{ __html: STATIC_BOOT }} />}
    </>
  );
}
