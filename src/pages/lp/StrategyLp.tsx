import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../../components/CtaButton";
import FadeIn from "../../components/FadeIn";
import { LINE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function StrategyLp() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "経営戦略",
    description: "未来を選ぶ意思決定を支える。コネクトボックスの経営戦略。",
  });

  return (
    <main>
      <section className="st-hero" id="page-hero">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="st-kicker">経営戦略</p>
          <h1>やることを増やす前に、捨てる。</h1>
          <p>
            今月の数字合わせではなく、何をやり・何をやらないかを一緒に決めます。
          </p>
          <CtaButton className="btn--large btn--pulse" />
        </motion.div>
      </section>

      <section className="st-cols">
        <FadeIn>
          <article className="st-col st-col--do">
            <h2>やる</h2>
            <ul>
              <li>会社の未来に残す打ち手</li>
              <li>現場に落ちる粒度の方針</li>
              <li>見る指標を絞った会議</li>
            </ul>
          </article>
        </FadeIn>
        <FadeIn delay={0.08}>
          <article className="st-col st-col--dont">
            <h2>やらない</h2>
            <ul>
              <li>忙しさで増えた施策の放置</li>
              <li>口頭だけの方針</li>
              <li>全部やる前提の計画</li>
            </ul>
          </article>
        </FadeIn>
      </section>

      <section className="section">
        <FadeIn className="section__inner">
          <p className="section__label">How we start</p>
          <h2 className="section__title">決め方を、先に揃える</h2>
          <div className="st-steps">
            <div>
              <span>01</span>
              <h3>棚卸し</h3>
              <p>今走っている打ち手を並べ、残す・止める・先送りに分ける。</p>
            </div>
            <div>
              <span>02</span>
              <h3>言語化</h3>
              <p>社長の頭にある判断基準を、共有できる短い言葉にする。</p>
            </div>
            <div>
              <span>03</span>
              <h3>接続</h3>
              <p>中期の方向を、今週の動きに落とす。</p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="final-cta st-cta" id="final-cta">
        <FadeIn className="final-cta__inner">
          <h2>
            今、何を捨てられないかを
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
