import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { COMPANY_NAME, SITE_NAME } from "../constants";
import { getService } from "../data/services";
import CtaButton from "./CtaButton";
import "../lp.css";

export default function LpLayout() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const service = getService(slug);
  const [showStickyCta, setShowStickyCta] = useState(false);

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
    <div className={`lp lp--${slug ?? "default"}`}>
      <header className="lp-header">
        <div className="lp-header__inner">
          <Link className="lp-header__home" to="/">
            <img src="/tconnect-logo.png" alt="" width={40} height={40} />
            <span>
              <small>{SITE_NAME}</small>
              <strong>{service?.name ?? "案内"}</strong>
            </span>
          </Link>
          <div className="lp-header__actions">
            <Link className="lp-header__back" to="/">
              サービス一覧へ
            </Link>
            <CtaButton className="header-cta btn--compact">15分で相談</CtaButton>
          </div>
        </div>
      </header>

      <Outlet />

      <div
        className={`sticky-cta${showStickyCta ? " sticky-cta--visible" : ""}`}
        aria-hidden={!showStickyCta}
      >
        <CtaButton className="btn--large sticky-cta__btn">
          まずは15分、LINEで相談する
        </CtaButton>
      </div>

      <footer className="lp-footer">
        <div className="lp-footer__inner">
          <Link to="/">{SITE_NAME}（サービスサイト）</Link>
          <Link to="/company">会社情報</Link>
          <span>{COMPANY_NAME}</span>
        </div>
      </footer>
    </div>
  );
}
