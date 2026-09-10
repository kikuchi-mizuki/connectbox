import { useEffect } from "react";
import { getSiteUrl, SITE_NAME, SITE_URL } from "../constants";

const DEFAULT_OG_IMAGE = `${SITE_URL}/tconnect-logo.png`;

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
) {
  const selector =
    attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function buildTitle(title: string) {
  if (title === SITE_NAME || title.includes(SITE_NAME) || title.includes("｜")) {
    return title;
  }
  return `${title} | ${SITE_NAME}`;
}

export function usePageMeta({
  title,
  description,
  keywords,
  path = "/",
  noindex = false,
  ogTitle,
  ogDescription,
  ogImage,
  ogSiteName,
}: {
  title: string;
  description: string;
  /** 補助。Googleはほぼ参照しないが、表記ゆれ対策として設定 */
  keywords?: string;
  path?: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogSiteName?: string;
}) {
  useEffect(() => {
    const fullTitle = buildTitle(title);
    const ogT = ogTitle ?? fullTitle;
    const ogD = ogDescription ?? description;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    const url = `${getSiteUrl()}${normalized === "/" ? "/" : normalized}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    if (keywords) upsertMeta("name", "keywords", keywords);
    const robotsContent = noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    upsertMeta("name", "robots", robotsContent);
    upsertMeta(
      "name",
      "googlebot",
      noindex ? "noindex, nofollow" : "index, follow",
    );

    const image = ogImage ?? DEFAULT_OG_IMAGE;

    upsertMeta("property", "og:title", ogT);
    upsertMeta("property", "og:description", ogD);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:locale", "ja_JP");
    upsertMeta("property", "og:site_name", ogSiteName ?? SITE_NAME);
    upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", ogT);
    upsertMeta("name", "twitter:description", ogD);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", url);
  }, [
    title,
    description,
    keywords,
    path,
    noindex,
    ogTitle,
    ogDescription,
    ogImage,
    ogSiteName,
  ]);
}
