import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../components/FadeIn";
import { company } from "../data/company";
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
              {company.legalName}の概要です。
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

      <section className="section section--muted" aria-labelledby="biz-title">
        <FadeIn className="section__inner">
          <p className="section__label">Business</p>
          <h2 className="section__title" id="biz-title">
            事業一覧
          </h2>
          <div className="biz-detail-grid">
            {businesses.map((b) => (
              <Link to={b.path} key={b.slug} className="biz-detail-card biz-detail-card--link">
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
    </main>
  );
}
