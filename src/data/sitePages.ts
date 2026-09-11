/**
 * 公開ページ一覧の TypeScript 側メモ。
 * 実体の単一ソースは scripts/seo-static.mjs（sitemap / 静的シェル生成）。
 * ページ追加時は seo-static.mjs を更新すること。
 */
export type SitePageEntry = {
  path: string;
  priority: number;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
};

export const PUBLIC_SITE_PATHS = [
  "/",
  "/company",
  "/connect-box",
  "/connect-box/back-office",
  "/connect-box/ryohi-one",
  "/connect-box/web-marketing",
  "/connect-box/hr",
  "/connect-box/coaching",
  "/connect-box/strategy",
  "/connect-box/business-upgrade",
  "/detective",
] as const;
