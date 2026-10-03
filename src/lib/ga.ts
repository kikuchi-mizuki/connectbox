import { GA_MEASUREMENT_ID } from "../constants";

function isGtagReady() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

type ClickParams = {
  page_path: string;
  cta_position: string;
  cta_text: string;
  link_url: string;
};

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
  window.gtag("event", "line_click", {
    page_path: params.page_path,
    page_location: window.location.href,
    cta_position: params.cta_position,
    cta_text: params.cta_text,
    link_url: params.link_url,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackScheduleClick(params: ClickParams) {
  if (!isGtagReady()) return;
  window.gtag("event", "schedule_click", {
    page_path: params.page_path,
    page_location: window.location.href,
    cta_position: params.cta_position,
    cta_text: params.cta_text,
    link_url: params.link_url,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackEmailClick(params: ClickParams) {
  if (!isGtagReady()) return;
  window.gtag("event", "email_click", {
    page_path: params.page_path,
    page_location: window.location.href,
    cta_position: params.cta_position,
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
  if (
    el.closest(
      "#final-cta, .final-cta, #det-final-cta, .det-final, footer, .site-footer, .lp-footer",
    )
  ) {
    return "footer";
  }
  if (
    el.closest(
      "#page-hero, .hero, .cb-hero, .det-hero, .top-hero, .lt-hero, .bo-hero",
    )
  ) {
    return "hero";
  }
  if (el.closest("#download, .cb-download, .cb-lead-form")) return "download";
  return "content";
}
