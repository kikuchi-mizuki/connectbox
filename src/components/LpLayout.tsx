import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { COMPANY_NAME } from "../constants";
import { getService } from "../data/services";
import "../lp.css";

export default function LpLayout() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const service = getService(slug);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const isAdsLp = pathname.startsWith("/connect-box/ads/");
  const ctaLabel =
    isAdsLp && slug === "back-office"
      ? "2週間無料で試す"
      : "相談方法を見る";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("page-hero");
      const finalCta = document.getElementById("final-cta");
      if (!hero || !finalCta) {
        setShowStickyCta(false);
        return;
      }
      const heroRect = hero.getBoundingClientRect();
      const finalRect = finalCta.getBoundingClientRect();
      const pastHero = heroRect.bottom < 64;
      const finalVisible = finalRect.top < window.innerHeight * 0.85;
      setShowStickyCta(pastHero && !finalVisible);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <div
      className={[
        "lp",
        `lp--${slug ?? "default"}`,
        isAdsLp ? "lp--ads" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="lp-header">
        <div className="lp-header__inner">
          <Link className="lp-header__home" to="/">
            <img src="/tconnect-logo.png?v=11" alt="" width={40} height={40} />
            <span>
              <small>{COMPANY_NAME}</small>
              <strong>{service?.name ?? "案内"}</strong>
            </span>
          </Link>
          <div className="lp-header__actions">
            {!isAdsLp ? (
              <Link className="lp-header__back" to="/connect-box">
                Connect Boxへ
              </Link>
            ) : null}
            <a
              className="btn btn--primary btn--compact header-cta"
              href="#final-cta"
              data-cta-position="header"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </header>

      <Outlet />

      <div
        className={`sticky-cta${showStickyCta ? " sticky-cta--visible" : ""}`}
        aria-hidden={!showStickyCta}
      >
        <a
          className="btn btn--primary btn--large sticky-cta__btn"
          href="#final-cta"
          data-cta-position="sticky"
        >
          {ctaLabel}
        </a>
      </div>

      <footer className="lp-footer">
        <div className="lp-footer__inner">
          <Link to="/">{COMPANY_NAME}（サービスサイト）</Link>
          <Link to="/company">会社情報</Link>
          <span>{COMPANY_NAME}</span>
        </div>
      </footer>
    </div>
  );
}
