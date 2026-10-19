import { Link } from "react-router";
import { Clock } from "./Clock";
import { ThemeToggle } from "./ThemeToggle";

interface NavProps {
  /** Static (JS-free) pages hide the clock and theme toggle, which need JS. */
  staticPage?: boolean;
}

export function Nav({ staticPage = false }: NavProps) {
  return (
    <nav className="nav">
      {/* Plain anchor so it also works on static (JS-free) blog pages. */}
      <a className="nav-name" href="/">humza k<span className="nav-dot">.</span></a>
      <div className="nav-links">
        <Link to="/works">works</Link>
        <Link to="/resume">resume</Link>
        {/* Plain anchor: blog pages are static documents, so force a full page load. */}
        <a href="/blog/">blog</a>
        {!staticPage && (
          <>
            <Clock />
            <ThemeToggle />
          </>
        )}
      </div>
    </nav>
  );
}
