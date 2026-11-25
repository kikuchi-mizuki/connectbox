import { company } from "./company";

/** ミノガサン探偵事務所（見逃さん）— ご説明資料の数値に準拠 */
export const tentOffice = {
  name: "ミノガサン探偵事務所",
  nameEn: "MINOGASAN",
  legalNote: "株式会社T-connect",
  tagline: "浮気・不倫を見逃さん。ミノガサン探偵事務所",
  message:
    "小さな違和感も、怪しい動きも、見逃さない。あなたの隣で事実を確かめる場所でありたい。",
  /** 公開面では実名を出さない */
  counselorLabel: "同性の相談員",
  counselorRole: "ミノガサン探偵事務所 相談窓口",
  telDisplay: "080-8808-1739",
  email: "m-tanaka@t-cnct.com",
  address: company.address,
  postalCode: company.postalCode,

  /** 浮気・不倫調査（調査員2名・おまかせプラン） */
  flatPlanTotal: "55万円",
  flatPlanTaxNote: "税込",
  /** 最低費用（最初の一歩プラン） */
  minPrice: "10万円",
  minPriceNote: "最低費用 10万円〜（税込）",
  successDeposit: "15.4万円",
  successOnEvidence: "50.6万円",
  successTotalRange: "15.4〜66万円",
  successTaxNote: "〜（税込）",
  hourlyRate: "25,000円",

  identityCheckPrice: "10万円",
  identityCheckNote: "〜（税込）",

  licenseNumber: "30260207",
  licenseLabel: "探偵業届出番号：東京都公安委員会 第30260207号",
  licenseNote: "探偵業の業務の適正化に関する法律に基づき届出済みです。",

  partnerYears: "約30年",
  partnerCases: "1万件以上",
  partnerYearsLabel: "調査歴",
  partnerCasesLabel: "累計調査",
  partnerYearsNote: "※提携調査会社の創業からの年数。",
  partnerCasesNote: "※提携調査会社の累計の調査件数です。",

  privacyLabel: "プライバシーポリシー",
  privacyHref: "#privacy",
  privacyBody:
    "ご相談・調査に関する個人情報は、相談対応・調査・ご報告の目的以外に利用しません。ご本人の同意なく第三者へ提供しません。開示・訂正・削除のご要望は、上記メールまたはお電話にて受け付けます。",

  /** 資料「ご相談から報告までの流れ」より */
  cancelPolicy:
    "やめることができます。調査開始前は、事務手数料1.1万円を除いて返金。調査開始後は、実施した時間分を精算して返金します。費用の扱いの詳細は、ご契約前に書面でご説明します。",
} as const;

/** ブランドアセット（差し色 #D9463A） */
export const detectiveBrand = {
  accent: "#D9463A",
  horizontalBlack: "/detective/brand/minogasan_horizontal_black.png",
  horizontalWhite: "/detective/brand/minogasan_horizontal_white.png",
  verticalBlack: "/detective/brand/minogasan_vertical_black.png",
  verticalWhite: "/detective/brand/minogasan_vertical_white.png",
  markBlack: "/detective/brand/minogasan_mark_black.png",
  markWhite: "/detective/brand/minogasan_mark_white.png",
  favicon: "/detective/brand/favicon.png",
  favicon32: "/detective/brand/favicon_32.png",
  favicon180: "/detective/brand/favicon_180.png",
  favicon192: "/detective/brand/favicon_192.png",
  favicon512: "/detective/brand/favicon_512.png",
} as const;

/** 浮気調査（主軸）の内容要約 — JSON-LD用 */
export const detectiveMainService = {
  id: "infidelity",
  name: "浮気・不倫調査",
  priceLabel: `${tentOffice.minPrice}〜／定額${tentOffice.flatPlanTotal}`,
  priceNote: `${tentOffice.flatPlanTaxNote}・0円保証あり`,
  bullets: [
    "配偶者・パートナーの行動調査",
    "接触・密会の有無確認",
    "写真・動画による客観的証拠収集",
    "弁護士提出を想定した報告書作成",
  ],
} as const;

/** 他調査（従属・対応可）。料金は並記せずお見積り */
export const detectiveOtherServices = [
  {
    id: "stalking",
    name: "ストーカー調査",
    blurb: "つきまとい等の実態把握と、相談を見据えた記録",
  },
  {
    id: "bug",
    name: "盗聴・盗撮調査",
    blurb: "住居・車両などの機器確認と対処のアドバイス",
  },
  {
    id: "background",
    name: "婚前・素行調査",
    blurb: "交際相手や婚約者の生活実態の確認",
  },
  {
    id: "missing",
    name: "人探し・所在調査",
    blurb: "音信不通の方や大切な人の所在確認",
  },
] as const;
