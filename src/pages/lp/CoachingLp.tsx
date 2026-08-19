import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../../components/CtaButton";
import FadeIn from "../../components/FadeIn";
import { LINE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function CoachingLp() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "組織コーチング",
    description: "判断の軸を揃える。コネクトボックスの組織コーチング。",
  });

  return (
    <main className="co-page">
      <section className="co-hero" id="page-hero">
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p>組織コーチング</p>
          <h1>
            同じ議論を、
            <br />
            繰り返さない。
          </h1>
          <p className="co-lead">
            火消しではなく、日々の判断が同じ方向を向く会話の型を残します。
          </p>
          <CtaButton className="btn--large btn--pulse" />
        </motion.div>
      </section>

      <section className="co-quotes">
        <FadeIn>
          <blockquote>
            <p>「社長がいないと決まらない」</p>
            <span>任せられる範囲と、上げる判断が分かれていない</span>
          </blockquote>
        </FadeIn>
        <FadeIn delay={0.06}>
          <blockquote>
            <p>「また同じ話をしている」</p>
            <span>会議が、何を決める場かが共有されていない</span>
          </blockquote>
        </FadeIn>
        <FadeIn delay={0.12}>
          <blockquote>
            <p>「部門ですれ違う」</p>
            <span>優先順位の言葉が、人によって違う</span>
          </blockquote>
        </FadeIn>
      </section>

      <section className="co-axis">
        <FadeIn>
          <p className="section__label">Axis</p>
          <h2>判断の軸を、言葉にする</h2>
          <ol>
            <li>
              <strong>基準</strong>
              何を優先するかを、人に依存しない言葉にする
            </li>
            <li>
              <strong>対話</strong>
              一度の研修で終わらせず、会議と1on1に落とす
            </li>
            <li>
              <strong>委任</strong>
              社長がいなくても進む範囲を分ける
            </li>
          </ol>
        </FadeIn>
      </section>

      <section className="final-cta" id="final-cta">
        <FadeIn className="final-cta__inner">
          <h2>
            組織の会話の現状を、
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
