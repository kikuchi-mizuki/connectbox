/** sitemap / 静的SEO用。公開ページ追加時はここを更新する。 */
export const SITE_URL = "https://www.t-cnct.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/tconnect-logo.png`;

/** 公開インデックス対象。title/description は各ページの usePageMeta と揃える */
export const PUBLIC_SITE_PAGES = [
  {
    path: "/",
    priority: 1.0,
    changefreq: "weekly",
    title: "株式会社T-connect（T-connect）｜公式サイト",
    description:
      "株式会社T-connect（ティーコネクト）の公式ホームページ。Connect Box（コネクトボックス）のBPO・コンサルティング、宝飾、起業家育成など、人と人との縁を紡ぐ事業を展開。東京都新宿区。",
    keywords:
      "株式会社T-connect,T-connect,ティーコネクト,公式サイト,Connect Box,コネクトボックス,BPO,バックオフィス代行,宝飾,起業家育成",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/company",
    priority: 0.9,
    changefreq: "monthly",
    title: "会社情報｜株式会社T-connect",
    description:
      "株式会社T-connectの会社情報。所在地・代表者・事業内容（Connect BoxのBPO・コンサルティング、宝飾、起業家育成など）。",
    keywords:
      "株式会社T-connect,T-connect,会社情報,会社概要,Connect Box,コネクトボックス",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/connect-box",
    priority: 0.9,
    changefreq: "weekly",
    title: "Connect Box｜BPO・バックオフィス代行",
    description:
      "Connect Box（コネクトボックス）のBPO・コンサルティング。人を増やす前に、バックオフィス業務を外に出す。経理・総務・人事・営業事務など、必要な分だけ外部化。",
    keywords:
      "Connect Box,コネクトボックス,BPO,バックオフィス代行,旅費One,経理代行,総務代行,業務委託,T-connect",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/connect-box/back-office",
    priority: 0.8,
    changefreq: "monthly",
    title: "バックオフィス代行｜Connect Box",
    description:
      "Connect Box（コネクトボックス）のバックオフィス代行。経理・総務・人事・営業事務の負担を、採用せずに減らす。まずは15分、LINEで相談。",
    keywords:
      "バックオフィス代行,経理代行,総務代行,営業事務,Connect Box,コネクトボックス,BPO",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/connect-box/ryohi-one",
    priority: 0.8,
    changefreq: "monthly",
    title: "旅費One｜旅費管理（リリース前）｜Connect Box",
    description:
      "Connect Boxの旅費One（リリース前）。旅費管理をひとつに。出張の移動をGPSで自動記録し、日当計算・出張報告書までつなげる。事前のご相談を受付中。",
    keywords:
      "旅費One,旅費管理,出張管理,日当,出張報告書,GPS,Connect Box,コネクトボックス,リリース前",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/connect-box/web-marketing",
    priority: 0.7,
    changefreq: "monthly",
    title: "WEBマーケ｜Connect Box",
    description:
      "Connect Box（コネクトボックス）のWEBマーケ。選ばれ続ける導線と信頼をつくる。",
    keywords: "WEBマーケ,Webマーケティング,集客,Connect Box,コネクトボックス",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/connect-box/hr",
    priority: 0.7,
    changefreq: "monthly",
    title: "採用・人事｜Connect Box",
    description:
      "Connect Box（コネクトボックス）の採用・人事支援。長く働ける採用と定着をつくる。",
    keywords: "採用支援,人事代行,定着,Connect Box,コネクトボックス",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/connect-box/coaching",
    priority: 0.7,
    changefreq: "monthly",
    title: "組織コーチング｜Connect Box",
    description:
      "Connect Box（コネクトボックス）の組織コーチング。判断の軸を揃える。",
    keywords: "組織コーチング,コーチング,Connect Box,コネクトボックス",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/connect-box/strategy",
    priority: 0.7,
    changefreq: "monthly",
    title: "経営戦略｜Connect Box",
    description:
      "Connect Box（コネクトボックス）の経営戦略支援。未来を選ぶ意思決定を支える。",
    keywords: "経営戦略,コンサルティング,Connect Box,コネクトボックス",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/connect-box/business-upgrade",
    priority: 0.7,
    changefreq: "monthly",
    title: "既存事業ブラッシュアップ｜Connect Box",
    description:
      "Connect Box（コネクトボックス）の既存事業ブラッシュアップ。次に選ばれる理由を磨く。",
    keywords: "事業改善,ブラッシュアップ,Connect Box,コネクトボックス",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/detective",
    priority: 0.8,
    changefreq: "weekly",
    title: "ミノガサン探偵事務所｜浮気・不倫・素行調査の無料相談",
    description:
      "浮気・不倫を見逃さん。ミノガサン探偵事務所。不倫調査・身辺調査・素行調査の無料相談を受付中。秘密厳守。いきなり契約ではありません。",
    keywords:
      "ミノガサン探偵事務所,見逃さん,不倫調査,浮気調査,身辺調査,素行調査,探偵,無料相談,秘密厳守",
    siteName: "ミノガサン探偵事務所",
    ogImage: `${SITE_URL}/detective/scene-1.jpg`,
    stripOrganizationJsonLd: true,
  },
];

export function absoluteSiteUrl(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function shellOutputFile(path) {
  if (path === "/") return "index.html";
  return `${path.replace(/^\//, "")}.html`;
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
