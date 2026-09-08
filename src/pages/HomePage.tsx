import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../components/FadeIn";
import { businesses } from "../data/businesses";
import { brandStory, company, companyMission } from "../data/company";
import { usePageMeta } from "../hooks/usePageMeta";

const ease = [0.22, 1, 0.36, 1] as const;

function HeroAtmosphere({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      className="top-hero__bg"
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease }}
    >
      <div className="top-hero__wash" />
      <div className="top-hero__glow top-hero__glow--a" />
      <div className="top-hero__glow top-hero__glow--b" />
      <div className="top-hero__veil" />
    </motion.div>
  );
}

function VerticalTitle({ text, reduce }: { text: string; reduce: boolean | null }) {
  const chars = Array.from(text);
  return (
    <h1 className="top-hero__title" aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="top-hero__char"
          initial={reduce ? false : { opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease, delay: 0.35 + i * 0.07 }}
        >
          {ch}
        </motion.span>
      ))}
    </h1>
  );
}

export default function HomePage() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "T-connect｜人と人との縁を紡ぐ企業",
    description:
      "株式会社T-connect（ティーコネクト）。Connect Box（コネクトボックス）のBPO・コンサルティング、宝飾、起業家育成など、人と人との縁を紡ぐ事業を展開。",
    keywords:
      "T-connect,ティーコネクト,Connect Box,コネクトボックス,BPO,バックオフィス代行,宝飾,起業家育成",
    path: "/",
  });

  useEffect(() => {
    const id = "org-jsonld";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "株式会社T-connect",
      alternateName: ["T-connect", "ティーコネクト"],
      url: "https://www.t-cnct.com/",
      brand: {
        "@type": "Brand",
        name: "Connect Box",
        alternateName: "コネクトボックス",
      },
    });
    return () => {
      script?.remove();
    };
  }, []);

  return (
    <main className="top-page">
      <section className="top-hero" id="page-hero" aria-label="メインビジュアル">
        <HeroAtmosphere reduce={reduce} />
        <div className="top-hero__stage">
          <motion.span
            className="top-hero__rule"
            aria-hidden="true"
            initial={reduce ? false : { scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.15, ease, delay: 0.15 }}
          />
          <VerticalTitle text={companyMission.tagline} reduce={reduce} />
          <motion.span
            className="top-hero__rule"
            aria-hidden="true"
            initial={reduce ? false : { scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.15, ease, delay: 0.25 }}
          />
        </div>
        <motion.a
          className="top-hero__scroll"
          href="#brand"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.55, ease }}
        >
          <span className="top-hero__scroll-line" aria-hidden="true" />
          <span>Scroll</span>
        </motion.a>
      </section>

      <section className="top-brand" id="brand" aria-labelledby="brand-title">
        <div className="top-brand__frame">
          <h2 className="visually-hidden" id="brand-title">
            私たちの想い
          </h2>
          <div className="top-brand__copy">
            {brandStory.paragraphs.map((p, i) => (
              <motion.p
                key={p}
                className={
                  i === 0
                    ? "top-brand__lead"
                    : i === brandStory.paragraphs.length - 1
                      ? "top-brand__closing"
                      : "top-brand__para"
                }
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, ease, delay: reduce ? 0 : 0.05 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <section className="section top-biz" id="business" aria-labelledby="biz-title">
        <FadeIn className="section__inner">
          <header className="top-section-head top-section-head--stack">
            <p className="section__label">Business</p>
            <h2 className="section__title top-section-title" id="biz-title">
              事業紹介
            </h2>
            <p className="top-section-head__lead">
              人と企業の「困った」と「これから」に向き合う。
              <br />
              それぞれ異なる領域から、人と人とのつながりに価値を生み出す事業です。
            </p>
          </header>
          <div className="biz-grid biz-grid--top">
            {businesses.map((b, i) => (
              <FadeIn key={b.slug} delay={0.08 * i}>
                <Link className="biz-card biz-card--top" to={b.path}>
                  <div className="biz-card__media">
                    <img src={b.heroImage} alt="" />
                  </div>
                  <div className="biz-card__body">
                    <p className="biz-card__en">{b.en}</p>
                    <h3>{b.name}</h3>
                    <p className="biz-card__desc">{b.tagline}</p>
                    {b.status === "preparing" && (
                      <span className="biz-card__badge">準備中</span>
                    )}
                    <span className="biz-card__more">詳しく見る</span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section top-company" aria-labelledby="company-title">
        <FadeIn className="section__inner top-company__inner">
          <header className="top-section-head top-section-head--stack">
            <p className="section__label">Company</p>
            <h2 className="section__title top-section-title" id="company-title">
              会社概要
            </h2>
          </header>
          <dl className="company-dl company-dl--compact">
            <div>
              <dt>商号</dt>
              <dd>{company.legalName}</dd>
            </div>
            <div>
              <dt>代表者</dt>
              <dd>
                {company.representativeTitle}　{company.representative}
              </dd>
            </div>
            <div>
              <dt>所在地</dt>
              <dd>
                {company.postalCode} {company.address}
              </dd>
            </div>
            <div>
              <dt>事業内容</dt>
              <dd>{company.business}</dd>
            </div>
          </dl>
          <p className="section__more-link">
            <Link to="/company">会社情報の詳細を見る →</Link>
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
