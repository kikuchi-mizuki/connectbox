import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import {
  CONNECT_BOX_EMAIL,
  CONNECT_BOX_LINE_URL,
  CONNECT_BOX_MEETING_URL,
} from "../../constants";
import {
  connectBoxBrand,
  connectBoxCases,
  connectBoxCatalog,
  connectBoxContacts,
  connectBoxPrice,
} from "../../data/connectBox";
import { usePageMeta } from "../../hooks/usePageMeta";

const contactHrefs = {
  line: CONNECT_BOX_LINE_URL,
  meeting: CONNECT_BOX_MEETING_URL,
  email: `mailto:${CONNECT_BOX_EMAIL}`,
} as const;

function scrollToContact(smooth: boolean) {
  document.getElementById("final-cta")?.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block: "start",
  });
}

export default function ConnectBoxPage() {
  const reduce = useReducedMotion();
  const caseGridRef = useRef<HTMLOListElement>(null);
  const caseCtaRef = useRef<HTMLLIElement>(null);

  usePageMeta({
    title: "Connect Box｜企業と人の課題解決をひとつの窓口で",
    description:
      "Connect Box（コネクトボックス）。いらない作業は手放す。そこから、時間が生まれる。企業と人の課題解決をひとつの窓口で。",
    keywords:
      "Connect Box,コネクトボックス,BPO,バックオフィス代行,旅費One,外部経営チーム,業務委託,T-connect",
    path: "/connect-box",
  });

  useEffect(() => {
    const grid = caseGridRef.current;
    const cta = caseCtaRef.current;
    if (!grid || !cta) return;

    let locked = false;
    let dwellTimer: number | undefined;
    let wheelAcc = 0;

    const clearDwell = () => {
      if (dwellTimer !== undefined) {
        window.clearTimeout(dwellTimer);
        dwellTimer = undefined;
      }
    };

    const go = () => {
      if (locked) return;
      locked = true;
      clearDwell();
      wheelAcc = 0;
      scrollToContact(!reduce);
      window.setTimeout(() => {
        locked = false;
      }, 2200);
    };

    const scheduleGo = () => {
      if (locked || dwellTimer !== undefined) return;
      dwellTimer = window.setTimeout(() => {
        dwellTimer = undefined;
        go();
      }, 1100);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && entry.intersectionRatio >= 0.9) {
          scheduleGo();
        } else {
          clearDwell();
          wheelAcc = 0;
        }
      },
      { root: grid, threshold: [0.5, 0.75, 0.9, 1] },
    );
    io.observe(cta);

    const onWheel = (e: WheelEvent) => {
      const atEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 6;
      if (!atEnd || e.deltaY <= 0) {
        wheelAcc = 0;
        return;
      }
      e.preventDefault();
      wheelAcc += e.deltaY;
      if (wheelAcc > 180) scheduleGo();
    };
    grid.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      clearDwell();
      io.disconnect();
      grid.removeEventListener("wheel", onWheel);
    };
  }, [reduce]);

  return (
    <main>
      <section className="cb-hero" id="page-hero" aria-label="メインビジュアル">
        <div className="cb-hero__panels" aria-hidden="true">
          <div className="cb-hero__panel cb-hero__panel--grad" />
        </div>
        <div className="cb-hero__inner">
          <div className="cb-hero__copy">
            <motion.p
              className="cb-logo"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={connectBoxBrand.logoWhiteSrc}
                alt={connectBoxBrand.nameWithDot}
                width={448}
                height={96}
              />
            </motion.p>
            <motion.h1
              className="cb-hero__title"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              いらない作業は手放す。
              <br />
              そこから、時間が生まれる。
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="services-title">
        <FadeIn className="section__inner">
          <h2 className="section__title" id="services-title">
            支援サービス一覧
          </h2>
          <p className="section__lead">
            外部経営チームをあなたの企業へ。
            <br />
            業務の一部分だけでも外注・依頼可能。
            <br />
            課題に合わせて組み合わせできます。
          </p>
          <ul className="cb-service-grid">
            {connectBoxCatalog.map((item) => {
              const inner = (
                <>
                  <span className="cb-service-item__n">{item.n}</span>
                  <span className="cb-service-item__body">
                    <strong>{item.name}</strong>
                    {item.note ? (
                      <span className="cb-service-item__note">{item.note}</span>
                    ) : null}
                    {item.status === "coming_soon" ? (
                      <span className="biz-card__badge">リリース前</span>
                    ) : null}
                  </span>
                  {item.path ? (
                    <span className="cb-service-item__more">
                      {item.status === "coming_soon" ? "事前案内" : "詳しく"}
                    </span>
                  ) : null}
                </>
              );

              return (
                <li key={item.n}>
                  {item.path ? (
                    <Link className="cb-service-item cb-service-item--link" to={item.path}>
                      {inner}
                    </Link>
                  ) : (
                    <div className="cb-service-item">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </section>

      <section className="section section--ink cb-value" aria-labelledby="value-title">
        <FadeIn className="section__inner">
          <h2 className="section__title" id="value-title">
            必要な支援を、必要な分だけ。
          </h2>
          <p className="section__lead">
            経理・採用・Webなど、
            <br />
            バラバラに頼んでいた仕事も、
            <br />
            ここ一つでまとめて相談できます。
          </p>
          <div className="cb-case-rail" aria-label="導入ケース">
            <ol className="cb-case-grid" ref={caseGridRef}>
              {connectBoxCases.map((c) => (
                <li className="cb-case" key={c.n}>
                  <span className="cb-case__n">{c.n}</span>
                  <h3 className="cb-case__title">{c.label}</h3>
                  <div className="cb-case__block">
                    <p className="cb-case__label">課題</p>
                    <ul className="cb-case__list">
                      {c.challenges.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cb-case__block">
                    <p className="cb-case__label">支援</p>
                    <ul className="cb-case__tags">
                      {c.supports.map((item) => (
                        <li className="cb-case__tag" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              <li className="cb-case cb-case--cta" ref={caseCtaRef}>
                <a
                  className="cb-case__cta"
                  href="#final-cta"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToContact(!reduce);
                  }}
                >
                  <span className="cb-case__cta-label">次は</span>
                  <strong>相談する</strong>
                  <span className="cb-case__cta-hint" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            </ol>
          </div>
          <div className="cb-value__price">
            <p className="cb-value__amount">{connectBoxPrice.amount}</p>
            <p className="cb-value__note">{connectBoxPrice.note}</p>
          </div>
        </FadeIn>
      </section>

      <section className="final-cta" id="final-cta" aria-labelledby="cta-title">
        <FadeIn className="final-cta__inner final-cta__inner--wide">
          <h2 id="cta-title">
            まずは、御社の課題を
            <br />
            お聞かせください
          </h2>
          <p className="cb-cta-brand">
            <span className="cb-logo cb-logo--sm">
              <img
                src={connectBoxBrand.logoSrc}
                alt={connectBoxBrand.nameWithDot}
                width={448}
                height={96}
              />
            </span>
            <span>
              企業と人の課題解決を
              <br />
              ひとつの窓口で。
            </span>
          </p>
          <p>ご都合のよい方法でご連絡ください。</p>
          <div className="cb-contact-grid">
            {connectBoxContacts.map((c) => (
              <a
                key={c.id}
                className={`cb-contact-card cb-contact-card--${c.id}`}
                href={contactHrefs[c.hrefKey]}
                {...(c.hrefKey === "email"
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <span className="cb-contact-card__title">{c.title}</span>
                <span className="cb-contact-card__sub">{c.sub}</span>
              </a>
            ))}
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
