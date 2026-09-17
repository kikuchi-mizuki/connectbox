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
  connectBoxCases,
  connectBoxCatalog,
  connectBoxClosing,
  connectBoxContacts,
  connectBoxPrice,
} from "../../data/connectBox";
import { getService } from "../../data/services";
import { usePageMeta } from "../../hooks/usePageMeta";

const pains = [
  "社長が事務作業までやっている",
  "経理・総務に時間が取られている",
  "採用担当が足りない",
  "人を採用するほどではないが、業務量が多い",
  "固定費を増やさず、業務を外に出したい",
];

const featuredSlugs = ["back-office", "ryohi-one"] as const;

const contactHrefs = {
  line: CONNECT_BOX_LINE_URL,
  meeting: CONNECT_BOX_MEETING_URL,
  email: `mailto:${CONNECT_BOX_EMAIL}`,
} as const;

export default function ConnectBoxPage() {
  const reduce = useReducedMotion();
  const featured = featuredSlugs
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  usePageMeta({
    title: "Connect Box｜企業と人の課題を、ひとつの窓口で",
    description:
      "Connect Box（コネクトボックス）。人を増やす前に、業務を外に出す。企業と人のあらゆる課題を、ひとつの窓口で。バックオフィス代行から採用・戦略・制作まで、必要な分だけ支援します。",
    keywords:
      "Connect Box,コネクトボックス,BPO,バックオフィス代行,旅費One,外部経営チーム,業務委託,T-connect",
    path: "/connect-box",
  });

  return (
    <main>
      <section className="hero" id="page-hero" aria-label="メインビジュアル">
        <div className="hero__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80"
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
            <p className="hero__brand">Connect Box</p>
            <h1 className="hero__title">
              人を増やす前に、
              <br />
              業務を外に出しませんか？
            </h1>
            <p className="hero__lead">
              {connectBoxBrand.concept}。
              <br />
              経理・総務・人事・営業事務などのバックオフィス業務を代行し、属人化や繁忙期の揺れにも耐えられる体制をつくります。いきなり契約ではありません。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="pain-title">
        <FadeIn className="section__inner">
          <p className="section__label">Challenges</p>
          <h2 className="section__title" id="pain-title">
            こんなお悩み、ありませんか
          </h2>
          <p className="section__lead">
            人を足すほどではないが、社内の時間が事務に取られている。そんな相談から始まっています。
          </p>
          <ul className="pain-list">
            {pains.map((item, i) => (
              <li key={item}>
                <span className="pain-list__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="section section--ink" aria-labelledby="promise-title">
        <FadeIn className="section__inner">
          <p className="section__label">Promise</p>
          <h2 className="section__title" id="promise-title">
            必要な業務だけ、
            <br />
            必要な期間だけ。
          </h2>
          <p className="section__lead">
            {connectBoxBrand.servicesLead}。
            <br />
            請求・経費・営業事務など、繰り返し発生する業務から外に出せます。採用の固定費をかけず、必要な時期・時間だけ体制を厚くできます。
          </p>
        </FadeIn>
      </section>

      <section className="section" id="featured" aria-labelledby="featured-title">
        <FadeIn className="section__inner">
          <p className="section__label">Start Here</p>
          <h2 className="section__title" id="featured-title">
            まずはここから
          </h2>
          <p className="section__lead">
            バックオフィスの代行から始める企業様が多いです。旅費管理の自動化もご相談いただけます。
          </p>
          <div className="catalog-grid catalog-grid--main">
            {featured.map((s) => {
              const comingSoon = s.status === "coming_soon";
              return (
                <Link
                  className="catalog-card catalog-card--lp"
                  to={s.path}
                  key={s.slug}
                >
                  <img src={s.heroImage} alt="" />
                  <p className="catalog-card__en">{s.en}</p>
                  <h3>
                    {s.name}
                    {comingSoon ? (
                      <span className="biz-card__badge catalog-card__badge-inline">
                        リリース前
                      </span>
                    ) : null}
                  </h3>
                  <p>{s.tagline}</p>
                  <span className="catalog-card__more">
                    {comingSoon ? "事前案内を見る" : "案内を見る"}
                  </span>
                </Link>
              );
            })}
          </div>
        </FadeIn>
      </section>

      <section className="section section--muted" id="services" aria-labelledby="services-title">
        <FadeIn className="section__inner">
          <p className="section__label">Services</p>
          <h2 className="section__title" id="services-title">
            支援サービス一覧
          </h2>
          <p className="section__lead">{connectBoxBrand.servicesNote}</p>
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

      <section className="section" aria-labelledby="cases-title">
        <FadeIn className="section__inner">
          <p className="section__label">Cases</p>
          <h2 className="section__title" id="cases-title">
            課題に合わせて、最適な支援を。
          </h2>
          <p className="section__lead">
            規模やフェーズに応じて、必要な支援だけを組み合わせます。
          </p>
          <div className="cb-case-grid">
            {connectBoxCases.map((c) => (
              <article className="cb-case" key={c.id}>
                <p className="cb-case__id">CASE {c.id}</p>
                <h3 className="cb-case__title">{c.label}</h3>
                <div className="cb-case__block">
                  <p className="cb-case__label">課題</p>
                  <ul className="cb-case__list">
                    {c.challenges.map((ch) => (
                      <li key={ch}>{ch}</li>
                    ))}
                  </ul>
                </div>
                <div className="cb-case__block">
                  <p className="cb-case__label">ご支援内容</p>
                  <div className="cb-case__tags">
                    {c.supports.map((s) => (
                      <span
                        key={s.label}
                        className={
                          s.tone === "orange"
                            ? "cb-case__tag cb-case__tag--accent"
                            : "cb-case__tag"
                        }
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section section--ink cb-price" aria-labelledby="price-title">
        <FadeIn className="section__inner cb-price__inner">
          <p className="section__label">Price</p>
          <h2 className="section__title" id="price-title">
            {connectBoxPrice.amount}
          </h2>
          <p className="section__lead">{connectBoxPrice.note}</p>
        </FadeIn>
      </section>

      <section className="section" aria-labelledby="benefits-title">
        <FadeIn className="section__inner">
          <p className="section__label">Benefits</p>
          <h2 className="section__title" id="benefits-title">
            導入するだけで、
            <br />
            経営の選択肢が増えます。
          </h2>
          <p className="section__lead">
            Connect Boxは、複数の業者に頼んでいた業務も、経営課題ごとまとめて引き受けます。
          </p>
          <ol className="cb-benefit-grid">
            {connectBoxBenefits.map((b) => (
              <li className="cb-benefit" key={b.n}>
                <span className="cb-benefit__n">{b.n}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ol>
          <p className="cb-closing">{connectBoxClosing}</p>
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
            どの領域からがよいか分からなくても構いません。ご都合のよい方法でご連絡ください。
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
