/** HTML head 書き換え・#root 注入（vite / prerender 共用） */

export function escapeAttr(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceMetaTag(html, attr, key, content) {
  const safe = escapeAttr(content);
  const re = new RegExp(
    `<meta\\s[^>]*?${attr}=["']${key}["'][^>]*?>`,
    "is",
  );
  const tag = `<meta ${attr}="${key}" content="${safe}" />`;
  if (re.test(html)) {
    return html.replace(re, tag);
  }
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

export function upsertLink(html, rel, href) {
  const safe = escapeAttr(href);
  const re = new RegExp(`<link\\s[^>]*?rel=["']${rel}["'][^>]*?>`, "is");
  const tag = `<link rel="${rel}" href="${safe}" />`;
  if (re.test(html)) {
    return html.replace(re, tag);
  }
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

export function upsertTitle(html, title) {
  const safe = escapeAttr(title);
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safe}</title>`);
  }
  return html.replace(/<\/head>/i, `    <title>${safe}</title>\n  </head>`);
}

export function applyRouteMeta(html, shell, canonical) {
  const title = shell.title ?? "";
  const description = shell.description ?? "";
  const keywords = shell.keywords ?? "";
  const siteName = shell.siteName ?? "T-connect";
  const ogImage = shell.ogImage ?? "";

  let next = html;
  if (shell.stripOrganizationJsonLd) {
    next = next.replace(
      /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
      "",
    );
  }
  next = upsertTitle(next, title);
  next = replaceMetaTag(next, "name", "description", description);
  next = replaceMetaTag(next, "name", "keywords", keywords);
  next = replaceMetaTag(
    next,
    "name",
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  );
  next = replaceMetaTag(next, "name", "googlebot", "index, follow");
  next = replaceMetaTag(next, "property", "og:title", title);
  next = replaceMetaTag(next, "property", "og:description", description);
  next = replaceMetaTag(next, "property", "og:url", canonical);
  next = replaceMetaTag(next, "property", "og:image", ogImage);
  next = replaceMetaTag(next, "property", "og:site_name", siteName);
  next = replaceMetaTag(next, "property", "og:type", "website");
  next = replaceMetaTag(next, "property", "og:locale", "ja_JP");
  next = replaceMetaTag(next, "name", "twitter:card", "summary_large_image");
  next = replaceMetaTag(next, "name", "twitter:title", title);
  next = replaceMetaTag(next, "name", "twitter:description", description);
  next = replaceMetaTag(next, "name", "twitter:image", ogImage);
  next = upsertLink(next, "canonical", canonical);
  return next;
}

/** #root をネストした div も含めて安全に差し替える */
export function injectRoot(html, appHtml) {
  const openRe = /<div\s+id=["']root["'][^>]*>/i;
  const open = openRe.exec(html);
  if (!open) {
    throw new Error('Could not find <div id="root"> in HTML shell');
  }
  const openStart = open.index;
  const openEnd = openStart + open[0].length;

  let depth = 1;
  let i = openEnd;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose === -1) {
      throw new Error('Unclosed <div id="root"> in HTML shell');
    }
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
      continue;
    }
    depth -= 1;
    i = nextClose + 6;
  }

  return `${html.slice(0, openStart)}<div id="root">${appHtml}</div>${html.slice(i)}`;
}
