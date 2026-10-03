/**
 * Vite client ビルド後に各公開 URL を StaticRouter + renderToString でプリレンダし、
 * dist のシェル HTML の #root に本文を埋め込む。
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import {
  PUBLIC_SITE_PAGES,
  shellOutputFile,
} from "./seo-static.mjs";

const root = process.cwd();
const distDir = resolve(root, "dist");
const ssrOutDir = resolve(root, "dist-ssr");

function injectRoot(html, appHtml) {
  if (!/<div\s+id=["']root["'][\s\S]*?<\/div>/i.test(html)) {
    throw new Error('Could not find <div id="root">...</div> in HTML shell');
  }
  return html.replace(
    /<div\s+id=["']root["'][\s\S]*?<\/div>/i,
    `<div id="root">${appHtml}</div>`,
  );
}

async function buildSsrBundle() {
  await build({
    configFile: resolve(root, "vite.config.ts"),
    build: {
      ssr: resolve(root, "src/entry-server.tsx"),
      outDir: ssrOutDir,
      emptyOutDir: true,
      // クライアント dist の CSS/アセットを使うため SSR 側は出さない
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

  console.log("[prerender] building SSR bundle…");
  await buildSsrBundle();

  const render = await loadRender();
  let ok = 0;

  for (const page of PUBLIC_SITE_PAGES) {
    const outRel = shellOutputFile(page.path);
    const outFile = resolve(distDir, outRel);
    if (!existsSync(outFile)) {
      throw new Error(`Shell HTML missing for ${page.path}: ${outRel}`);
    }

    const appHtml = render(page.path);
    if (!appHtml || appHtml.length < 20) {
      throw new Error(`Empty SSR output for ${page.path}`);
    }

    const shell = readFileSync(outFile, "utf8");
    const html = injectRoot(shell, appHtml);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html, "utf8");
    console.log(`[prerender] ${page.path} → ${outRel} (${appHtml.length} chars)`);
    ok += 1;
  }

  rmSync(ssrOutDir, { recursive: true, force: true });
  console.log(`[prerender] done (${ok} pages)`);
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
