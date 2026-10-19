import { Link } from "react-router";
import { getPosts, postPath } from "~/lib/blog";

export function Contact() {
  const latest = getPosts()[0];
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
      {latest && (
        <p className="contact-links">
          Latest writing: <a href={postPath(latest.slug)}>{latest.title}</a>
        </p>
      )}
    </section>
  );
}
