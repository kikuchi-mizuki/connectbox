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
  counselorLabel: "女性の相談員",
  counselorRole: "ミノガサン探偵事務所 女性相談窓口",
  telDisplay: "080-8808-1739",
  email: "m-tanaka@t-cnct.com",
  address: company.address,
  postalCode: company.postalCode,

  /** 浮気・不倫調査（調査員2名・20時間・税込） */
  flatPlanTotal: "44万円",
  successDeposit: "15.4万円",
  successOnEvidence: "50.6万円",
  successTotalRange: "15.4〜66万円",
  hourlyRate: "25,000円",
  /** 一般的な事務所の総額イメージ（同条件の人件費目安） */
  marketTotalRange: "40〜50万円",
  compareSource: "業界で多い時間あたりの料金をもとにした総額の目安です。",

  identityCheckPrice: "10万円",
  identityCheckNote: "税込・報告書つき",

  licenseNumber: "30260207",
  licenseLabel: "探偵業届出番号：東京都公安委員会 第30260207号",
  licenseNote: "探偵業の業務の適正化に関する法律に基づき届出済みです。",

  successRateNote:
    "ご依頼に対して、証拠を確保できた割合です（提携調査チームの実績）。",

  privacyLabel: "プライバシーポリシー",
  privacyHref: "#privacy",
  privacyBody:
    "ご相談・調査に関する個人情報は、相談対応・調査・ご報告の目的以外に利用しません。ご本人の同意なく第三者へ提供しません。開示・訂正・削除のご要望は、上記メールまたはお電話にて受け付けます。",

  /** 資料「ご相談から報告までの流れ」より */
  cancelPolicy:
    "やめることができます。調査開始前は、事務手数料1.1万円を除いて返金。調査開始後は、実施した時間分を精算して返金します。費用の扱いの詳細は、ご契約前に書面でご説明します。",
} as const;
