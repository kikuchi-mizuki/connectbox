import {
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_CONV_LINE,
  GOOGLE_ADS_CONV_TEL,
  GOOGLE_ADS_ID,
} from "../constants";

function isGtagReady() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

function isDetectivePath(pathname = window.location.pathname) {
  return pathname === "/detective" || pathname.startsWith("/detective/");
}

function isConnectBoxPath(pathname = window.location.pathname) {
  return (
    pathname === "/connect-box" || pathname.startsWith("/connect-box/")
  );
}

type ClickParams = {
  page_path: string;
  cta_position: string;
  cta_text: string;
  link_url: string;
  utm_term?: string;
};

type LeadParams = Record<string, string>;

/** GA4 へイベント送信（常に測定IDを指定） */
function sendGaEvent(name: string, params: Record<string, string | undefined>) {
  if (!isGtagReady()) return;
  window.gtag("event", name, {
    ...params,
    send_to: GA_MEASUREMENT_ID,
  });
}

function readUtmTerm(explicit?: string) {
  if (explicit) return explicit;
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("utm_term") ?? "";
}

function withUtm(params: ClickParams) {
  return {
    ...params,
    utm_term: readUtmTerm(params.utm_term),
  };
}

/** Google 広告タグを一度だけ config */
let adsConfigured = false;
export function ensureGoogleAdsConfig() {
  if (adsConfigured || !GOOGLE_ADS_ID || !isGtagReady()) return;
  window.gtag("config", GOOGLE_ADS_ID);
  adsConfigured = true;
}

function sendAdsConversion(
  sendTo: string,
  params: { cta_position: string; utm_term: string; link_url: string },
) {
  if (!sendTo || !isGtagReady()) return;
  ensureGoogleAdsConfig();
  window.gtag("event", "conversion", {
    send_to: sendTo,
    cta_position: params.cta_position,
    utm_term: params.utm_term,
    link_url: params.link_url,
  });
}

/** SPA の page_view（index.html 側は send_page_view: false） */
export function trackPageView(pagePath: string, pageTitle: string) {
  if (!isGtagReady()) return;
  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: `${window.location.origin}${pagePath}`,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackLineClick(params: ClickParams) {
  if (!isGtagReady()) return;
  const p = withUtm(params);
  const payload = {
    page_path: p.page_path,
    page_location: window.location.href,
    cta_position: p.cta_position,
    cta_text: p.cta_text,
    link_url: p.link_url,
    utm_term: p.utm_term,
  };
  sendGaEvent("line_click", payload);
  if (isDetectivePath()) {
    sendGaEvent("detective_line_click", payload);
  } else if (isConnectBoxPath()) {
    sendGaEvent("cb_line_click", payload);
  }
  sendAdsConversion(GOOGLE_ADS_CONV_LINE, {
    cta_position: p.cta_position,
    utm_term: p.utm_term,
    link_url: p.link_url,
  });
}

export function trackScheduleClick(params: ClickParams) {
  if (!isGtagReady()) return;
  const p = withUtm(params);
  sendGaEvent("schedule_click", {
    page_path: p.page_path,
    page_location: window.location.href,
    cta_position: p.cta_position,
    cta_text: p.cta_text,
    link_url: p.link_url,
    utm_term: p.utm_term,
  });
}

export function trackEmailClick(params: ClickParams) {
  if (!isGtagReady()) return;
  const p = withUtm(params);
  const payload = {
    page_path: p.page_path,
    page_location: window.location.href,
    cta_position: p.cta_position,
    cta_text: p.cta_text,
    link_url: p.link_url,
    utm_term: p.utm_term,
  };
  sendGaEvent("email_click", payload);
  if (isConnectBoxPath()) {
    sendGaEvent("cb_email_click", payload);
  }
}

export function trackTelClick(params: ClickParams) {
  if (!isGtagReady()) return;
  const p = withUtm(params);
  const payload = {
    page_path: p.page_path,
    page_location: window.location.href,
    cta_position: p.cta_position,
    cta_text: p.cta_text,
    link_url: p.link_url,
    utm_term: p.utm_term,
  };
  sendGaEvent("tel_click", payload);
  if (isDetectivePath()) {
    sendGaEvent("detective_tel_click", payload);
  } else if (isConnectBoxPath()) {
    sendGaEvent("cb_tel_click", payload);
  }
  sendAdsConversion(GOOGLE_ADS_CONV_TEL, {
    cta_position: p.cta_position,
    utm_term: p.utm_term,
    link_url: p.link_url,
  });
}

/**
 * 問い合わせフォーム送信が正常完了したときのみ呼ぶ。
 * 送信ボタンのクリックだけでは発火させないこと。
 */
export function trackGenerateLead(params?: LeadParams) {
  sendGaEvent("generate_lead", params ?? {});
}

/** 探偵LP（/detective）相談フォーム送信成功時。generate_lead と併せて送る。 */
export function trackDetectiveFormSubmit(params?: LeadParams) {
  sendGaEvent("detective_form_submit", {
    lead_source: "detective_form",
    page_path: window.location.pathname,
    cta_position: "form",
    ...params,
  });
}

/** Connect Box 資料ダウンロード送信成功時。generate_lead と併せて送る。 */
export function trackCbMaterialDownload(params?: LeadParams) {
  sendGaEvent("cb_material_download", {
    lead_source: "connect_box_material",
    page_path: `${window.location.pathname}${window.location.search}`,
    cta_position: "download",
    ...params,
  });
}

/** Connect Box 無料トライアル／お問い合わせ送信成功時。generate_lead と併せて送る。 */
export function trackCbInquirySubmit(params?: LeadParams) {
  sendGaEvent("cb_inquiry_submit", {
    lead_source: "connect_box_inquiry",
    page_path: `${window.location.pathname}${window.location.search}`,
    cta_position: "inquiry_form",
    ...params,
  });
}

export function isLineHref(href: string | null | undefined): boolean {
  if (!href) return false;
  try {
    const url = new URL(href, window.location.origin);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    return host === "lin.ee" || host === "line.me" || host.endsWith(".line.me");
  } catch {
    return href.includes("lin.ee/") || href.includes("line.me/");
  }
}

export function isScheduleHref(href: string | null | undefined): boolean {
  if (!href) return false;
  try {
    const url = new URL(href, window.location.origin);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    return host === "timerex.net" || host.endsWith(".timerex.net");
  } catch {
    return href.includes("timerex.net/");
  }
}

export function isEmailHref(href: string | null | undefined): boolean {
  if (!href) return false;
  return href.trim().toLowerCase().startsWith("mailto:");
}

export function isTelHref(href: string | null | undefined): boolean {
  if (!href) return false;
  return href.trim().toLowerCase().startsWith("tel:");
}

/** ボタン位置。data-cta-position 優先、なければ周辺DOMから推定 */
export function resolveCtaPosition(el: Element): string {
  const explicit = el
    .closest("[data-cta-position]")
    ?.getAttribute("data-cta-position");
  if (explicit) return explicit;

  if (el.closest(".sticky-cta, .det-sticky")) return "sticky";
  if (
    el.closest(
      "header, .site-header, .lp-header, .det-bar, .det-header",
    )
  ) {
    return "header";
  }
  if (el.closest("#det-price, .det-price")) return "price";
  if (
    el.closest(
      "#final-cta, .final-cta, #det-final-cta, .det-final, footer, .site-footer, .lp-footer",
    )
  ) {
    return "footer";
  }
  if (
    el.closest(
      "#page-hero, #det-hero, .hero, .cb-hero, .det-hero, .top-hero, .lt-hero, .bo-hero",
    )
  ) {
    return "fv";
  }
  if (el.closest("#download, .cb-download, .cb-lead-form")) return "download";
  return "content";
}
