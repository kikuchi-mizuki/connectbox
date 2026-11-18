import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ConnectBoxContactCards from "../components/ConnectBoxContactCards";
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
    title: "株式会社T-connect（ティーコネクト）｜公式サイト",
    description:
      "株式会社T-connect（ティーコネクト）の公式サイト。主事業Connect Box（コネクトボックス）でBPO・バックオフィス代行・コンサルティングを提供。東京都新宿区西新宿。",
    keywords:
      "株式会社T-connect,T-connect,ティーコネクト,ティーコネクト 公式,株式会社ティーコネクト,公式サイト,Connect Box,コネクトボックス,BPO,バックオフィス代行",
    path: "/",
  });

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
        <div className="top-hero__bottom">
          <motion.p
            className="top-hero__identity"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
          >
            株式会社T-connect（ティーコネクト）公式サイト
            <span>主事業：Connect Box（BPO・コンサルティング）</span>
          </motion.p>
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
        </div>
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

      <section className="section top-cta" aria-labelledby="top-cta-title">
        <FadeIn className="section__inner top-cta__inner">
          <p className="section__label">Connect Box</p>
          <h2 className="section__title top-section-title" id="top-cta-title">
            主事業は、ひとつの窓口で。
          </h2>
          <p className="top-cta__lead">
            Connect Box（コネクトボックス）で、バックオフィス代行を中心に必要な支援だけを組み合わせます。
          </p>
          <div className="top-cta__actions">
            <Link className="btn btn--primary btn--large" to="/connect-box">
              Connect Boxを見る
            </Link>
            <Link className="btn btn--secondary btn--large" to="/company">
              会社情報を見る
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="section top-biz" id="business" aria-labelledby="biz-title">
        <FadeIn className="section__inner">
          <header className="top-section-head top-section-head--stack">
            <p className="section__label">Business</p>
            <h2 className="section__title top-section-title" id="biz-title">
              事業紹介
            </h2>
            <p className="top-section-head__lead">
              主軸は Connect Box。
              <br />
              ほか、関連事業も展開しています。
            </p>
          </header>
          <div className="biz-grid biz-grid--top">
            {businesses.map((b, i) => (
              <FadeIn key={b.slug} delay={0.08 * i}>
                {b.status === "linked" ? (
                  <Link className="biz-card biz-card--top" to={b.path}>
                    <div className="biz-card__media">
                      <img src={b.heroImage} alt="" />
                    </div>
                    <div className="biz-card__body">
                      <p className="biz-card__en">{b.en}</p>
                      <h3>{b.name}</h3>
                      <p className="biz-card__desc">{b.tagline}</p>
                      <span className="biz-card__more">詳しく見る</span>
                    </div>
                  </Link>
                ) : (
                  <div className="biz-card biz-card--top biz-card--static">
                    <div className="biz-card__media">
                      <img src={b.heroImage} alt="" />
                    </div>
                    <div className="biz-card__body">
                      <p className="biz-card__en">{b.en}</p>
                      <h3>{b.name}</h3>
                      <p className="biz-card__desc">{b.tagline}</p>
                    </div>
                  </div>
                )}
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
              <dt>主事業</dt>
              <dd>{company.businessPrimary}</dd>
            </div>
            <div>
              <dt>その他</dt>
              <dd>{company.businessOther}</dd>
            </div>
          </dl>
          <p className="section__more-link">
            <Link to="/company">会社情報の詳細を見る →</Link>
          </p>
        </FadeIn>
      </section>

      <section className="section top-cta top-cta--contact" aria-labelledby="top-contact-title">
        <FadeIn className="section__inner top-cta__inner">
          <p className="section__label">Contact</p>
          <h2 className="section__title top-section-title" id="top-contact-title">
            お問い合わせ
          </h2>
          <p className="top-cta__lead">
            ご都合のよい方法でご連絡ください。
          </p>
          <ConnectBoxContactCards ctaPosition="home" />
        </FadeIn>
      </section>
    </main>
  );
}
