export const LINE_URL = "https://lin.ee/RBa333H";

/**
 * 探偵LP（/detective）の本番公開スイッチ。
 * false のあいだは本番ルートを閉じ、sitemap / プリレンダ対象からも外す。
 * 開発サーバー（vite）では常に閲覧可。再開するときは true に戻す。
 */
export const DETECTIVE_PAGE_PUBLIC = true;

/** 開発中、または本番公開時に /detective を表示する */
export const DETECTIVE_PAGE_ENABLED =
  DETECTIVE_PAGE_PUBLIC || import.meta.env.DEV;

/** 探偵事務所（ミノガサン）専用 LINE（広告専用URLに差し替える場合はここを変更） */
export const DETECTIVE_LINE_URL = "https://lin.ee/qr4Ccoc";

/** Microsoft Clarity（/detective のみ） */
export const DETECTIVE_CLARITY_ID = "zbvmrpjlf9";

/** 探偵事業の相談フォーム（同一LP内アンカー） */
export const DETECTIVE_FORM_URL = "/detective#det-contact";

/**
 * Googleフォーム送信先（迷惑メール対策・速度のため FormSubmit から移行）。
 * 回答通知は Googleフォーム側のメール通知設定で届く。
 */
export const DETECTIVE_GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfNZ9vd3mLl-asB10DHAk9S4dEhVJl__Oq88w_R4I6pSDFfUA/formResponse";
export const DETECTIVE_GOOGLE_FORM_ENTRIES = {
  name: "entry.2042912595",
  contact: "entry.1249970994",
  message: "entry.552276852",
} as const;

/** 探偵事務所の電話（表示用ハイフンなし） */
export const DETECTIVE_TEL = "08088081739";
export const DETECTIVE_TEL_DISPLAY = "080-8808-1739";
export const DETECTIVE_EMAIL = "m-tanaka@t-cnct.com";

export const SITE_NAME = "T-connect";
export const COMPANY_NAME = "株式会社T-connect";

/** Google Analytics 4 測定 ID */
export const GA_MEASUREMENT_ID = "G-DYNQ10WQV3";

/**
 * Google 広告（gtag）。未設定のときは GA4 イベントのみ送信。
 * 例: AW-XXXXXXXXX
 * コンバージョンラベル付き send_to は GOOGLE_ADS_CONV_* に設定。
 */
export const GOOGLE_ADS_ID = "";
/** LINEクリック用（例: AW-XXXXXXXXX/YYYYY） */
export const GOOGLE_ADS_CONV_LINE = "";
/** 電話クリック用（例: AW-XXXXXXXXX/ZZZZZ） */
export const GOOGLE_ADS_CONV_TEL = "";

/** 正規ドメイン（canonical / OGP 用） @see https://www.t-cnct.com/ */
export const SITE_URL = "https://www.t-cnct.com";

export function getSiteUrl() {
  return SITE_URL;
}

export const CONNECT_BOX_NAME = "Connect Box";
export const CONNECT_BOX_NAME_JA = "コネクトボックス";

/** Connect Box 問い合わせ */
export const CONNECT_BOX_LINE_URL = "https://lin.ee/RBa333H";
export const CONNECT_BOX_MEETING_URL =
  "https://timerex.net/s/t-tanaka_f957_ccee/2b993f18";
export const CONNECT_BOX_EMAIL = "m-tanaka@t-cnct.com";
export const CONNECT_BOX_TEL = "08088081739";
export const CONNECT_BOX_TEL_DISPLAY = "080-8808-1739";

/** サービス資料（リード獲得後にダウンロード） */
export const CONNECT_BOX_MATERIAL_URL = "/connect-box/materials/connect-box.pdf";
export const CONNECT_BOX_MATERIAL_FILENAME = "Connect_Box_サービス資料.pdf";
