import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin, PreviewServer, ViteDevServer } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** LINE等クローラ向け。src/data/detectiveSeo.ts と同じ内容に保つ */
const detectiveShell = {
  fileName: "detective.html",
  paths: ["/detective", "/detective/"],
  title: "探偵事務所TENT｜不貞調査の無料相談",
  description:
    "探偵事務所TENT。悩みの嵐の中にいるあなたを、大きな屋根で包み込み、守り抜く場所でありたい。不貞調査の無料相談を受付中。秘密厳守。",
  keywords: "探偵事務所TENT,TENT,不貞調査,浮気調査,探偵,無料相談,秘密厳守",
  canonical: "https://www.t-cnct.com/detective",
  ogImage: "https://www.t-cnct.com/detective/scene-1.jpg",
  siteName: "探偵事務所TENT",
} as const;

type RouteShell = typeof detectiveShell;
const shells: RouteShell[] = [detectiveShell];

function escapeAttr(value: string) {
  return value
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

function applyRouteMeta(html: string, shell: RouteShell) {
  let next = html;
  // 別ブランド向けシェルではコーポレートの Organization JSON-LD を外す
  next = next.replace(
    /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    "",
  );
  next = upsertTitle(next, shell.title);
  next = upsertMeta(next, "name", "description", shell.description);
  next = upsertMeta(next, "name", "keywords", shell.keywords);
  next = upsertMeta(next, "property", "og:title", shell.title);
  next = upsertMeta(next, "property", "og:description", shell.description);
  next = upsertMeta(next, "property", "og:url", shell.canonical);
  next = upsertMeta(next, "property", "og:image", shell.ogImage);
  next = upsertMeta(next, "property", "og:site_name", shell.siteName);
  next = upsertMeta(next, "property", "og:type", "website");
  next = upsertMeta(next, "property", "og:locale", "ja_JP");
  next = upsertMeta(next, "name", "twitter:card", "summary_large_image");
  next = upsertMeta(next, "name", "twitter:title", shell.title);
  next = upsertMeta(next, "name", "twitter:description", shell.description);
  next = upsertMeta(next, "name", "twitter:image", shell.ogImage);
  next = upsertLink(next, "canonical", shell.canonical);
  return next;
}

function rewriteShellPaths(
  req: IncomingMessage,
  _res: ServerResponse,
  next: (err?: unknown) => void,
) {
  if (!req.url) {
    next();
    return;
  }
  const [path, query] = req.url.split("?");
  const q = query ? `?${query}` : "";
  for (const shell of shells) {
    if ((shell.paths as readonly string[]).includes(path)) {
      req.url = `/${shell.fileName}${q}`;
      break;
    }
  }
  next();
}

async function serveDevShell(
  server: ViteDevServer,
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void,
) {
  if (!req.url) {
    next();
    return;
  }
  const [path] = req.url.split("?");
  const shell = shells.find((s) =>
    (s.paths as readonly string[]).includes(path),
  );
  if (!shell) {
    next();
    return;
  }
  try {
    const indexPath = resolve(server.config.root, "index.html");
    const raw = readFileSync(indexPath, "utf8");
    const transformed = await server.transformIndexHtml(path, raw);
    const html = applyRouteMeta(transformed, shell);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
  } catch (error) {
    next(error as Error);
  }
}

function spaRouteShells(): Plugin {
  return {
    name: "spa-route-shells",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        void serveDevShell(server, req, res, next);
      });
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use(rewriteShellPaths);
    },
    closeBundle() {
      const outDir = resolve(process.cwd(), "dist");
      const indexPath = resolve(outDir, "index.html");
      if (!existsSync(indexPath)) return;
      const indexHtml = readFileSync(indexPath, "utf8");
      for (const shell of shells) {
        const html = applyRouteMeta(indexHtml, shell);
        writeFileSync(resolve(outDir, shell.fileName), html, "utf8");
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
    const { pathToFileURL } = await import("node:url");
    const modPath = pathToFileURL(
      resolve(process.cwd(), "scripts/seo-static.mjs"),
    ).href;
    const mod = (await import(modPath)) as {
      buildSitemapXml: (lastmod?: string) => string;
    };
    writeFileSync(
      resolve(process.cwd(), "public/sitemap.xml"),
      mod.buildSitemapXml(),
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
