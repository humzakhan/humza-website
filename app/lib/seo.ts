import { AUTHOR, absoluteUrl } from "~/lib/blog";

export const DEFAULT_OG_IMAGE = absoluteUrl("/og-image.png");
export const PERSON_ID = absoluteUrl("/#person");
export const TWITTER_HANDLE = "@0xHumza";

export const canonicalLink = (path: string) => ({
  tagName: "link",
  rel: "canonical",
  href: absoluteUrl(path),
});

/** Full Person node (declared once per page, referenced elsewhere by @id). */
export const authorPerson = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR.name,
  url: AUTHOR.url,
  sameAs: AUTHOR.sameAs,
};
