import { Clock } from "./Clock";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <nav className="nav">
      <span className="nav-name">humza khan</span>
      <div className="nav-links">
        <a href="/works">works</a>
        <a href="/blog">writing</a>
        <a href="/resume">résumé</a>
        <a href="mailto:hello@humza.io">hello</a>
        <Clock />
        <ThemeToggle />
      </div>
    </nav>
  );
}
