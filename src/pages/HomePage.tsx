import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../components/FadeIn";
import { businesses } from "../data/businesses";
import { COMPANY_NAME } from "../constants";
import { usePageMeta } from "../hooks/usePageMeta";

export default function HomePage() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "T-connect",
    description:
      "株式会社T-connect。人と人との縁を紡ぐ企業。BPO・コンサルティング、探偵、宝飾、起業家育成の4事業を展開。",
  });

  return (
    <main className="top-page">
      <section className="top-hero" id="page-hero" aria-label="メインビジュアル">
        {/* 稲穂の装飾 */}
        <svg
          className="top-hero__grain"
          viewBox="0 0 600 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M520 -20 Q480 120 380 280 Q280 440 200 580 Q140 680 80 820 Q60 870 30 920"
            stroke="#d6c8a0"
            strokeWidth="2.5"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M540 -10 Q510 100 430 240 Q350 380 280 520 Q220 620 160 740 Q130 800 100 900"
            stroke="#d6c8a0"
            strokeWidth="2"
            fill="none"
            opacity="0.35"
          />
          {/* 稲穂の粒 */}
          {[
            [400, 160], [420, 140], [380, 180], [410, 120], [440, 110],
            [360, 200], [390, 100], [430, 90], [350, 220], [370, 80],
            [340, 240], [450, 80], [460, 100], [380, 70], [330, 260],
            [320, 280], [470, 120], [390, 60], [360, 60], [440, 70],
          ].map(([cx, cy], i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx="6"
              ry="3.5"
              fill="#d6c8a0"
              opacity={0.35 + (i % 3) * 0.12}
              transform={`rotate(${-30 + (i % 5) * 12} ${cx} ${cy})`}
            />
          ))}
        </svg>
        {/* 下部の装飾曲線 */}
        <svg
          className="top-hero__curve"
          viewBox="0 0 800 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M-50 180 Q150 60 400 100 Q550 120 700 50 Q780 20 850 30"
            stroke="#d6c8a0"
            strokeWidth="2"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M-50 200 Q200 90 420 130 Q580 150 750 70 Q820 40 880 50"
            stroke="#d6c8a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
        </svg>

        <motion.div
          className="top-hero__inner"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="top-hero__title">
            人と人との縁を紡ぐ企業
          </h1>
          <div className="top-hero__logo-mark" aria-hidden="true">
            <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="48">
              <path d="M5 30 L15 10 L25 30" stroke="#4056a1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M25 30 L35 10 L45 30" stroke="#e8952f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <p className="top-hero__brand">T-connect</p>
        </motion.div>
      </section>

      <section className="section top-biz" id="business" aria-labelledby="biz-title">
        <FadeIn className="section__inner">
          <p className="section__label">Business</p>
          <h2 className="section__title" id="biz-title">
            事業紹介
          </h2>
          <div className="biz-grid">
            {businesses.map((b) => (
              <Link className="biz-card" to={b.path} key={b.slug}>
                <img src={b.heroImage} alt="" />
                <div className="biz-card__body">
                  <p className="biz-card__en">{b.en}</p>
                  <h3>{b.name}</h3>
                  <p>{b.tagline}</p>
                  {b.status === "preparing" && (
                    <span className="biz-card__badge">準備中</span>
                  )}
                  <span className="biz-card__more">詳しく見る</span>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section top-stance" aria-labelledby="stance-title">
        <FadeIn className="section__inner">
          <p className="section__label">Stance</p>
          <h2 className="section__title" id="stance-title">
            目先ではなく、未来を選べ
          </h2>
          <p className="section__lead">
            日々の判断で、目先の利益よりも長期的な信頼を優先します。その積み重ねが、選ばれ続ける関係をつくります。
          </p>
        </FadeIn>
      </section>

      <section className="section" aria-labelledby="company-title">
        <FadeIn className="section__inner">
          <p className="section__label">Company</p>
          <h2 className="section__title" id="company-title">
            会社概要
          </h2>
          <dl className="company-dl company-dl--compact">
            <div>
              <dt>商号</dt>
              <dd>{COMPANY_NAME}</dd>
            </div>
            <div>
              <dt>代表者</dt>
              <dd>代表取締役　田中 辰弥</dd>
            </div>
            <div>
              <dt>所在地</dt>
              <dd>東京都新宿区西新宿３丁目１−３ MITSUWAビル１０階</dd>
            </div>
            <div>
              <dt>事業内容</dt>
              <dd>
                BPO・コンサルティング（Connect Box）、探偵事業、宝飾事業、起業家育成事業
              </dd>
            </div>
          </dl>
          <p className="section__more-link">
            <Link to="/company">会社情報の詳細を見る →</Link>
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
