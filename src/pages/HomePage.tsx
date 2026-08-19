import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../components/CtaButton";
import FadeIn from "../components/FadeIn";
import { faqs, lpServices, services, steps } from "../data/services";
import { LINE_URL, SITE_NAME } from "../constants";
import { usePageMeta } from "../hooks/usePageMeta";

const otherServices = services.filter((s) => !s.hasLp);

const pains = [
  "社長が事務作業までやっている",
  "経理・総務に時間が取られている",
  "採用担当が足りない",
  "人を採用するほどではないが、業務量が多い",
  "固定費を増やさず、業務を外に出したい",
];


export default function HomePage() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: SITE_NAME,
    description:
      "人を増やす前に、業務を外に出す。バックオフィスを中心に、必要な業務だけを必要な分だけ外部化。まずは15分、LINEで相談。",
  });

  return (
    <main>
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
            <p className="hero__brand">{SITE_NAME}</p>
            <h1 className="hero__title">
              人を増やす前に、
              <br />
              業務を外に出しませんか？
            </h1>
            <p className="hero__lead">
              経理・総務・人事・営業事務などのバックオフィス業務を代行し、属人化や繁忙期の揺れにも耐えられる体制をつくります。いきなり契約ではありません。
            </p>
            <div className="cta-row">
              <CtaButton className="btn--large btn--pulse" />
            </div>
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

      <section className="section" id="services" aria-labelledby="services-title">
        <FadeIn className="section__inner">
          <p className="section__label">Services</p>
          <h2 className="section__title" id="services-title">
            まずはここから
          </h2>
          <p className="section__lead">
            バックオフィスの代行から始める企業様が多いです。出張管理の自動化もご相談いただけます。
          </p>
          <div className="catalog-grid catalog-grid--main">
            {lpServices.map((s) => (
              <Link
                className="catalog-card catalog-card--lp"
                to={s.path}
                key={s.slug}
              >
                <img src={s.heroImage} alt="" />
                <p className="catalog-card__en">{s.en}</p>
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
                <span className="catalog-card__more">案内を見る</span>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section section--muted" id="other-services" aria-labelledby="other-services-title">
        <FadeIn className="section__inner">
          <p className="section__label">Other Services</p>
          <h2 className="section__title" id="other-services-title">
            その他の支援
          </h2>
          <p className="section__lead">
            必要になったタイミングで足せます。バックオフィスと合わせてご相談いただくこともできます。
          </p>
          <div className="catalog-grid catalog-grid--sub">
            {otherServices.map((s) => (
              <article className="catalog-card catalog-card--static" key={s.slug}>
                <p className="catalog-card__en">{s.en}</p>
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section approach-note" aria-labelledby="flow-title">
        <FadeIn className="section__inner">
          <p className="section__label">Process</p>
          <h2 className="section__title" id="flow-title">
            ご相談から開始までの流れ
          </h2>
          <p className="section__lead">
            いきなり契約ではありません。まずはLINEでの現状共有から。オンラインは15分程度です。
          </p>
          <ol className="flow">
            {steps.map((s, i) => (
              <li className="flow-step" key={s.title}>
                <span className="flow-step__dot">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>
      </section>

      <section className="section section--muted" aria-labelledby="faq-title">
        <FadeIn className="section__inner">
          <p className="section__label">FAQ</p>
          <h2 className="section__title" id="faq-title">
            よくあるご質問
          </h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
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
