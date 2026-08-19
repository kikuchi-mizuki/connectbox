import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import { usePageMeta } from "../../hooks/usePageMeta";

const items = [
  { title: "金・プラチナ買取", body: "相場に基づいた適正価格で査定いたします。" },
  { title: "ブランド品買取", body: "ブランドバッグ・時計・アクセサリーなどを取り扱い。" },
];

export default function JewelryPage() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "宝飾事業｜T-connect",
    description: "T-connectの宝飾事業。大阪を拠点に、金・プラチナ・ブランド品の買取を展開。",
  });

  return (
    <main>
      <section className="hero hero--page" id="page-hero" aria-label="宝飾事業">
        <div className="hero__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1515562141589-67f0d569b6ac?auto=format&fit=crop&w=2400&q=80"
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
            <p className="hero__brand">Jewelry</p>
            <h1 className="hero__title">宝飾事業</h1>
            <p className="hero__lead">
              大阪を拠点に、金・プラチナ・ブランド品の買取を展開しています。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="service-title">
        <FadeIn className="section__inner">
          <p className="section__label">Services</p>
          <h2 className="section__title" id="service-title">
            取扱い内容
          </h2>
          <div className="biz-detail-grid">
            {items.map((item) => (
              <article key={item.title} className="biz-detail-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
