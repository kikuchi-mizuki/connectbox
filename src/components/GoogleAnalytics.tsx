import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  isEmailHref,
  isLineHref,
  isScheduleHref,
  resolveCtaPosition,
  trackEmailClick,
  trackLineClick,
  trackPageView,
  trackScheduleClick,
} from "../lib/ga";

/**
 * 全ルート共通の GA4 計測。
 * - page_view: ルート変更ごと（自動 page_view は index.html で抑止）
 * - line_click / schedule_click / email_click: ドキュメント委譲
 */
export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    const pagePath = `${location.pathname}${location.search}`;

    // usePageMeta による title 更新後に送る。StrictMode の二重 effect は cleanup で打ち消す。
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      trackPageView(pagePath, document.title);
    }, 50);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const hrefAttr = anchor.getAttribute("href");
      const linkUrl = anchor.href || hrefAttr || "";
      const pagePath = `${window.location.pathname}${window.location.search}`;
      const ctaText = (anchor.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 120);
      const ctaPosition = resolveCtaPosition(anchor);
      const params = {
        page_path: pagePath,
        cta_position: ctaPosition,
        cta_text: ctaText,
        link_url: linkUrl,
      };

      if (isLineHref(hrefAttr) || isLineHref(linkUrl)) {
        trackLineClick(params);
        return;
      }
      if (isScheduleHref(hrefAttr) || isScheduleHref(linkUrl)) {
        trackScheduleClick(params);
        return;
      }
      if (isEmailHref(hrefAttr) || isEmailHref(linkUrl)) {
        trackEmailClick(params);
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
