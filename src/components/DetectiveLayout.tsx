import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DETECTIVE_FORM_URL, LINE_URL } from "../constants";
import "../detective.css";

function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.15em" height="1.15em" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.253 2 1.5 5.798 1.5 10.5c0 4.21 3.743 7.74 8.782 8.418.342.074.806.226.923.411.107.17.07.436.034.61l-.154.943c-.05.278-.224 1.088.953.593 1.178-.496 6.314-3.718 8.612-6.362C22.289 13.006 22.5 11.79 22.5 10.5 22.5 5.798 17.747 2 12 2z"
      />
    </svg>
  );
}

export default function DetectiveLayout() {
  const { pathname } = useLocation();
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const id = "det-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Shippori+Mincho:wght@500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("det-hero");
      const finalCta = document.getElementById("det-final-cta");
      if (!hero || !finalCta) {
        setShowSticky(false);
        return;
      }
      const pastHero = hero.getBoundingClientRect().bottom < 72;
      const finalVisible =
        finalCta.getBoundingClientRect().top < window.innerHeight * 0.88;
      setShowSticky(pastHero && !finalVisible);
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
    <div className="det">
      <header className="det-header">
        <div className="det-header__inner">
          <a className="det-header__brand" href="#det-hero">
            <span className="det-header__mark">Confidential Consultation</span>
            <strong>不貞調査のご相談</strong>
          </a>
          <div className="det-header__actions">
            <a className="det-btn det-btn--line" href={LINE_URL} target="_blank" rel="noopener noreferrer">
              <LineIcon />
              LINE相談
            </a>
            <a
              className="det-header__form"
              href={DETECTIVE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              フォーム
            </a>
          </div>
        </div>
      </header>

      <Outlet />

      <div
        className={`det-sticky${showSticky ? " is-visible" : ""}`}
        aria-hidden={!showSticky}
      >
        <p className="det-sticky__label">秘密厳守｜まずは無料でご相談ください</p>
        <div className="det-sticky__btns">
          <a className="det-btn det-btn--line" href={LINE_URL} target="_blank" rel="noopener noreferrer">
            <LineIcon />
            LINEで相談
          </a>
          <a
            className="det-btn det-btn--outline"
            href={DETECTIVE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            フォームで相談
          </a>
        </div>
      </div>

      <footer className="det-footer">
        <div className="det-footer__inner">
          <p>秘密厳守｜無料相談受付</p>
          <span>© {new Date().getFullYear()} Detective Consultation</span>
        </div>
      </footer>
    </div>
  );
}
