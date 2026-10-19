import type { MetaDescriptor } from "react-router";
import { AUTHOR, SITE_URL, absoluteUrl } from "~/lib/blog";

export { SITE_URL };

export const DEFAULT_OG_IMAGE = absoluteUrl("/og-image.png");
export const DEFAULT_OG_IMAGE_ALT = "Humza Khan, product engineer in Montréal, Canada";
export const PERSON_ID = absoluteUrl("/#person");
export const WEBSITE_ID = absoluteUrl("/#website");
export const BLOG_ID = absoluteUrl("/blog/#blog");
export const TWITTER_HANDLE = "@0xHumza";

export const canonicalLink = (path: string) => ({
  tagName: "link",
  rel: "canonical",
  href: absoluteUrl(path),
});

type OgImage = { url: string; alt: string; width: number; height: number };

export function pageMeta(opts: {
  path: string;
  title: string;
  description: string;
  image?: OgImage;
  type?: "website" | "article" | "profile";
}): MetaDescriptor[] {
  const { path, title, description, type = "website" } = opts;
  const image = opts.image ?? {
    url: DEFAULT_OG_IMAGE,
    alt: DEFAULT_OG_IMAGE_ALT,
    width: 1200,
    height: 630,
  };
  const url = absoluteUrl(path);

  return [
    { title },
    { name: "description", content: description },
    canonicalLink(path),
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: AUTHOR.name },
    { property: "og:locale", content: "en_CA" },
    { property: "og:image", content: image.url },
    { property: "og:image:width", content: String(image.width) },
    { property: "og:image:height", content: String(image.height) },
    { property: "og:image:alt", content: image.alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: TWITTER_HANDLE },
    { name: "twitter:creator", content: TWITTER_HANDLE },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image.url },
    { name: "twitter:image:alt", content: image.alt },
  ];
}

/** Full Person node (declared once per page via jsonLd, referenced elsewhere by @id). */
export function personNode(): object {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR.name,
    url: AUTHOR.url,
    image: DEFAULT_OG_IMAGE,
    jobTitle: "Product Engineer",
    description:
      "Humza Khan is a product engineer and AI engineer in Montréal, Canada, building AI agents, LLM evaluation and production data systems.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montréal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    knowsAbout: [
      "AI agents",
      "LLM evaluation",
      "AI safety",
      "Distributed systems",
      "Financial data platforms",
      "Python",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "pgvector",
      "React",
      "Next.js",
    ],
    knowsLanguage: ["en", "fr", "ur"],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "AWS Certified Solutions Architect – Associate",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Amazon Web Services" },
    },
    sameAs: AUTHOR.sameAs,
  };
}

export function websiteNode(): object {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: AUTHOR.name,
    inLanguage: "en-CA",
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
  };
}

export function jsonLd(...nodes: object[]): MetaDescriptor {
  return {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@graph": [personNode(), websiteNode(), ...nodes],
    },
  };
}

/** Kept for existing callers. */
export const authorPerson = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR.name,
  url: AUTHOR.url,
  sameAs: AUTHOR.sameAs,
};
