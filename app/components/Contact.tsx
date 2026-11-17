import { Link } from "react-router";

export function Contact() {
  return (
    <section className="contact">
      <div className="section-label">
        <span>— CONTACT</span>
      </div>
      <a className="contact-email" href="mailto:hello@humza.io">hello@humza.io</a>
      <p className="contact-links">
        <a href="https://x.com/0xHumza" target="_blank" rel="noreferrer">x</a> ·{" "}
        <a href="https://github.com/humzakhan" target="_blank" rel="noreferrer">github</a> ·{" "}
        <a href="https://www.linkedin.com/in/humzakhaan/" target="_blank" rel="noreferrer">linkedin</a> ·{" "}
        <Link to="/resume">resume</Link>
      </p>
    </section>
  );
}
