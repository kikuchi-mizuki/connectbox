import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../components/CtaButton";
import FadeIn from "../components/FadeIn";
import { faqs, services, steps } from "../data/services";
import { LINE_URL, SITE_NAME } from "../constants";
import { usePageMeta } from "../hooks/usePageMeta";

const pains = [
  "社長が事務作業までやっている",
  "経理・総務に時間が取られている",
  "採用担当が足りない",
  "人を採用するほどではないが、業務量が多い",
  "固定費を増やさず、業務を外に出したい",
];

const team = [
  {
    n: "3,000+",
    title: "実務経験者からアサイン",
    body: "3,000名以上の子育て世帯ワーカーが在籍。必要な業務・期間に合わせて配置します。",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "実務経験",
    title: "大手企業などの経歴",
    body: "大手企業での勤務経験など、選んだ領域の実務があるアシスタントが入ります。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "15分〜",
    title: "まずは概略から",
    body: "いきなり契約ではありません。LINEと、短いオンラインで現状を整理します。",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },
];

const cases = [
  {
    who: "IT企業・従業員50名規模",
    n: "週8h→2h",
    title: "代表の経理兼務を減らす",
    body: "請求・入金・経費の定型を外出し、最終確認だけ社内に残す使い方です。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    who: "建設業・従業員30名規模",
    n: "40h→16h",
    title: "月初の経理を薄くする",
    body: "請求確認と振込準備を代行し、繁忙期の残業目安も月60時間から15時間へ寄せます。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    who: "小規模・従業員8名規模",
    n: "採用 0",
    title: "退職後も、処理を止めない",
    body: "棚卸しとマニュアルのあと定型を代行し、採用せずに翌月から回します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
  },
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
              バックオフィスを中心に、採用・マーケティング・業務管理まで。必要な業務だけを、必要な分だけ外部化できます。いきなり契約ではありません。
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
            コネクトボックスなら、バックオフィスを中心に外部化できます。まとめて契約する必要はありません。関心のある領域から始められます。
          </p>
        </FadeIn>
      </section>

      <section className="section" id="services" aria-labelledby="services-title">
        <FadeIn className="section__inner">
          <p className="section__label">Services</p>
          <h2 className="section__title" id="services-title">
            {services.length}つのサービス
          </h2>
          <p className="section__lead">
            まずはバックオフィスから、という使い方が多いです。ほかの領域は、必要になったタイミングで足せます。
          </p>
          <div className="catalog-grid">
            {services.map((s) =>
              s.hasLp ? (
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
              ) : (
                <article className="catalog-card catalog-card--static" key={s.slug}>
                  <img src={s.heroImage} alt="" />
                  <p className="catalog-card__en">{s.en}</p>
                  <h3>{s.name}</h3>
                  <p>{s.tagline}</p>
                </article>
              ),
            )}
          </div>
        </FadeIn>
      </section>

      <section className="section section--muted" aria-labelledby="team-title">
        <FadeIn className="section__inner">
          <p className="section__label">Team</p>
          <h2 className="section__title" id="team-title">
            3,000名以上の実務経験者から、
            <br />
            必要な人材をアサイン
          </h2>
          <p className="section__lead">
            子育て世帯のワーカーが在籍しています。人数ではなく、御社の業務に合う人を配置できることが強みです。
          </p>
          <ul className="home-team">
            {team.map((item) => (
              <li key={item.title}>
                <img src={item.image} alt="" />
                <div>
                  <p className="home-team__n">{item.n}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="section" aria-labelledby="cases-title">
        <FadeIn className="section__inner">
          <p className="section__label">Cases</p>
          <h2 className="section__title" id="cases-title">
            よくある使い方
          </h2>
          <p className="section__lead">
            数字はよくある変化のイメージです。実在顧客の成果保証ではありません。現状を伺ったうえで、御社の範囲でご提案します。
          </p>
          <ul className="home-cases">
            {cases.map((item) => (
              <li key={item.title}>
                <img src={item.image} alt="" />
                <div>
                  <p className="home-cases__who">{item.who}</p>
                  <p className="home-team__n">{item.n}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
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
