export function Footer() {
  return (
    <footer className="footer">
      <span className="footer-credit">
        <span className="footer-code" aria-hidden="true">&lt;/&gt;</span>
        <span>with</span>
        <svg className="footer-heart" viewBox="0 0 18 14" aria-hidden="true" focusable="false">
          <path d="M9 13.2 7.85 12.1C3.55 8.35 1 6.05 1 3.55 1 1.55 2.45.6 4.25.6 5.55.6 6.85 1.25 7.55 2.35L9 4.25l1.45-1.9C11.15 1.25 12.45.6 13.75.6 15.55.6 17 1.55 17 3.55c0 2.5-2.55 4.8-6.85 8.55L9 13.2Z" />
        </svg>
        <span>in</span>
        <span className="footer-flags" aria-label="Canada and Pakistan">🇨🇦 🇵🇰</span>
      </span>
    </footer>
  );
}
