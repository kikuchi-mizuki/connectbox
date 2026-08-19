import { COMPANY_NAME, LINE_URL, SITE_NAME } from "../constants";

/** 会社概要。事実が揃うまでのダミー。差し替え前提。 */
export const company = {
  isDummy: true,
  legalName: COMPANY_NAME,
  serviceName: SITE_NAME,
  englishName: "T-connect Inc.",
  representativeTitle: "代表取締役",
  representative: "菊地 瑞樹",
  founded: "2020年4月1日",
  capital: "300万円",
  employees: "8名（業務委託含む）",
  postalCode: "〒150-0001",
  address: "東京都渋谷区神宮前1-2-3 T-connectビル 4F",
  access: "JR山手線「原宿」駅 徒歩8分／東京メトロ「明治神宮前」駅 徒歩6分",
  tel: "03-1234-5678",
  fax: "03-1234-5679",
  email: "hello@t-connect.example",
  website: "https://connect-box.example",
  hours: "平日 10:00–18:00（土日祝休み）",
  invoiceNumber: "T1234567890123",
  bank: "三菱UFJ銀行 渋谷支店",
  business:
    "バックオフィス、LogTrack（出張旅費・移動ログ管理）、WEBマーケ、採用・人事、組織コーチング、経営戦略、既存事業ブラッシュアップの各領域における業務支援。",
  lineUrl: LINE_URL,
};
