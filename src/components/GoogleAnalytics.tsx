import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID } from "../constants";

/**
 * SPA のルート変更を GA4 の page_view として送信する。
 * 初回ロード分は index.html の gtag config では送らず、ここでまとめて送る。
 * document.title は各ページの usePageMeta 更新後に拾う。
 */
export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (typeof window.gtag !== "function") return;

      const pagePath = `${location.pathname}${location.search}`;
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pagePath,
        page_title: document.title,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
}
