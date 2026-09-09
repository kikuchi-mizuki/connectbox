/** sitemap / 静的SEO用。公開ページ追加時はここを更新する。 */
export const SITE_URL = "https://www.t-cnct.com";

export const PUBLIC_SITE_PAGES = [
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

export function absoluteSiteUrl(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)) {
  const urls = PUBLIC_SITE_PAGES.map(
    (page) => `  <url>
    <loc>${absoluteSiteUrl(page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

/** index.html 埋め込み用。サイト上の公開情報のみ */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "株式会社T-connect",
        legalName: "株式会社T-connect",
        alternateName: ["T-connect", "ティーコネクト", "T-connect Inc."],
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/tconnect-logo.png`,
        description:
          "Connect BoxのBPO・コンサルティング、宝飾、起業家育成など、人と人との縁を紡ぐ事業を展開する株式会社T-connectの公式サイト。",
        address: {
          "@type": "PostalAddress",
          postalCode: "160-0023",
          addressRegion: "東京都",
          addressLocality: "新宿区",
          streetAddress: "西新宿３丁目１−３ MITSUWAビル １０階",
          addressCountry: "JP",
        },
        founder: {
          "@type": "Person",
          name: "田中 辰弥",
          jobTitle: "代表取締役",
        },
        brand: {
          "@type": "Brand",
          name: "Connect Box",
          alternateName: "コネクトボックス",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "株式会社T-connect",
        alternateName: ["T-connect", "ティーコネクト"],
        url: `${SITE_URL}/`,
        inLanguage: "ja",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}
