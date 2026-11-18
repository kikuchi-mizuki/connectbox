import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import ConnectBoxContactCards from "../components/ConnectBoxContactCards";
import FadeIn from "../components/FadeIn";
import MessageSection from "../components/MessageSection";
import ValueSection from "../components/ValueSection";
import { company, companyMission } from "../data/company";
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
  { label: "主事業", value: company.businessPrimary },
  { label: "その他", value: company.businessOther },
];

export default function CompanyPage() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "会社情報｜株式会社T-connect（ティーコネクト）",
    description:
      "株式会社T-connect（ティーコネクト）の会社概要。代表・所在地（東京都新宿区）・主事業Connect Box（BPO・コンサルティング）。お問い合わせはLINE・オンライン相談・メールで。",
    keywords:
      "株式会社T-connect,ティーコネクト,会社情報,会社概要,所在地,代表取締役,Connect Box,コネクトボックス,公式",
    path: "/company",
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
            <p className="hero__brand">株式会社T-connect</p>
            <h1 className="hero__title">会社情報</h1>
            <p className="hero__lead">
              {companyMission.tagline}
              <br />
              主事業は Connect Box（BPO・コンサルティング）です。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section section--muted top-company" aria-labelledby="overview-title">
        <FadeIn className="section__inner top-company__inner">
          <header className="top-section-head top-section-head--stack">
            <p className="section__label">Overview</p>
            <h2 className="section__title" id="overview-title">
              会社概要
            </h2>
            <p className="top-section-head__lead">
              株式会社T-connect（ティーコネクト）の基本情報です。
            </p>
          </header>
          <dl className="company-dl">
            {overview.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="section__more-link">
            <Link to="/connect-box">主事業 Connect Box の詳細 →</Link>
          </p>
        </FadeIn>
      </section>

      <ValueSection id="company-value" />

      <MessageSection />

      <section className="section top-cta" aria-labelledby="company-contact-title">
        <FadeIn className="section__inner top-cta__inner">
          <p className="section__label">Contact</p>
          <h2 className="section__title top-section-title" id="company-contact-title">
            お問い合わせ
          </h2>
          <p className="top-cta__lead">
            Connect Box へのご相談は、ご都合のよい方法でご連絡ください。
          </p>
          <ConnectBoxContactCards ctaPosition="company" />
        </FadeIn>
      </section>
    </main>
  );
}
