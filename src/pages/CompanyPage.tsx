import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../components/FadeIn";
import MessageSection from "../components/MessageSection";
import ValueSection from "../components/ValueSection";
import { company, companyMission } from "../data/company";
import { businesses } from "../data/businesses";
import { usePageMeta } from "../hooks/usePageMeta";

const overview = [
  { label: "商号", value: company.legalName },
  { label: "英文名", value: company.englishName },
  {
    label: "代表者",
    value: `${company.representativeTitle}　${company.representative}`,
  },
  {
    label: "所在地",
    value: `${company.postalCode} ${company.address}`,
  },
  { label: "事業内容", value: company.business },
];

export default function CompanyPage() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "会社情報｜T-connect",
    description: `${company.legalName}の会社情報。BPO・コンサルティング、探偵、宝飾、起業家育成の4事業を展開。`,
  });

  return (
    <main className="top-page">
      <section className="hero hero--page" id="page-hero" aria-label="会社情報">
        <div className="hero__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=80"
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
            <p className="hero__brand">Company</p>
            <h1 className="hero__title">会社情報</h1>
            <p className="hero__lead">{companyMission.tagline}</p>
          </motion.div>
        </div>
      </section>

      <ValueSection id="company-value" />

      <MessageSection />

      <section className="section section--muted top-company" aria-labelledby="overview-title">
        <FadeIn className="section__inner top-company__inner">
          <header className="top-section-head top-section-head--stack">
            <p className="section__label">Overview</p>
            <h2 className="section__title" id="overview-title">
              会社概要
            </h2>
          </header>
          <dl className="company-dl">
            {overview.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </section>

      <section className="section top-biz" aria-labelledby="biz-title">
        <FadeIn className="section__inner">
          <header className="top-section-head top-section-head--stack">
            <p className="section__label">Business</p>
            <h2 className="section__title" id="biz-title">
              事業一覧
            </h2>
          </header>
          <div className="biz-detail-grid">
            {businesses.map((b) => (
              <Link
                to={b.path}
                key={b.slug}
                className="biz-detail-card biz-detail-card--link"
              >
                <p className="biz-detail-card__en">{b.en}</p>
                <h3>{b.name}</h3>
                <p>{b.tagline}</p>
                {b.status === "preparing" && (
                  <span className="biz-card__badge">準備中</span>
                )}
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
