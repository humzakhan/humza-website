function handleClick() {
  const root = document.documentElement;
  const current = root.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

export function ThemeToggle() {
  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      aria-label="Toggle theme"
      onClick={handleClick}
    >
      <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">

        {/* ── LIGHT MODE: planet orbiting a star ── */}

        {/* Orbit path (dashed ellipse) */}
        <ellipse
          className="tog-orbit-ring"
          cx="11"
          cy="11"
          rx="7"
          ry="3.5"
          transform="rotate(-20 11 11)"
        />

        {/* Central star body */}
        <circle className="tog-star-body" cx="11" cy="11" r="2.2" />

        {/* 4 short rays on the central star */}
        <line className="tog-ray" x1="11" y1="6.5"  x2="11" y2="8.2" />
        <line className="tog-ray" x1="11" y1="13.8" x2="11" y2="15.5" />
        <line className="tog-ray" x1="6.5"  y1="11" x2="8.2"  y2="11" />
        <line className="tog-ray" x1="13.8" y1="11" x2="15.5" y2="11" />

        {/* Planet — animated orbit via CSS */}
        <circle className="tog-planet" cx="11" cy="11" r="1.4" />

        {/* ── DARK MODE: sun with 8 rays ── */}

        {/* Sun body — larger, bright */}
        <circle className="tog-sun-body" cx="11" cy="11" r="3.2" />

        {/* 8 rays */}
        <line className="tog-sun-ray" x1="11" y1="1.5"  x2="11" y2="4.5" />
        <line className="tog-sun-ray" x1="11" y1="17.5" x2="11" y2="20.5" />
        <line className="tog-sun-ray" x1="1.5"  y1="11" x2="4.5"  y2="11" />
        <line className="tog-sun-ray" x1="17.5" y1="11" x2="20.5" y2="11" />
        <line className="tog-sun-ray" x1="4.1"  y1="4.1"  x2="6.3"  y2="6.3" />
        <line className="tog-sun-ray" x1="15.7" y1="15.7" x2="17.9" y2="17.9" />
        <line className="tog-sun-ray" x1="4.1"  y1="17.9" x2="6.3"  y2="15.7" />
        <line className="tog-sun-ray" x1="15.7" y1="6.3"  x2="17.9" y2="4.1" />

      </svg>
    </button>
  );
}
