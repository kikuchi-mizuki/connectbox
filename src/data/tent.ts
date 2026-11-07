import { company } from "./company";

/** ミノガサン探偵事務所（見逃さん） */
export const tentOffice = {
  name: "ミノガサン探偵事務所",
  nameEn: "MINOGASAN",
  legalNote: "株式会社T-connect",
  tagline: "浮気・不倫を見逃さん。ミノガサン探偵事務所",
  message:
    "小さな違和感も、怪しい動きも、見逃さない。あなたの隣で事実を確かめる場所でありたい。",
  counselorName: "田中 瑞貴",
  counselorRole: "ミノガサン探偵事務所 女性相談窓口",
  telDisplay: "080-8808-1739",
  email: "m-tanaka@t-cnct.com",
  /** 面談・登記住所（会社情報と同一） */
  address: company.address,
  postalCode: company.postalCode,
  /**
   * 探偵業届出番号は虚偽掲載を避けるため、公開番号が確定するまで
   * 「届出済み／番号は契約前書面で確認」と表記する。
   */
  licenseLabel: "探偵業法に基づき届出済み（東京都公安委員会）",
  licenseNote: "届出番号はご契約前の書面にてご確認いただけます。",
  /** 成功率の定義 */
  successRateNote:
    "調査を完了した案件のうち、ご依頼内容に対応する証拠資料をお渡しできた割合です（当社集計）。",
  privacyLabel: "プライバシーポリシー",
  privacyHref: "#privacy",
  privacyBody:
    "ご相談・調査に関する個人情報は、相談対応・調査・ご報告の目的以外に利用しません。ご本人の同意なく第三者へ提供しません。開示・訂正・削除のご要望は、上記メールまたはお電話にて受け付けます。",
  cancelPolicy:
    "調査開始後の中止は可能です。発生済み費用の扱いはご契約時の書面に従います。",
} as const;
