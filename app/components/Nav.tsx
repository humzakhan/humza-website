import { Link } from "react-router";
import { Clock } from "./Clock";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <nav className="nav">
      <span className="nav-name">humza k<span className="nav-dot">.</span></span>
      <div className="nav-links">
        <Link to="/works">works</Link>
        <Link to="/blog">writing</Link>
        <Link to="/resume">resume</Link>
        <a href="mailto:hello@humza.io">hello</a>
        <Clock />
        <ThemeToggle />
      </div>
    </nav>
  );
}
