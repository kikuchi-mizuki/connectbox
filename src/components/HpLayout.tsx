import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { COMPANY_NAME, LINE_URL, SITE_NAME } from "../constants";
import { lpServices } from "../data/services";
import CtaButton from "./CtaButton";

export default function HpLayout() {
  const { pathname } = useLocation();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 24);
      const hero = document.getElementById("page-hero");
      const finalCta = document.getElementById("final-cta");
      if (!hero || !finalCta) {
        setShowStickyCta(false);
        return;
      }
      const pastHero = hero.getBoundingClientRect().bottom < 64;
      const finalVisible =
        finalCta.getBoundingClientRect().top < window.innerHeight * 0.85;
      setShowStickyCta(pastHero && !finalVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="hp">
      <header className={`site-header${solid ? " is-solid" : ""}`}>
        <div className="site-header__inner">
          <Link className="brand-lockup" to="/">
            <img src="/tconnect-logo.png" alt="" width={56} height={56} />
            <span className="brand-lockup__name">{COMPANY_NAME}</span>
          </Link>

          <nav className="desk-nav" aria-label="メイン">
            <div className="nav-dropdown">
              <button type="button" className="nav-dropdown__btn">
                サービス
              </button>
              <div className="nav-dropdown__panel">
                {lpServices.map((s) => (
                  <Link key={s.slug} to={s.path}>
                    {s.name}
                    <span className="nav-dropdown__hint">案内</span>
                  </Link>
                ))}
                <Link to="/#services">すべて見る</Link>
              </div>
            </div>
            <NavLink to="/company">会社</NavLink>
          </nav>

          <div className="header-actions">
            <CtaButton className="header-cta btn--compact">15分で相談</CtaButton>
            <button
              type="button"
              className={`menu-btn${menuOpen ? " is-open" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="visually-hidden">メニュー</span>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <p className="mobile-menu__label">案内ページ</p>
        {lpServices.map((s) => (
          <Link key={s.slug} to={s.path}>
            {s.name}
          </Link>
        ))}
        <Link to="/#services">サービス一覧</Link>
        <Link to="/company">会社</Link>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
          LINEで15分相談する
        </a>
      </div>

      <Outlet />

      <div
        className={`sticky-cta${showStickyCta ? " sticky-cta--visible" : ""}`}
        aria-hidden={!showStickyCta}
      >
        <CtaButton className="btn--large sticky-cta__btn" />
      </div>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand-block">
            <span className="site-footer__service">{SITE_NAME}</span>
            <span className="site-footer__brand">{COMPANY_NAME}</span>
            <span className="site-footer__hint">
              サービスサイト ／ 案内: {lpServices.map((s) => s.name).join("・")}
            </span>
          </div>
          <nav className="site-footer__nav" aria-label="フッター">
            {lpServices.map((s) => (
              <Link key={s.slug} to={s.path}>
                {s.name}
              </Link>
            ))}
            <Link to="/#services">サービス一覧</Link>
            <Link to="/company">会社</Link>
          </nav>
          <span>© {new Date().getFullYear()} T-connect Inc.</span>
        </div>
      </footer>
    </div>
  );
}
