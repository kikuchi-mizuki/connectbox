import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { COMPANY_NAME } from "../constants";
import { businesses } from "../data/businesses";

export default function HpLayout() {
  const { pathname } = useLocation();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <span className="brand-lockup__name">T-connect</span>
          </Link>

          <nav className="desk-nav" aria-label="メイン">
            <div className="nav-dropdown">
              <button type="button" className="nav-dropdown__btn">
                事業一覧
              </button>
              <div className="nav-dropdown__panel">
                {businesses.map((b) => (
                  <Link key={b.slug} to={b.path}>
                    {b.name}
                    {b.status === "preparing" && (
                      <span className="nav-dropdown__badge">準備中</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            <NavLink to="/company">会社</NavLink>
          </nav>

          <div className="header-actions">
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
        <p className="mobile-menu__label">事業一覧</p>
        {businesses.map((b) => (
          <Link key={b.slug} to={b.path}>
            {b.name}
            {b.status === "preparing" && " （準備中）"}
          </Link>
        ))}
        <Link to="/company">会社</Link>
      </div>

      <Outlet />

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand-block">
            <span className="site-footer__service">T-connect</span>
            <span className="site-footer__brand">{COMPANY_NAME}</span>
          </div>
          <nav className="site-footer__nav" aria-label="フッター">
            {businesses.map((b) => (
              <Link key={b.slug} to={b.path}>
                {b.name}
              </Link>
            ))}
            <Link to="/company">会社</Link>
          </nav>
          <span>© {new Date().getFullYear()} T-connect Inc.</span>
        </div>
      </footer>
    </div>
  );
}
