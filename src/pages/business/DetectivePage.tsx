import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import { usePageMeta } from "../../hooks/usePageMeta";

const preparations = [
  { title: "探偵業開業準備", body: "届出・許認可の取得に向けた準備を進めています。" },
  { title: "探偵ネットワークの構築", body: "全国対応に向けたパートナーネットワークを構築中。" },
  { title: "調査ノウハウの蓄積", body: "不貞調査を中心に、確かな証拠を残す調査手法を整備。" },
  { title: "SNS運用・SEO対策", body: "開業前からWeb集客基盤を構築し、認知を広げています。" },
];

export default function DetectivePage() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "探偵事業｜T-connect",
    description: "T-connectの探偵事業。不貞調査を中心に、開業準備を進めています。",
  });

  return (
    <main>
      <section className="hero hero--page" id="page-hero" aria-label="探偵事業">
        <div className="hero__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2400&q=80"
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
            <p className="hero__brand">Detective</p>
            <h1 className="hero__title">探偵事業</h1>
            <p className="hero__lead">
              現在、開業準備中です。不貞調査を中心に、確かな証拠を残す調査体制を整えています。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="prep-title">
        <FadeIn className="section__inner">
          <p className="section__label">Preparation</p>
          <h2 className="section__title" id="prep-title">
            準備中の取り組み
          </h2>
          <div className="biz-detail-grid">
            {preparations.map((p) => (
              <article key={p.title} className="biz-detail-card">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
