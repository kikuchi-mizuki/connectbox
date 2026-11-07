import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  DETECTIVE_LINE_URL,
  DETECTIVE_TEL,
  DETECTIVE_TEL_DISPLAY,
} from "../constants";
import { tentOffice } from "../data/tent";
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
      "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Shippori+Mincho:wght@500;600&display=swap";
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
      const pastHero = hero.getBoundingClientRect().bottom < 8;
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
            <span className="det-header__mark">{tentOffice.nameEn}</span>
            <strong>{tentOffice.name}</strong>
          </a>
          <div className="det-header__actions">
            <a
              className="det-btn det-btn--line"
              href={DETECTIVE_LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-position="header"
            >
              <LineIcon />
              <span className="det-header__line-label">LINEで無料相談</span>
            </a>
            <a
              className="det-btn det-btn--tel"
              href={`tel:${DETECTIVE_TEL}`}
              data-cta-position="header"
            >
              電話
            </a>
          </div>
        </div>
      </header>

      <Outlet />

      <div
        className={`det-sticky${showSticky ? " is-visible" : ""}`}
        aria-hidden={!showSticky}
      >
        <a
          className="det-sticky__line"
          href={DETECTIVE_LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-position="sticky"
        >
          <LineIcon />
          LINEで無料相談
        </a>
        <a
          className="det-sticky__tel"
          href={`tel:${DETECTIVE_TEL}`}
          data-cta-position="sticky"
        >
          電話
          <span>{DETECTIVE_TEL_DISPLAY}</span>
        </a>
      </div>

      <footer className="det-footer">
        <div className="det-footer__inner">
          <p className="det-footer__org">
            株式会社T-connect {tentOffice.name}
          </p>
          <p>{tentOffice.licenseLabel}</p>
          <p className="det-footer__sub">{tentOffice.licenseNote}</p>
          <p>
            面談場所：{tentOffice.postalCode} {tentOffice.address}
          </p>
          <p>
            TEL{" "}
            <a href={`tel:${DETECTIVE_TEL}`} data-cta-position="footer">
              {DETECTIVE_TEL_DISPLAY}
            </a>
            {" ／ "}
            <a href={`mailto:${tentOffice.email}`}>{tentOffice.email}</a>
          </p>
          <p>
            <a href={tentOffice.privacyHref}>{tentOffice.privacyLabel}</a>
          </p>
          <div className="det-footer__privacy" id="privacy">
            <strong>{tentOffice.privacyLabel}</strong>
            <p>{tentOffice.privacyBody}</p>
          </div>
          <span className="det-footer__copy">
            © {new Date().getFullYear()} {tentOffice.name} / {tentOffice.legalNote}
          </span>
        </div>
      </footer>
    </div>
  );
}
