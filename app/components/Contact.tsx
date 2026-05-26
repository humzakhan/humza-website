import { Link } from "react-router";

export function Contact() {
  return (
    <section className="contact">
      <div className="section-label">
        <span>— CONTACT</span>
      </div>
      <a className="contact-email" href="mailto:hello@humza.io">hello@humza.io</a>
      <p className="contact-links">
        <a href="#">github</a> · <a href="#">linkedin</a> · <a href="#">twitter</a> · <Link to="/resume">résumé</Link>
      </p>
    </section>
  );
}
