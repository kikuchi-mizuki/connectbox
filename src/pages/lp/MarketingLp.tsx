import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../../components/CtaButton";
import FadeIn from "../../components/FadeIn";
import { LINE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

const funnel = [
  { n: "01", title: "見つかる", body: "検索・SNS・紹介の入り口を整理する" },
  { n: "02", title: "信頼する", body: "サイトと発信が、選ばれる理由を語る" },
  { n: "03", title: "相談する", body: "問い合わせが、途中で落ちない" },
];

export default function MarketingLp() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "WEBマーケ",
    description: "選ばれ続ける導線と信頼をつくる。コネクトボックスのWEBマーケ。",
  });

  return (
    <main>
      <section className="mk-hero" id="page-hero">
        <div className="mk-hero__copy">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="mk-kicker">WEBマーケ</p>
            <h1>
              広告が止まっても、
              <br />
              相談が来る導線へ。
            </h1>
            <p className="mk-lead">
              今月の数字だけを盛るのではなく、サイト・発信・計測が残る持ち方に変えます。
            </p>
            <CtaButton className="btn--large btn--pulse" />
          </motion.div>
        </div>
        <div className="mk-hero__panel" aria-hidden="true">
          <div className="mk-dash">
            <p>導線の状態</p>
            <div className="mk-bars">
              <i style={{ width: "42%" }} />
              <i style={{ width: "68%" }} />
              <i style={{ width: "88%" }} />
            </div>
            <ul>
              <li>広告依存 42%</li>
              <li>コンテンツ 68%</li>
              <li>相談到達 88%</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <FadeIn className="section__inner">
          <p className="section__label">Funnel</p>
          <h2 className="section__title">相談までの道を、一本にする</h2>
          <div className="mk-funnel">
            {funnel.map((s) => (
              <article key={s.n}>
                <span>{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section mk-tiles-wrap">
        <FadeIn className="section__inner">
          <p className="section__label">What we do</p>
          <h2 className="section__title">できること</h2>
          <div className="mk-tiles">
            <article>
              <h3>導線の棚卸し</h3>
              <p>サイト・SNS・広告の入り口を点検し、相談まで届く道を残します。</p>
            </article>
            <article>
              <h3>発信の型</h3>
              <p>誰が・何を・どの頻度で出すかを決め、更新が止まらない運用にします。</p>
            </article>
            <article>
              <h3>広告の見直し</h3>
              <p>効いていない出稿を止め、残る導線に予算を寄せます。</p>
            </article>
            <article>
              <h3>計測</h3>
              <p>問い合わせまでの数字を見える化し、今月の感覚に頼らない判断にします。</p>
            </article>
          </div>
        </FadeIn>
      </section>

      <section className="final-cta" id="final-cta">
        <FadeIn className="final-cta__inner">
          <h2>
            WEBマーケの現状を、
            <br />
            LINEでお聞かせください
          </h2>
          <CtaButton className="btn--large btn--pulse" />
          <p className="mail-hint">
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
              lin.ee/RiVp6pb
            </a>
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
