import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function IncubationPage() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "起業家育成事業｜T-connect",
    description: "T-connectの起業家育成事業。次の起業家を育てる。",
  });

  return (
    <main>
      <section className="hero hero--page" id="page-hero" aria-label="起業家育成事業">
        <div className="hero__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=80"
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
            <p className="hero__brand">Incubation</p>
            <h1 className="hero__title">起業家育成事業</h1>
            <p className="hero__lead">
              起業を目指す方への支援事業です。事業計画の策定から実行まで、伴走します。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-title">
        <FadeIn className="section__inner">
          <p className="section__label">About</p>
          <h2 className="section__title" id="about-title">
            次の起業家を、育てる
          </h2>
          <p className="section__lead">
            事業のアイデアはあるが、始め方が分からない。そんな方に向けて、計画づくりから立ち上げまでを一緒に進めます。
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
