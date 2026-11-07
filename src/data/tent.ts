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
  /** 浮気調査の最低価格（税別） */
  minPriceLabel: "10万円",
  /**
   * 探偵業届出番号は虚偽掲載を避けるため、公開番号が確定するまで
   * 「届出済み／番号は契約前書面で確認」と表記する。
   */
  licenseLabel: "探偵業法に基づき届出済み（東京都公安委員会）",
  licenseNote: "届出番号はご契約前の書面にてご確認いただけます。",
  /**
   * 97.5%は提携調査会社の実績。期間・件数の確定値が揃い次第、
   * successRatePeriod を差し替えて注記を完成させる。
   */
  successRatePeriod:
    "提携調査会社の集計（期間・対象件数はご契約前の書面で明示）",
  successRateNote:
    "提携調査会社の調査完了案件のうち、ご依頼内容に対応する証拠資料をお渡しできた割合です。当社の探偵事業単独の実績ではありません。",
  privacyLabel: "プライバシーポリシー",
  privacyHref: "#privacy",
  privacyBody:
    "ご相談・調査に関する個人情報は、相談対応・調査・ご報告の目的以外に利用しません。ご本人の同意なく第三者へ提供しません。開示・訂正・削除のご要望は、上記メールまたはお電話にて受け付けます。",
  cancelPolicy:
    "調査開始後の中止は可能です。中止時点までに発生した調査費用・実費の扱いは、ご契約時の書面に従います。「証拠が取れなければ全額返金」は、調査を完了しても証拠が取れなかった場合の条件であり、途中解約とは別です。",
} as const;
