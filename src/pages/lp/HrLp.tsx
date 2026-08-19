import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../../components/CtaButton";
import FadeIn from "../../components/FadeIn";
import { LINE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

const journey = [
  { t: "要件", d: "忙しさではなく、役割で書く" },
  { t: "募集", d: "文面と媒体を、再開できる型にする" },
  { t: "選考", d: "社長の手元に残しすぎない" },
  { t: "定着", d: "入ったあとの受け入れまで見る" },
];

export default function HrLp() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "採用・人事",
    description: "長く働ける採用と定着をつくる。コネクトボックスの採用・人事。",
  });

  return (
    <main>
      <section className="hr-hero" id="page-hero">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=80"
          alt=""
        />
        <div className="hr-hero__inner">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="hr-kicker">採用・人事</p>
            <h1>
              欠員を埋める前に、
              <br />
              残る人と役割を決める。
            </h1>
            <p>
              採用が止まっていても、急いで足しても、持ち方が変わらなければ同じことが起きます。
            </p>
            <CtaButton className="btn--large btn--pulse" />
          </motion.div>
        </div>
      </section>

      <section className="hr-split">
        <FadeIn>
          <article>
            <h2>採る</h2>
            <p>今の穴を埋める募集ではなく、事業に必要な役割を言語化します。</p>
          </article>
        </FadeIn>
        <FadeIn delay={0.08}>
          <article>
            <h2>残る</h2>
            <p>入社後の受け入れ、労務、現場の持ち方まで含めて設計します。</p>
          </article>
        </FadeIn>
      </section>

      <section className="section">
        <FadeIn className="section__inner">
          <p className="section__label">Journey</p>
          <h2 className="section__title">採用が、途中で社長の手元に残らないように</h2>
          <ol className="hr-journey">
            {journey.map((s, i) => (
              <li key={s.t}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{s.t}</strong>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </FadeIn>
      </section>

      <section className="section section--muted">
        <FadeIn className="section__inner">
          <p className="section__label">Start here</p>
          <h2 className="section__title">よくある始め方</h2>
          <ul className="hr-starts">
            <li>
              <strong>採用が止まっている</strong>
              <span>採らない判断も含め、役割と業務の持ち方を先に見直します。</span>
            </li>
            <li>
              <strong>募集の型がない</strong>
              <span>要件・文面・選考を整え、再開したときに迷わない状態にします。</span>
            </li>
            <li>
              <strong>労務が手元に残っている</strong>
              <span>勤怠・入退社まわりを外に出し、現場の時間を戻します。</span>
            </li>
          </ul>
        </FadeIn>
      </section>

      <section className="final-cta" id="final-cta">
        <FadeIn className="final-cta__inner">
          <h2>
            採用と人事の現状を、
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
