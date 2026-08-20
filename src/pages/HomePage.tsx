import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../components/FadeIn";
import MessageSection from "../components/MessageSection";
import ValueSection from "../components/ValueSection";
import { businesses } from "../data/businesses";
import { company, companyMission } from "../data/company";
import { usePageMeta } from "../hooks/usePageMeta";

function GrainDecor() {
  return (
    <div className="top-hero__bg" aria-hidden="true">
      <img
        className="top-hero__decor"
        src="/meishi-decor.png?v=9"
        alt=""
        width={1386}
        height={2232}
      />
      <svg
        className="top-hero__grain"
        viewBox="0 0 600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M520 -20 Q480 120 380 280 Q280 440 200 580 Q140 680 80 820 Q60 870 30 920"
          stroke="#c4b48a"
          strokeWidth="2.2"
          fill="none"
        />
        <path
          d="M540 -10 Q510 100 430 240 Q350 380 280 520 Q220 620 160 740 Q130 800 100 900"
          stroke="#c4b48a"
          strokeWidth="1.7"
          fill="none"
          opacity="0.75"
        />
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
            fill="#c4b48a"
            opacity={0.7 + (i % 3) * 0.08}
            transform={`rotate(${-30 + (i % 5) * 12} ${cx} ${cy})`}
          />
        ))}
      </svg>
      <svg
        className="top-hero__curve"
        viewBox="0 0 800 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-50 180 Q150 60 400 100 Q550 120 700 50 Q780 20 850 30"
          stroke="#c4b48a"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M-50 200 Q200 90 420 130 Q580 150 750 70 Q820 40 880 50"
          stroke="#c4b48a"
          strokeWidth="1.4"
          fill="none"
          opacity="0.75"
        />
      </svg>
    </div>
  );
}

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
        <GrainDecor />
        <motion.div
          className="top-hero__inner"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="top-hero__core">
            <h1 className="top-hero__title">{companyMission.tagline}</h1>
            <p className="top-hero__lead">
              {companyMission.heroLead.split("\n").map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>
        </motion.div>
        <a className="top-hero__scroll" href="#value">
          <span>Scroll</span>
          <span className="top-hero__scroll-arrow" aria-hidden="true">
            ↓
          </span>
        </a>
      </section>

      <ValueSection />

      <MessageSection />

      <section className="section top-biz" id="business" aria-labelledby="biz-title">
        <FadeIn className="section__inner">
          <header className="top-section-head top-section-head--stack">
            <p className="section__label">Business</p>
            <h2 className="section__title" id="biz-title">
              事業紹介
            </h2>
            <p className="top-section-head__lead">
              人と企業の「困った」と「これから」に向き合う。
              <br />
              T-connectは、それぞれ異なる領域から、人と人とのつながりに価値を生み出す事業を展開しています。
            </p>
          </header>
          <div className="biz-grid">
            {businesses.map((b) => (
              <Link className="biz-card" to={b.path} key={b.slug}>
                <img src={b.heroImage} alt="" />
                <div className="biz-card__body">
                  <p className="biz-card__en">{b.en}</p>
                  <h3>{b.name}</h3>
                  <p className="biz-card__desc">{b.tagline}</p>
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

      <section
        className="section section--muted top-company"
        aria-labelledby="company-title"
      >
        <FadeIn className="section__inner top-company__inner">
          <header className="top-section-head top-section-head--stack">
            <p className="section__label">Company</p>
            <h2 className="section__title" id="company-title">
              会社概要
            </h2>
          </header>
          <dl className="company-dl company-dl--compact">
            <div>
              <dt>商号</dt>
              <dd>{company.legalName}</dd>
            </div>
            <div>
              <dt>代表者</dt>
              <dd>
                {company.representativeTitle}　{company.representative}
              </dd>
            </div>
            <div>
              <dt>所在地</dt>
              <dd>
                {company.postalCode} {company.address}
              </dd>
            </div>
            <div>
              <dt>事業内容</dt>
              <dd>{company.business}</dd>
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
