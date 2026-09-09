import { GA_MEASUREMENT_ID, LINE_URL } from "../constants";

function isGtagReady() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
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

export function trackLineClick(params: {
  page_path: string;
  cta_text: string;
  link_url: string;
}) {
  if (!isGtagReady()) return;
  window.gtag("event", "line_click", {
    page_path: params.page_path,
    page_location: window.location.href,
    cta_text: params.cta_text,
    link_url: params.link_url,
    send_to: GA_MEASUREMENT_ID,
  });
}

/**
 * 問い合わせフォーム送信が正常完了したときのみ呼ぶ。
 * 送信ボタンのクリックだけでは発火させないこと。
 */
export function trackGenerateLead(params?: Record<string, string>) {
  if (!isGtagReady()) return;
  window.gtag("event", "generate_lead", {
    ...params,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function isLineHref(href: string | null | undefined): boolean {
  if (!href) return false;
  try {
    const url = new URL(href, window.location.origin);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    if (host === "lin.ee" || host === "line.me" || host.endsWith(".line.me")) {
      return true;
    }
    return url.href === LINE_URL || url.href.startsWith(`${LINE_URL}`);
  } catch {
    return href.includes("lin.ee/") || href.includes("line.me/");
  }
}
