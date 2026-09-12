import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../../components/CtaButton";
import FadeIn from "../../components/FadeIn";
import { services } from "../../data/services";
import { LINE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

const pains = [
  "社長が事務作業までやっている",
  "経理・総務に時間が取られている",
  "採用担当が足りない",
  "人を採用するほどではないが、業務量が多い",
  "固定費を増やさず、業務を外に出したい",
];

export default function ConnectBoxPage() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "Connect Box｜BPO・バックオフィス代行",
    description:
      "Connect Box（コネクトボックス）のBPO・コンサルティング。人を増やす前に、バックオフィス業務を外に出す。経理・総務・人事・営業事務など、必要な分だけ外部化。",
    keywords:
      "Connect Box,コネクトボックス,BPO,バックオフィス代行,旅費One,経理代行,総務代行,業務委託,T-connect",
    path: "/connect-box",
  });

  return (
    <main className="cb-page">
      <section className="hero" id="page-hero" aria-label="メインビジュアル">
        <div className="hero__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80"
            alt=""
          />
          <div className="hero__shade" />
        </div>
        <div className="hero__content">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero__brand">Connect Box</p>
            <h1 className="hero__title">
              人を増やす前に、
              <br />
              業務を外に出しませんか？
            </h1>
            <p className="hero__lead">
              経理・総務・人事・営業事務などのバックオフィス業務を代行し、属人化や繁忙期の揺れにも耐えられる体制をつくります。いきなり契約ではありません。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="pain-title">
        <FadeIn className="section__inner">
          <p className="section__label">Challenges</p>
          <h2 className="section__title" id="pain-title">
            こんなお悩み、ありませんか
          </h2>
          <p className="section__lead">
            人を足すほどではないが、社内の時間が事務に取られている。そんな相談から始まっています。
          </p>
          <ul className="pain-list">
            {pains.map((item, i) => (
              <li key={item}>
                <span className="pain-list__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="section section--ink" aria-labelledby="promise-title">
        <FadeIn className="section__inner">
          <p className="section__label">Promise</p>
          <h2 className="section__title" id="promise-title">
            必要な業務だけ、
            <br />
            必要な期間だけ。
          </h2>
          <p className="section__lead">
            請求・経費・営業事務など、繰り返し発生する業務から外に出せます。採用の固定費をかけず、必要な時期・時間だけ体制を厚くできます。
          </p>
        </FadeIn>
      </section>

      <section className="section top-biz" id="services" aria-labelledby="services-title">
        <FadeIn className="section__inner">
          <header className="top-section-head top-section-head--stack">
            <p className="section__label">Services</p>
            <h2 className="section__title top-section-title" id="services-title">
              サービス紹介
            </h2>
            <p className="top-section-head__lead">
              人と企業の「困った」に向き合う支援メニューです。
              <br />
              まずは関心のある領域からご覧ください。
            </p>
          </header>
          <div className="biz-grid biz-grid--top">
            {services.map((s, i) => {
              const comingSoon = s.status === "coming_soon";
              const cardBody = (
                <>
                  <div className="biz-card__media">
                    <img src={s.heroImage} alt="" />
                  </div>
                  <div className="biz-card__body">
                    <p className="biz-card__en">{s.en}</p>
                    <h3>{s.name}</h3>
                    <p className="biz-card__desc">{s.tagline}</p>
                    {comingSoon ? (
                      <span className="biz-card__badge">リリース前</span>
                    ) : null}
                    {s.hasLp ? (
                      <span className="biz-card__more">
                        {comingSoon ? "事前案内を見る" : "詳しく見る"}
                      </span>
                    ) : null}
                  </div>
                </>
              );

              return (
                <FadeIn key={s.slug} delay={0.06 * i}>
                  {s.hasLp ? (
                    <Link className="biz-card biz-card--top" to={s.path}>
                      {cardBody}
                    </Link>
                  ) : (
                    <div className="biz-card biz-card--top biz-card--static">
                      {cardBody}
                    </div>
                  )}
                </FadeIn>
              );
            })}
          </div>
        </FadeIn>
      </section>

      <section className="final-cta" id="final-cta" aria-labelledby="cta-title">
        <FadeIn className="final-cta__inner">
          <h2 id="cta-title">
            まずは15分、
            <br />
            LINEでお聞かせください
          </h2>
          <p>
            どの領域からがよいか分からなくても構いません。公式アカウントを友だち追加のうえ、ご状況を簡単にお送りください。
          </p>
          <div className="cta-row">
            <CtaButton className="btn--large btn--pulse" />
          </div>
          <p className="mail-hint">
            友だち追加：{" "}
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
              lin.ee/RiVp6pb
            </a>
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
