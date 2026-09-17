/** Connect Box ページ用（短いHP構成） */

export const connectBoxBrand = {
  name: "Connect Box",
  nameWithDot: "Connect Box.",
  logoSrc: "/connect-box/logo.png?v=2",
  logoWhiteSrc: "/connect-box/logo-white.png?v=2",
  concept: "企業と人の課題解決をひとつの窓口で",
  conceptShort: "企業と人の課題解決をひとつの窓口で。",
  servicesLead: "外部経営チームをあなたの企業へ",
  servicesNote: "業務の一部分だけでも外注・依頼可能。課題に合わせて組み合わせできます。",
} as const;

export type ConnectBoxCatalogItem = {
  n: string;
  name: string;
  note?: string;
  path?: string;
  status?: "coming_soon";
};

/** 支援サービス一覧（資料の12項目） */
export const connectBoxCatalog: ConnectBoxCatalogItem[] = [
  { n: "01", name: "バックオフィス業務代行", path: "/connect-box/back-office" },
  { n: "02", name: "人事コンサル" },
  { n: "03", name: "採用コンサル" },
  { n: "04", name: "研修", note: "入社研修から幹部研修まで" },
  { n: "05", name: "営業コンサル" },
  { n: "06", name: "組織コンサル" },
  { n: "07", name: "経営戦略" },
  {
    n: "08",
    name: "旅費One",
    note: "旅費規定アプリにて経費削減",
    path: "/connect-box/ryohi-one",
    status: "coming_soon",
  },
  { n: "09", name: "WEB制作・デザイン" },
  { n: "10", name: "SEO・AIO対策" },
  { n: "11", name: "システム・アプリ開発", note: "保守も可" },
  { n: "12", name: "動画制作" },
];

export const connectBoxPrice = {
  amount: "月額20万円〜",
  note: "初期費用は一切いただきません。",
} as const;

/** 資料のケース（1・2・4）※表示番号は通し */
export const connectBoxCases = [
  {
    n: "01",
    label: "15〜30名規模",
    challenges: ["採用できない", "人事担当者がいない", "WEB集客が弱い"],
    supports: ["人事支援", "採用代行", "WEB制作", "SEO・AIO対策"],
  },
  {
    n: "02",
    label: "100名規模",
    challenges: [
      "バックオフィスコストが高い",
      "経費削減したい",
      "業務効率化したい",
      "新人の定着が悪い",
    ],
    supports: ["業務システム開発", "事務業務外注", "旅費One", "新人研修"],
  },
  {
    n: "03",
    label: "管理業務の属人化が進む企業",
    challenges: ["管理業務の属人化"],
    supports: ["事務外注"],
  },
] as const;

export const connectBoxContacts = [
  {
    id: "line",
    title: "公式LINE",
    sub: "チャットで簡単に相談",
    hrefKey: "line" as const,
  },
  {
    id: "meeting",
    title: "オンライン相談",
    sub: "カレンダーから日程調整",
    hrefKey: "meeting" as const,
  },
  {
    id: "email",
    title: "メール",
    sub: "メールでご相談",
    hrefKey: "email" as const,
  },
] as const;
