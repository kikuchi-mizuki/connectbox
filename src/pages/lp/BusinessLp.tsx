import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../../components/CtaButton";
import FadeIn from "../../components/FadeIn";
import { LINE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function BusinessLp() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "既存事業ブラッシュアップ",
    description:
      "次に選ばれる理由を磨く。コネクトボックスの既存事業ブラッシュアップ。",
  });

  return (
    <main>
      <section className="bu-hero" id="page-hero">
        <div className="bu-hero__media">
          <img
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1600&q=80"
            alt=""
          />
        </div>
        <div className="bu-hero__copy">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="bu-kicker">既存事業ブラッシュアップ</p>
            <h1>
              延命ではなく、
              <br />
              理由を磨く。
            </h1>
            <p>
              既存事業は回っている。次の一手だけが、小手先になっているときに。
            </p>
            <CtaButton className="btn--large btn--pulse" />
          </motion.div>
        </div>
      </section>

      <section className="bu-compare">
        <FadeIn>
          <article>
            <p>いま</p>
            <h2>慣れた提供のまま</h2>
            <p>価格・範囲・届け方が、昔の顧客のまま残っている。</p>
          </article>
        </FadeIn>
        <FadeIn delay={0.08}>
          <article className="bu-compare__next">
            <p>つぎ</p>
            <h2>選ばれ続ける理由</h2>
            <p>離れない理由を言葉にし、提供の持ち方を更新する。</p>
          </article>
        </FadeIn>
      </section>

      <section className="section">
        <FadeIn className="section__inner">
          <p className="section__label">Polish</p>
          <h2 className="section__title">磨く順番</h2>
          <ol className="bu-polish">
            <li>
              <strong>聞く</strong>
              既存顧客が残っている理由を取り出す
            </li>
            <li>
              <strong>削る</strong>
              やりすぎと足りないを分け、負荷が合う形に戻す
            </li>
            <li>
              <strong>通す</strong>
              現場が詰まっている体験から、オペレーションを上げる
            </li>
          </ol>
        </FadeIn>
      </section>

      <section className="final-cta" id="final-cta">
        <FadeIn className="final-cta__inner">
          <h2>
            既存事業の「次」を、
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
