import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isLineHref, trackLineClick, trackPageView } from "../lib/ga";

/**
 * 全ルート共通の GA4 計測。
 * - page_view: ルート変更ごと（タグの二重読込・自動 page_view は index.html で抑止）
 * - line_click: LINE CTA へのクリックをドキュメント委譲で捕捉（新規ページも自動対象）
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
      if (!isLineHref(hrefAttr) && !isLineHref(linkUrl)) return;

      const ctaText = (anchor.textContent ?? "").replace(/\s+/g, " ").trim();
      trackLineClick({
        page_path: `${window.location.pathname}${window.location.search}`,
        cta_text: ctaText.slice(0, 120),
        link_url: linkUrl,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
