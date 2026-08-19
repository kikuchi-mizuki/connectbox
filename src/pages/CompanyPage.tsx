import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../components/CtaButton";
import FadeIn from "../components/FadeIn";
import { LINE_URL } from "../constants";
import { company } from "../data/company";
import { usePageMeta } from "../hooks/usePageMeta";

const overview = [
  { label: "商号", value: company.legalName },
  { label: "英文名", value: company.englishName },
  { label: "サービス名", value: company.serviceName },
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
    title: "会社情報",
    description: `${company.serviceName}は、${company.legalName}が運営するサービスです。`,
  });

  return (
    <main>
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
            <p className="hero__lead">
              {company.serviceName}の運営会社、{company.legalName}の概要です。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="overview-title">
        <FadeIn className="section__inner">
          <p className="section__label">Overview</p>
          <h2 className="section__title" id="overview-title">
            会社概要
          </h2>
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

      <section className="section section--ink" aria-labelledby="value-title">
        <FadeIn className="section__inner prose">
          <p className="section__label">Stance</p>
          <h2 className="section__title" id="value-title">
            目先ではなく、未来を選べ
          </h2>
          <p className="section__lead">
            日々の判断で、自分本位ではなく、相手・仲間・会社の未来にとって最善かを考えます。
          </p>
          <p>
            目先の利益よりも長期的な信頼を優先します。相談の段階で、今やらなくてよい範囲もお伝えします。その積み重ねが、選ばれ続ける関係をつくります。
          </p>
        </FadeIn>
      </section>

      <section className="final-cta" id="final-cta" aria-labelledby="cta-title">
        <FadeIn className="final-cta__inner">
          <h2 id="cta-title">
            ご相談は、
            <br />
            LINEからどうぞ
          </h2>
          <p>
            公式アカウントを友だち追加のうえ、ご状況を簡単にお送りください。
          </p>
          <div className="cta-row">
            <CtaButton className="btn--large btn--pulse" />
          </div>
          <p className="mail-hint">
            友だち追加：{" "}
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
              lin.ee/RiVp6pb
            </a>
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
