import { mkdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin, PreviewServer } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

type RouteShell = {
  path: string;
  title: string;
  description: string;
  keywords: string;
  siteName: string;
  ogImage: string;
  stripOrganizationJsonLd?: boolean;
};

async function loadSeoStatic() {
  const filePath = resolve(process.cwd(), "scripts/seo-static.mjs");
  const bust = statSync(filePath).mtimeMs;
  const modPath = `${pathToFileURL(filePath).href}?t=${bust}`;
  return (await import(modPath)) as {
    PUBLIC_SITE_PAGES: RouteShell[];
    absoluteSiteUrl: (path: string) => string;
    shellOutputFile: (path: string) => string;
    buildSitemapXml: (lastmod?: string) => string;
  };
}

function escapeAttr(value: string) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function upsertMeta(
  html: string,
  attr: "name" | "property",
  key: string,
  content: string,
) {
  const safe = escapeAttr(content);
  const re = new RegExp(
    `(<meta\\s+${attr}=["']${key}["']\\s+content=["'])([^"']*)(["'])`,
    "i",
  );
  if (re.test(html)) {
    return html.replace(re, `$1${safe}$3`);
  }
  return html.replace(
    /<\/head>/i,
    `    <meta ${attr}="${key}" content="${safe}" />\n  </head>`,
  );
}

function upsertLink(html: string, rel: string, href: string) {
  const safe = escapeAttr(href);
  const re = new RegExp(
    `(<link\\s+rel=["']${rel}["']\\s+href=["'])([^"']*)(["'])`,
    "i",
  );
  if (re.test(html)) {
    return html.replace(re, `$1${safe}$3`);
  }
  return html.replace(
    /<\/head>/i,
    `    <link rel="${rel}" href="${safe}" />\n  </head>`,
  );
}

function upsertTitle(html: string, title: string) {
  const safe = escapeAttr(title);
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safe}</title>`);
  }
  return html.replace(/<\/head>/i, `    <title>${safe}</title>\n  </head>`);
}

function applyRouteMeta(
  html: string,
  shell: RouteShell,
  canonical: string,
) {
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
  next = upsertMeta(next, "name", "description", description);
  next = upsertMeta(next, "name", "keywords", keywords);
  // 公開ページは明示的に index 許可（noindex が残らないように上書き）
  next = upsertMeta(
    next,
    "name",
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  );
  next = upsertMeta(next, "name", "googlebot", "index, follow");
  next = upsertMeta(next, "property", "og:title", title);
  next = upsertMeta(next, "property", "og:description", description);
  next = upsertMeta(next, "property", "og:url", canonical);
  next = upsertMeta(next, "property", "og:image", ogImage);
  next = upsertMeta(next, "property", "og:site_name", siteName);
  next = upsertMeta(next, "property", "og:type", "website");
  next = upsertMeta(next, "property", "og:locale", "ja_JP");
  next = upsertMeta(next, "name", "twitter:card", "summary_large_image");
  next = upsertMeta(next, "name", "twitter:title", title);
  next = upsertMeta(next, "name", "twitter:description", description);
  next = upsertMeta(next, "name", "twitter:image", ogImage);
  next = upsertLink(next, "canonical", canonical);
  return next;
}

function matchShell(pages: RouteShell[], path: string) {
  return pages.find(
    (page) => page.path !== "/" && (page.path === path || `${page.path}/` === path),
  );
}

function spaRouteShells(): Plugin {
  let pages: RouteShell[] = [];
  let absoluteSiteUrl = (path: string) => path;
  let shellOutputFile = (path: string) => `${path}.html`;
  let seoLoadedAt = 0;

  const refreshSeo = async () => {
    const filePath = resolve(process.cwd(), "scripts/seo-static.mjs");
    const mtime = statSync(filePath).mtimeMs;
    if (pages.length && mtime === seoLoadedAt) return;
    const seo = await loadSeoStatic();
    pages = seo.PUBLIC_SITE_PAGES;
    absoluteSiteUrl = seo.absoluteSiteUrl;
    shellOutputFile = seo.shellOutputFile;
    seoLoadedAt = mtime;
  };

  return {
    name: "spa-route-shells",
    async buildStart() {
      await refreshSeo();
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        void (async () => {
          await refreshSeo();
          if (!req.url) {
            next();
            return;
          }
          const [path] = req.url.split("?");
          const shell = matchShell(pages, path);
          if (!shell?.title) {
            next();
            return;
          }
          try {
            const indexPath = resolve(server.config.root, "index.html");
            const raw = readFileSync(indexPath, "utf8");
            const transformed = await server.transformIndexHtml(path, raw);
            const html = applyRouteMeta(
              transformed,
              shell,
              absoluteSiteUrl(shell.path),
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
          } catch (error) {
            next(error as Error);
          }
        })();
      });
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use(
        (req: IncomingMessage, _res: ServerResponse, next: (err?: unknown) => void) => {
          if (!req.url) {
            next();
            return;
          }
          const [path, query] = req.url.split("?");
          const shell = matchShell(pages, path);
          if (shell) {
            const q = query ? `?${query}` : "";
            req.url = `/${shellOutputFile(shell.path)}${q}`;
          }
          next();
        },
      );
    },
    async closeBundle() {
      await refreshSeo();

      const outDir = resolve(process.cwd(), "dist");
      const indexPath = resolve(outDir, "index.html");
      if (!existsSync(indexPath)) return;
      const indexHtml = readFileSync(indexPath, "utf8");

      for (const shell of pages) {
        if (shell.path === "/" || !shell.title) continue;
        const html = applyRouteMeta(
          indexHtml,
          shell,
          absoluteSiteUrl(shell.path),
        );
        const outFile = resolve(outDir, shellOutputFile(shell.path));
        mkdirSync(dirname(outFile), { recursive: true });
        writeFileSync(outFile, html, "utf8");
      }
    },
  };
}

function unlistedBackOfficeDeck(): Plugin {
  const rewrite = (
    req: { url?: string },
    _res: unknown,
    next: () => void,
  ) => {
    if (!req.url) {
      next();
      return;
    }
    const [path, query] = req.url.split("?");
    const q = query ? `?${query}` : "";
    if (
      path === "/connect-box/back-office/deck" ||
      path === "/connect-box/back-office/deck/"
    ) {
      req.url = "/connect-box/back-office/deck.html" + q;
    }
    if (
      path === "/connectbox/back-office/deck" ||
      path === "/connectbox/back-office/deck/"
    ) {
      req.url = "/connectbox/back-office/deck.html" + q;
    }
    if (path === "/lp/back-office/deck" || path === "/lp/back-office/deck/") {
      req.url = "/lp/back-office/deck.html" + q;
    }
    next();
  };

  return {
    name: "unlisted-backoffice-deck",
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

function generateSitemap(): Plugin {
  const writeSitemap = async () => {
    const seo = await loadSeoStatic();
    writeFileSync(
      resolve(process.cwd(), "public/sitemap.xml"),
      seo.buildSitemapXml(),
      "utf8",
    );
  };

  return {
    name: "generate-sitemap",
    async buildStart() {
      await writeSitemap();
    },
    async configureServer() {
      await writeSitemap();
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    unlistedBackOfficeDeck(),
    spaRouteShells(),
    generateSitemap(),
  ],
  server: {
    host: true,
    port: 5174,
    strictPort: true,
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    allowedHosts: true,
  },
});
