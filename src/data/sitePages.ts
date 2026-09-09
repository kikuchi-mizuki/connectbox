/**
 * 公開ページ一覧の TypeScript 側エントリ。
 * 実体の単一ソースは scripts/seo-static.mjs（ビルド時 sitemap / HTML 埋め込み）。
 * ページ追加時は両方を同じパスで更新すること。
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

export const PUBLIC_SITE_PAGES: SitePageEntry[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/company", priority: 0.9, changefreq: "monthly" },
  { path: "/connect-box", priority: 0.9, changefreq: "weekly" },
  { path: "/connect-box/back-office", priority: 0.8, changefreq: "monthly" },
  { path: "/connect-box/log-track", priority: 0.8, changefreq: "monthly" },
  { path: "/connect-box/web-marketing", priority: 0.7, changefreq: "monthly" },
  { path: "/connect-box/hr", priority: 0.7, changefreq: "monthly" },
  { path: "/connect-box/coaching", priority: 0.7, changefreq: "monthly" },
  { path: "/connect-box/strategy", priority: 0.7, changefreq: "monthly" },
  { path: "/connect-box/business-upgrade", priority: 0.7, changefreq: "monthly" },
  { path: "/jewelry", priority: 0.7, changefreq: "monthly" },
  { path: "/incubation", priority: 0.7, changefreq: "monthly" },
  { path: "/detective", priority: 0.8, changefreq: "weekly" },
];
