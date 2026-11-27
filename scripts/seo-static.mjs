/** sitemap / 静的SEO用。公開ページ追加時はここを更新する。 */
export const SITE_URL = "https://www.t-cnct.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/tconnect-logo.png`;

/** 公開インデックス対象。title/description は各ページの usePageMeta と揃える */
export const PUBLIC_SITE_PAGES = [
  {
    path: "/",
    priority: 1.0,
    changefreq: "weekly",
    title: "株式会社T-connect（ティーコネクト）｜公式サイト",
    description:
      "株式会社T-connect（ティーコネクト）の公式サイト。主事業Connect Box（コネクトボックス）でBPO・バックオフィス代行・コンサルティングを提供。東京都新宿区西新宿。",
    keywords:
      "株式会社T-connect,T-connect,ティーコネクト,ティーコネクト 公式,株式会社ティーコネクト,公式サイト,Connect Box,コネクトボックス,BPO,バックオフィス代行",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/company",
    priority: 0.9,
    changefreq: "monthly",
    title: "会社情報｜株式会社T-connect（ティーコネクト）",
    description:
      "株式会社T-connect（ティーコネクト）の会社概要。代表・所在地（東京都新宿区）・主事業Connect Box（BPO・コンサルティング）。お問い合わせはLINE・オンライン相談・メールで。",
    keywords:
      "株式会社T-connect,ティーコネクト,会社情報,会社概要,所在地,代表取締役,Connect Box,コネクトボックス,公式",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
  },
  {
    path: "/connect-box",
    priority: 0.9,
    changefreq: "weekly",
    title: "Connect Box｜企業と人の課題を、ひとつの窓口で",
    description:
      "Connect Box（コネクトボックス）。人を増やす前に、業務を外に出す。企業と人のあらゆる課題を、ひとつの窓口で。バックオフィス代行から採用・戦略・制作まで、必要な分だけ支援します。",
    keywords:
      "Connect Box,コネクトボックス,BPO,バックオフィス代行,旅費One,外部経営チーム,業務委託,T-connect",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
    clarityProjectId: "zjztvsdiy0",
  },
  {
    path: "/connect-box/back-office",
    priority: 0.8,
    changefreq: "monthly",
    title: "事務代行・バックオフィス業務代行｜Connect Box",
    description:
      "事務代行・バックオフィス代行ならConnect Box（コネクトボックス）。経理・総務・人事・営業事務の負担を、採用せずに減らす。LINE・オンライン相談・メールで受付。",
    keywords:
      "事務代行,バックオフィス代行,バックオフィス業務代行,経理代行,総務代行,営業事務,Connect Box,コネクトボックス,BPO",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
    clarityProjectId: "zjztvsdiy0",
  },
  {
    path: "/connect-box/ads/back-office",
    priority: 0.1,
    changefreq: "monthly",
    /** 広告流入専用。検索インデックス・サイトマップ対象外 */
    noindex: true,
    excludeFromSitemap: true,
    title: "オンライン秘書・事務代行｜月8万円から・2週間無料｜Connect Box",
    description:
      "オンライン秘書・事務代行を比較中の方向け。アポ・返信・追客まで対応。人材業界10年が人選し、顔合わせ後に開始。まずは2週間無料、続くなら月8万円から。",
    keywords:
      "オンライン秘書,オンライン秘書 費用,事務代行,バックオフィス代行,無料トライアル,Connect Box",
    siteName: "T-connect",
    ogImage: DEFAULT_OG_IMAGE,
    clarityProjectId: "zjztvsdiy0",
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
    clarityProjectId: "zjztvsdiy0",
  },
  {
    path: "/detective",
    priority: 0.8,
    changefreq: "weekly",
    /** 広告・直接流入用。検索インデックス対象外 */
    noindex: true,
    excludeFromSitemap: true,
    title:
      "ミノガサン探偵事務所｜浮気調査 10万円〜（税込）・証拠が取れなければ0円・同性相談",
    description:
      "証拠が取れなければ、調査費用は0円（すべての調査が対象。条件はご契約前に書面でご説明）。入口10万円〜（税込）。興信所をお探しの方もご相談可。まずは無料相談から。",
    keywords:
      "ミノガサン探偵事務所,浮気調査,浮気調査 費用,探偵 料金,定額プラン,不倫調査,人探し,所在調査,素行調査,興信所,探偵,LINE相談,同性相談,秘密厳守",
    siteName: "ミノガサン探偵事務所",
    ogImage: `${SITE_URL}/detective/scene-consult-bright.jpg`,
    stripOrganizationJsonLd: true,
    clarityProjectId: "zbvmrpjlf9",
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
  const urls = PUBLIC_SITE_PAGES.filter((page) => !page.excludeFromSitemap)
    .map(
      (page) => `  <url>
    <loc>${absoluteSiteUrl(page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

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
          "株式会社T-connect（ティーコネクト）の公式サイト。主事業Connect Box（コネクトボックス）で、BPO・バックオフィス代行・コンサルティングを提供。東京都新宿区。",
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
