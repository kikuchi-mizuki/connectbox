/** Connect Box ページ用（営業資料ベース） */

export const connectBoxBrand = {
  name: "Connect Box",
  nameWithDot: "Connect Box.",
  concept: "企業と人のあらゆる課題を、ひとつの窓口で",
  conceptShort: "企業のあらゆる課題を、一つの窓口で。",
  servicesLead: "外部経営チームをあなたの企業へ",
  servicesNote: "業務の一部分だけでも外注・依頼可能",
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
  {
    n: "04",
    name: "研修",
    note: "入社研修から幹部研修まで",
  },
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
  {
    n: "11",
    name: "システム・アプリ開発",
    note: "保守も可",
  },
  { n: "12", name: "動画制作" },
];

export type ConnectBoxCase = {
  id: string;
  label: string;
  challenges: string[];
  supports: { label: string; tone: "navy" | "orange" }[];
};

export const connectBoxCases: ConnectBoxCase[] = [
  {
    id: "01",
    label: "15〜30名規模",
    challenges: ["採用できない", "人事担当者がいない", "WEB集客が弱い"],
    supports: [
      { label: "人事支援", tone: "navy" },
      { label: "採用代行", tone: "orange" },
      { label: "WEB制作", tone: "navy" },
      { label: "SEO・AIO対策", tone: "orange" },
    ],
  },
  {
    id: "02",
    label: "100名規模",
    challenges: [
      "バックオフィスコストが高い",
      "経費削減したい",
      "業務効率化したい",
      "新人の定着が悪い",
    ],
    supports: [
      { label: "業務システム開発", tone: "navy" },
      { label: "事務業務外注", tone: "navy" },
      { label: "旅費One", tone: "orange" },
      { label: "新人研修", tone: "orange" },
    ],
  },
  {
    id: "03",
    label: "成長中のベンチャー企業",
    challenges: [
      "売り上げを伸ばしたい",
      "新規事業を考えてほしい",
      "営業組織を採用し、強化したい",
      "組織制度を整え、文化形成したい",
    ],
    supports: [
      { label: "採用支援", tone: "navy" },
      { label: "営業研修", tone: "navy" },
      { label: "組織コンサルティング", tone: "orange" },
      { label: "経営戦略支援", tone: "orange" },
    ],
  },
  {
    id: "04",
    label: "管理業務の属人化が進む企業",
    challenges: ["管理業務の属人化"],
    supports: [{ label: "事務外注", tone: "navy" }],
  },
];

export const connectBoxPrice = {
  amount: "月額20万円〜",
  note: "初期費用は一切いただきません。",
} as const;

export const connectBoxBenefits = [
  {
    n: "01",
    title: "人件費を抑えられる",
    body: "採用・教育のリードタイムをかけずに、専門人材を必要な期間だけ活用できます。",
  },
  {
    n: "02",
    title: "管理の手間が減る",
    body: "バラバラだった委託先をひとつに集約。契約・調整・品質管理の負担がなくなります。",
  },
  {
    n: "03",
    title: "すぐ動き出せる",
    body: "「やりたいのに人がいない」を解消。プロのチームがすぐに稼働を始めます。",
  },
  {
    n: "04",
    title: "改善まで提案します",
    body: "診断・戦略立案から業務・採用・制作開発の実行まで行います。",
  },
  {
    n: "05",
    title: "成果が数字に残る",
    body: "効果検証と改善のサイクルを回し続け、支援内容を「成果」まで昇華させます。",
  },
  {
    n: "06",
    title: "カスタマイズ可能",
    body: "会社の規模・フェーズが変わっても、必要な支援だけを柔軟に組み替えられます。",
  },
] as const;

export const connectBoxClosing =
  "すべてを「自社で抱える」時代は終わりに。必要なのは、必要な分だけ。" as const;

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
