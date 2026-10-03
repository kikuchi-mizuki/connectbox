/**
 * Vite client ビルド後に各公開 URL（TOP / を含む）を
 * StaticRouter + renderToString でプリレンダし、dist の #root に本文を埋め込む。
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import {
  PUBLIC_SITE_PAGES,
  absoluteSiteUrl,
  shellOutputFile,
} from "./seo-static.mjs";
import { applyRouteMeta, injectRoot } from "./seo-html.mjs";

const root = process.cwd();
const distDir = resolve(root, "dist");
const ssrOutDir = resolve(root, "dist-ssr");

async function buildSsrBundle() {
  process.env.PRERENDER_SSR = "1";
  await build({
    configFile: resolve(root, "vite.config.ts"),
    build: {
      ssr: resolve(root, "src/entry-server.tsx"),
      outDir: ssrOutDir,
      emptyOutDir: true,
      ssrEmitAssets: false,
    },
  });
}

async function loadRender() {
  const entry = resolve(ssrOutDir, "entry-server.js");
  if (!existsSync(entry)) {
    throw new Error(`SSR bundle not found: ${entry}`);
  }
  const mod = await import(`${pathToFileURL(entry).href}?t=${Date.now()}`);
  if (typeof mod.render !== "function") {
    throw new Error("entry-server.js does not export render()");
  }
  return mod.render;
}

async function main() {
  if (!existsSync(resolve(distDir, "index.html"))) {
    throw new Error("dist/index.html missing. Run vite build first.");
  }

  // TOP を必ず先頭で処理する
  const pages = [
    ...PUBLIC_SITE_PAGES.filter((p) => p.path === "/"),
    ...PUBLIC_SITE_PAGES.filter((p) => p.path !== "/"),
  ];
  if (!pages.some((p) => p.path === "/")) {
    throw new Error('PUBLIC_SITE_PAGES must include path "/"');
  }

  console.log("[prerender] building SSR bundle…");
  await buildSsrBundle();

  const render = await loadRender();
  let ok = 0;

  for (const page of pages) {
    const outRel = shellOutputFile(page.path);
    const outFile = resolve(distDir, outRel);
    if (!existsSync(outFile)) {
      throw new Error(`Shell HTML missing for ${page.path}: ${outRel}`);
    }

    const appHtml = render(page.path);
    if (!appHtml || appHtml.length < 20) {
      throw new Error(`Empty SSR output for ${page.path}`);
    }
    if (!/<h1[\s>]/i.test(appHtml)) {
      throw new Error(`SSR output for ${page.path} has no <h1>`);
    }

    const shell = readFileSync(outFile, "utf8");
    const withMeta = applyRouteMeta(shell, page, absoluteSiteUrl(page.path));
    const html = injectRoot(withMeta, appHtml);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html, "utf8");
    console.log(`[prerender] ${page.path} → ${outRel} (${appHtml.length} chars)`);
    ok += 1;
  }

  const homeHtml = readFileSync(resolve(distDir, "index.html"), "utf8");
  if (!/<div id="root">[\s\S]*?<h1[\s>]/i.test(homeHtml)) {
    throw new Error("dist/index.html was not prerendered correctly (missing h1 in #root)");
  }

  rmSync(ssrOutDir, { recursive: true, force: true });
  console.log(`[prerender] done (${ok} pages, including /)`);
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
