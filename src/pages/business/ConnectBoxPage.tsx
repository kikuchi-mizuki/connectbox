import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import {
  CONNECT_BOX_EMAIL,
  CONNECT_BOX_LINE_URL,
  CONNECT_BOX_MEETING_URL,
} from "../../constants";
import {
  connectBoxBenefits,
  connectBoxBrand,
  connectBoxCatalog,
  connectBoxContacts,
  connectBoxPrice,
} from "../../data/connectBox";
import { usePageMeta } from "../../hooks/usePageMeta";

const contactHrefs = {
  line: CONNECT_BOX_LINE_URL,
  meeting: CONNECT_BOX_MEETING_URL,
  email: `mailto:${CONNECT_BOX_EMAIL}`,
} as const;

export default function ConnectBoxPage() {
  const reduce = useReducedMotion();

  usePageMeta({
    title: "Connect Box｜企業と人の課題を、ひとつの窓口で",
    description:
      "Connect Box（コネクトボックス）。人を増やす前に、業務を外に出す。企業と人のあらゆる課題を、ひとつの窓口で。必要な分だけ支援します。",
    keywords:
      "Connect Box,コネクトボックス,BPO,バックオフィス代行,旅費One,外部経営チーム,業務委託,T-connect",
    path: "/connect-box",
  });

  return (
    <main>
      <section className="hero hero--page" id="page-hero" aria-label="メインビジュアル">
        <div className="hero__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80"
            alt=""
          />
          <div className="hero__shade" />
        </div>
        <div className="hero__content">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero__brand">Connect Box</p>
            <h1 className="hero__title">
              人を増やす前に、
              <br />
              業務を外に出しませんか？
            </h1>
            <p className="hero__lead">{connectBoxBrand.concept}。</p>
          </motion.div>
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="services-title">
        <FadeIn className="section__inner">
          <p className="section__label">Services</p>
          <h2 className="section__title" id="services-title">
            支援サービス一覧
          </h2>
          <p className="section__lead">
            {connectBoxBrand.servicesLead}。
            <br />
            {connectBoxBrand.servicesNote}
          </p>
          <ul className="cb-service-grid">
            {connectBoxCatalog.map((item) => {
              const inner = (
                <>
                  <span className="cb-service-item__n">{item.n}</span>
                  <span className="cb-service-item__body">
                    <strong>{item.name}</strong>
                    {item.note ? (
                      <span className="cb-service-item__note">{item.note}</span>
                    ) : null}
                    {item.status === "coming_soon" ? (
                      <span className="biz-card__badge">リリース前</span>
                    ) : null}
                  </span>
                  {item.path ? (
                    <span className="cb-service-item__more">
                      {item.status === "coming_soon" ? "事前案内" : "詳しく"}
                    </span>
                  ) : null}
                </>
              );

              return (
                <li key={item.n}>
                  {item.path ? (
                    <Link className="cb-service-item cb-service-item--link" to={item.path}>
                      {inner}
                    </Link>
                  ) : (
                    <div className="cb-service-item">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </section>

      <section className="section section--ink cb-value" aria-labelledby="value-title">
        <FadeIn className="section__inner">
          <p className="section__label">Value</p>
          <h2 className="section__title" id="value-title">
            必要な業務だけ、
            <br />
            必要な期間だけ。
          </h2>
          <p className="section__lead">
            複数の業者に頼んでいた業務も、経営課題ごとまとめて引き受けます。
          </p>
          <ol className="cb-benefit-grid cb-benefit-grid--compact">
            {connectBoxBenefits.map((b) => (
              <li className="cb-benefit cb-benefit--on-ink" key={b.n}>
                <span className="cb-benefit__n">{b.n}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ol>
          <div className="cb-value__price">
            <p className="cb-value__amount">{connectBoxPrice.amount}</p>
            <p className="cb-value__note">{connectBoxPrice.note}</p>
          </div>
        </FadeIn>
      </section>

      <section className="final-cta" id="final-cta" aria-labelledby="cta-title">
        <FadeIn className="final-cta__inner final-cta__inner--wide">
          <h2 id="cta-title">
            まずは、
            <br />
            御社の課題をお聞かせください
          </h2>
          <p>
            Connect Box　{connectBoxBrand.conceptShort}
            <br />
            ご都合のよい方法でご連絡ください。
          </p>
          <div className="cb-contact-grid">
            {connectBoxContacts.map((c) => (
              <a
                key={c.id}
                className={`cb-contact-card cb-contact-card--${c.id}`}
                href={contactHrefs[c.hrefKey]}
                {...(c.hrefKey === "email"
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <span className="cb-contact-card__title">{c.title}</span>
                <span className="cb-contact-card__sub">{c.sub}</span>
                {c.id === "email" ? (
                  <span className="cb-contact-card__meta">{CONNECT_BOX_EMAIL}</span>
                ) : null}
              </a>
            ))}
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
