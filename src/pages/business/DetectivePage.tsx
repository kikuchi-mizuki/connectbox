import FadeIn from "../../components/FadeIn";
import {
  DETECTIVE_LINE_URL,
  DETECTIVE_TEL,
  DETECTIVE_TEL_DISPLAY,
  SITE_URL,
} from "../../constants";
import { detectiveSeo } from "../../data/detectiveSeo";
import {
  detectiveBrand,
  detectiveMainService,
  detectiveOtherServices,
  tentOffice,
} from "../../data/tent";
import { usePageMeta } from "../../hooks/usePageMeta";

/** 第一訴求まわり（ページ全体で同じ言い方に揃える） */
const PRIMARY_CLAIM = "証拠が取れなければ、調査費用は0円";
const PRIMARY_NOTE =
  "※0円保証は浮気・不倫調査の各プランが対象です。他調査はお見積り時に条件をご説明します。詳細はご契約前に書面でご説明します。";

function getDetectiveJsonLd(faqs: { q: string; a: string }[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: tentOffice.name,
      description: detectiveSeo.description,
      url: detectiveSeo.canonical,
      telephone: DETECTIVE_TEL_DISPLAY,
      image: detectiveSeo.ogImage,
      logo: `${SITE_URL}${detectiveBrand.horizontalBlack}`,
      areaServed: "JP",
      priceRange: "¥¥¥",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "調査メニュー",
        itemListElement: [
          {
            "@type": "Offer",
            position: 1,
            name: detectiveMainService.name,
            description: detectiveMainService.bullets.join("／"),
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "JPY",
              description: `${detectiveMainService.priceLabel}（${detectiveMainService.priceNote}）`,
            },
          },
          ...detectiveOtherServices.map((item, index) => ({
            "@type": "Offer",
            position: index + 2,
            name: item.name,
            description: `${item.blurb}（お見積り）`,
          })),
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ];
}

const reasons = [
  {
    title: "同性の相談員が最初から最後まで",
    body: "話しづらいことも、ご希望の同性の担当が伺います。",
    icon: "talk" as const,
  },
  {
    title: "秘密を守ります",
    body: "連絡手段・時間帯はご希望に合わせます。",
    icon: "lock" as const,
  },
  {
    title: "経験のある調査チーム",
    body: "提携調査会社の創業から約30年。",
    icon: "team" as const,
  },
];

const stats = [
  { value: "同性", label: "相談員に相談可" },
  { value: "30年", label: "創業からの年数" },
  { value: "1万件以上", label: "調査実績" },
  { value: "0円", label: "取れなければ（浮気調査）" },
];

/** 提携調査会社のGoogleクチコミから抜粋 */
const voices = [
  {
    title: "勇気を出して相談して本当に良かった",
    body: "「探偵事務所と聞くだけで緊張していましたが、不安はすぐに消えました。報告も丁寧で、次の人生に前向きに進む決意ができています。」",
  },
  {
    title: "費用の見通しがしやすかった",
    body: "「相談から証拠取りまで任せられました。費用の見通しがしやすく、支払額の不安はありませんでした。」",
  },
  {
    title: "優しい言葉に何度も救われた",
    body: "「いつでも連絡してください、という言葉に何度も救われました。依頼して本当によかったです。」",
  },
];

const delivers = [
  {
    src: "/detective/scene-report.jpg",
    title: "調査報告書",
    body: "日時と行動を時系列でまとめます。",
  },
  {
    src: "/detective/scene-2.jpg",
    title: "調査映像・写真",
    body: "あとから見返せる記録をお渡しします。",
  },
  {
    src: "/detective/scene-consult.jpg",
    title: "報告面談",
    body: "結果と、この先の選択肢を整理します。",
  },
];

const flow = [
  {
    n: "01",
    title: "LINE・電話で相談",
    body: "同性の担当が伺います。",
    icon: "consult" as const,
  },
  {
    n: "02",
    title: "お見積り",
    body: "内容と総額を先に明示。",
    icon: "estimate" as const,
  },
  {
    n: "03",
    title: "ご契約",
    body: "書面確認のうえ開始。",
    icon: "contract" as const,
  },
  {
    n: "04",
    title: "調査",
    body: "進捗もご連絡します。",
    icon: "search" as const,
  },
  {
    n: "05",
    title: "ご報告",
    body: "報告書・映像で事実をお渡し。",
    icon: "report" as const,
  },
];

type ReasonIcon = (typeof reasons)[number]["icon"];
type FlowIcon = (typeof flow)[number]["icon"];

function ReasonGlyph({ name }: { name: ReasonIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (name === "talk") {
    return (
      <svg {...common}>
        <path d="M5 18.5V8.2A2.2 2.2 0 0 1 7.2 6h9.6A2.2 2.2 0 0 1 19 8.2v5.1a2.2 2.2 0 0 1-2.2 2.2H9.2L5 18.5z" />
        <path d="M8.5 10.2h7M8.5 13h4.5" />
      </svg>
    );
  }
  if (name === "lock") {
    return (
      <svg {...common}>
        <rect x="6.5" y="10.5" width="11" height="8.5" rx="1.6" />
        <path d="M9 10.5V8.2a3 3 0 0 1 6 0v2.3" />
        <path d="M12 13.6v2.2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="9" cy="9" r="2.2" />
      <circle cx="15.5" cy="9.5" r="2" />
      <path d="M4.8 17.5c.6-2.2 2.4-3.4 4.2-3.4s3.6 1.2 4.2 3.4" />
      <path d="M13.2 17.5c.4-1.6 1.6-2.6 3-2.6 1.2 0 2.2.7 2.8 2" />
    </svg>
  );
}

function FlowGlyph({ name }: { name: FlowIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (name === "consult") {
    return (
      <svg {...common}>
        <path d="M5 18.5V8.2A2.2 2.2 0 0 1 7.2 6h9.6A2.2 2.2 0 0 1 19 8.2v5.1a2.2 2.2 0 0 1-2.2 2.2H9.2L5 18.5z" />
        <path d="M8.5 10.2h7M8.5 13h4.5" />
      </svg>
    );
  }
  if (name === "estimate") {
    return (
      <svg {...common}>
        <rect x="6" y="4.5" width="12" height="15" rx="1.5" />
        <path d="M9 9h6M9 12.5h6M9 16h3.5" />
      </svg>
    );
  }
  if (name === "contract") {
    return (
      <svg {...common}>
        <path d="M8 4.5h6.5L18 8v11.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 19.5v-13A1.5 1.5 0 0 1 8.5 5" />
        <path d="M14 4.8V8h3.2M9.5 13.5l1.6 1.6 3.4-3.6" />
      </svg>
    );
  }
  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="10.5" cy="10.5" r="4.5" />
        <path d="M14.2 14.2 18.5 18.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="5.5" y="5" width="13" height="14" rx="1.5" />
      <path d="M8.5 9.5h7M8.5 13h7M8.5 16.5h4" />
    </svg>
  );
}

const faqs = [
  {
    q: "相談だけでもいいですか？",
    a: "はい。ご相談とお見積りは、ご契約まで無料です。契約を急かすことはありません。",
  },
  {
    q: "いくらかかりますか？",
    a: `まずはLINEか電話で、必要な範囲だけお見積りします。浮気調査の入口は${tentOffice.minPrice}〜（税込）、おまかせは${tentOffice.flatPlanTotal}（${tentOffice.flatPlanTaxNote}）。人探し・素行・ストーカーなどもご相談いただけます。`,
  },
  {
    q: "浮気以外の調査もお願いできますか？",
    a: "はい。メインは浮気・不倫調査ですが、ストーカー調査、盗聴・盗撮調査、婚前・素行調査、人探し・所在調査にも対応しています。料金はLINEか電話でお見積りします。",
  },
  {
    q: "証拠が取れなかったら？",
    a: `${PRIMARY_CLAIM}。浮気・不倫調査の各プランが対象です。他調査の条件はお見積り時にご説明します。くわしくはご契約前に書面でご説明します。`,
  },
  {
    q: "相手にバレませんか？",
    a: "経験のある調査チームが担当します。ご本人に気をつけていただきたいことも、事前にお伝えします。",
  },
  {
    q: "家族や職場に知られませんか？",
    a: "連絡の方法と時間帯はご希望に合わせます。ご相談内容は秘密として守ります。",
  },
  {
    q: "途中でやめられますか？",
    a: tentOffice.cancelPolicy,
  },
  {
    q: "結果が「白」だったら？",
    a: "疑いが晴れることも、ひとつの答えです。この先の関係を、報告面談で一緒に整理します。",
  },
  {
    q: "同性の相談員に相談できますか？",
    a: "はい。ご希望に合わせて、同性の相談員が対応します。男性・女性どちらからもご相談いただけます。",
  },
  {
    q: "慰謝料はどのくらいですか？",
    a: "一般的には50万〜300万円とされることがありますが、ケースにより異なります。受け取りを約束するものではありません。",
  },
];

function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.15em" height="1.15em" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.253 2 1.5 5.798 1.5 10.5c0 4.21 3.743 7.74 8.782 8.418.342.074.806.226.923.411.107.17.07.436.034.61l-.154.943c-.05.278-.224 1.088.953.593 1.178-.496 6.314-3.718 8.612-6.362C22.289 13.006 22.5 11.79 22.5 10.5 22.5 5.798 17.747 2 12 2z"
      />
    </svg>
  );
}

function CtaPair({ position }: { position: "footer" | "price" }) {
  const lineLabel =
    position === "price" ? "料金をLINEで聞く" : "LINEで相談する";
  const telLabel =
    position === "price" ? "電話で料金を聞く" : "電話で相談する";
  const hint =
    position === "price"
      ? "見積もりの相談だけでも構いません。"
      : "送るだけ・話すだけでも大丈夫です。契約を急かしません。";

  return (
    <div className="det-cta-pair">
      <a
        className="det-btn det-btn--line det-btn--lg"
        href={DETECTIVE_LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cta-position={position}
      >
        <LineIcon />
        {lineLabel}
      </a>
      <a
        className="det-btn det-btn--tel det-btn--lg"
        href={`tel:${DETECTIVE_TEL}`}
        data-cta-position={position}
      >
        {telLabel}
        <span className="det-btn__sub">{DETECTIVE_TEL_DISPLAY}</span>
      </a>
      <p className="det-cta-pair__hint">{hint}</p>
    </div>
  );
}

export default function DetectivePage() {
  const featuredVoice = voices[0];
  const otherVoices = voices.slice(1);
  const jsonLd = getDetectiveJsonLd(faqs);

  usePageMeta({
    title: detectiveSeo.title,
    description: detectiveSeo.description,
    keywords: detectiveSeo.keywords,
    path: detectiveSeo.path,
    ogTitle: detectiveSeo.title,
    ogDescription: detectiveSeo.description,
    ogImage: detectiveSeo.ogImage,
    ogSiteName: detectiveSeo.siteName,
  });

  return (
    <main className="det-main">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="det-fv" id="det-hero" aria-label="ファーストビュー">
        <div className="det-fv__media" aria-hidden="true">
          <img
            src="/detective/fv/hero.jpg"
            alt=""
            className="det-fv__photo"
            loading="eager"
            draggable={false}
          />
          <video
            className="det-fv__video"
            src="/detective/fv-opening.mp4"
            poster="/detective/fv/hero.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <div className="det-fv__panel">
          <img
            className="det-fv__logo"
            src={detectiveBrand.verticalBlack}
            alt={tentOffice.name}
            width={220}
            height={220}
          />
          <p className="det-fv__category">浮気・不倫調査</p>
          <p className="det-fv__empathy">
            事実がほしい。
            <br />
            でも、空振りの費用は怖い。
          </p>
          <h1 className="det-fv__copy">
            <span className="det-fv__condition">証拠が取れなければ、</span>
            <span className="det-fv__hook">
              調査費用は
              <strong>0円</strong>
            </span>
          </h1>
          <div className="det-fv__ctas">
            <a
              className="det-btn det-btn--line det-fv__cta"
              href={DETECTIVE_LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-position="fv"
            >
              <LineIcon />
              LINEで相談する
            </a>
            <a
              className="det-btn det-btn--tel det-fv__cta"
              href={`tel:${DETECTIVE_TEL}`}
              data-cta-position="fv"
            >
              電話で相談する
              <span className="det-btn__sub">{DETECTIVE_TEL_DISPLAY}</span>
            </a>
          </div>
          <p className="det-fv__reassure">
            相談だけでもOK。
            <br className="det-br-narrow" />
            契約を急かしません。
          </p>
          <nav className="det-jump" aria-label="ページ内リンク">
            <a href="#det-price">料金プラン</a>
            <a href="#det-voice">お客様の声</a>
          </nav>
        </div>
      </section>

      <section
        className="det-block det-block--ink"
        id="det-trust"
        aria-labelledby="trust-title"
      >
        <FadeIn className="det-block__inner" delay={0.04}>
          <figure className="det-block__visual">
            <img
              src="/detective/scene-consult-bright.jpg"
              alt=""
              loading="lazy"
            />
          </figure>
          <p className="det-block__eyebrow">まず、ひとりで抱えなくていい</p>
          <h2 id="trust-title" className="det-block__title">
            話しづらいことも、
            <br />
            同性の相談員に話せます
          </h2>
          <p className="det-block__lead">
            相談から報告まで同じ担当。
            <br />
            契約を急かさず、不安から整理します。
          </p>
          <ul className="det-reasons det-reasons--compact">
            {reasons.map((r) => (
              <li key={r.title} className="has-icon">
                <span className="det-reasons__icon">
                  <ReasonGlyph name={r.icon} />
                </span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="det-stats det-stats--4 det-stats--compact">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="det-tiny">
            ※年数・件数は提携調査会社の創業・累計実績です。
          </p>
        </FadeIn>
      </section>

      <section
        className="det-block det-block--mint det-price"
        id="det-price"
        aria-labelledby="price-title"
      >
        <FadeIn className="det-block__inner" delay={0.04}>
          <p className="det-block__eyebrow">お金の不安から、先に軽くする</p>
          <h2 id="price-title" className="det-block__title">
            いきなり高額で、
            <br />
            決めなくて大丈夫です
          </h2>
          <p className="det-block__lead">
            浮気・不倫調査の料金プランです。
            <br />
            相談だけでお見積りできます。
          </p>

          <div className="det-price__plans">
            <article className="det-price__plan det-price__plan--featured">
              <p className="det-price__plan-badge">はじめやすい</p>
              <h3>最初の一歩プラン</h3>
              <p className="det-price__plan-catch">大きな調査の前に、相手を確かめる</p>
              <p className="det-price__plan-price">
                <strong>{tentOffice.identityCheckPrice}</strong>
                <span>{tentOffice.identityCheckNote}</span>
              </p>
              <p className="det-price__plan-body">
                名前・住所・勤務先の確認。報告書つき。
              </p>
            </article>
            <article className="det-price__plan">
              <p className="det-price__plan-badge det-price__plan-badge--soft">
                総額が見える
              </p>
              <h3>おまかせプラン</h3>
              <p className="det-price__plan-catch">本調査の定額</p>
              <p className="det-price__plan-price">
                <strong>{tentOffice.flatPlanTotal}</strong>
                <span>{tentOffice.flatPlanTaxNote}</span>
              </p>
              <p className="det-price__plan-body">
                調査員2名・移動・撮影・報告書まで。
              </p>
            </article>
            <article className="det-price__plan">
              <h3>成功報酬プラン</h3>
              <p className="det-price__plan-catch">最初の負担を抑えたい方に</p>
              <p className="det-price__plan-price">
                <strong>{tentOffice.successDeposit}</strong>
                <span>{tentOffice.successTaxNote}</span>
              </p>
              <p className="det-price__plan-body">
                証拠が取れた場合のみ追加あり。
              </p>
            </article>
          </div>

          <ul className="det-assure" aria-label="料金の安心ポイント">
            <li>
              <strong>{PRIMARY_CLAIM}</strong>
              <span>浮気・不倫調査の各プランが対象</span>
            </li>
            <li>
              <strong>追加料金なし</strong>
              <span>お見積り以外はいただきません</span>
            </li>
            <li>
              <strong>契約前に総額</strong>
              <span>納得してから進められます</span>
            </li>
          </ul>
          <p className="det-tiny det-assure__note">
            ※関東以外の交通費・宿泊費は実費。{PRIMARY_NOTE.replace(/^※/, "")}
          </p>

          <CtaPair position="price" />

          <div className="det-survey" id="det-survey">
            <p className="det-survey__eyebrow">メイン以外のご相談</p>
            <h3 className="det-survey__title">
              浮気以外も、
              <br />
              ご相談いただけます
            </h3>
            <p className="det-survey__lead">
              他の調査はLINEか電話で
              <br />
              お見積りします。
            </p>
            <ul className="det-survey__list det-survey__list--secondary">
              {detectiveOtherServices.map((item) => (
                <li key={item.id} className="det-survey__item det-survey__item--secondary">
                  <img
                    className="det-survey__mark"
                    src={detectiveBrand.markBlack}
                    alt=""
                    width={18}
                    height={18}
                  />
                  <div>
                    <h4 className="det-survey__name">{item.name}</h4>
                    <p className="det-survey__blurb">{item.blurb}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </section>

      <section
        className="det-block det-block--dark"
        id="det-voice"
        aria-labelledby="voice-title"
      >
        <FadeIn className="det-block__inner">
          <p className="det-block__eyebrow">同じ不安から、一歩出た人の声</p>
          <h2 id="voice-title" className="det-block__title">
            相談して、不安が消えた
          </h2>
          <blockquote className="det-voice-feature">
            <p className="det-voice-feature__quote">“{featuredVoice.title}”</p>
            <p className="det-voice-feature__body">{featuredVoice.body}</p>
          </blockquote>
          <ul className="det-voices">
            {otherVoices.map((v) => (
              <li key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
          <p className="det-tiny">
            ※提携調査会社に寄せられた口コミ（Googleクチコミ）から一部を抜粋しています。
          </p>
        </FadeIn>
      </section>

      <section className="det-block det-block--light" aria-labelledby="give-title">
        <FadeIn className="det-block__inner">
          <h2 id="give-title" className="det-block__title det-block__title--dark">
            調査後にお渡しするもの
          </h2>
          <ul className="det-give">
            {delivers.map((d) => (
              <li key={d.title}>
                <img src={d.src} alt="" loading="lazy" />
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section
        className="det-block det-block--mint"
        id="det-flow"
        aria-labelledby="flow-title"
      >
        <FadeIn className="det-block__inner" delay={0.06}>
          <p className="det-block__eyebrow">全体の流れ</p>
          <h2 id="flow-title" className="det-block__title">
            相談から報告まで
          </h2>
          <ol className="det-flow-list">
            {flow.map((s) => (
              <li key={s.n}>
                <span className="det-flow-list__icon" aria-hidden="true">
                  <FlowGlyph name={s.icon} />
                </span>
                <div>
                  <p className="det-flow-list__n">{s.n}</p>
                  <strong>{s.title}</strong>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="det-tiny">ご相談・お見積りは、ご契約まで無料です。</p>
        </FadeIn>
      </section>

      <section className="det-block det-block--light" aria-labelledby="faq-title">
        <FadeIn className="det-block__inner">
          <h2 id="faq-title" className="det-block__title det-block__title--dark">
            よくあるご質問
          </h2>
          <div className="det-faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </FadeIn>
      </section>

      <section
        className="det-final"
        id="det-final-cta"
        aria-labelledby="final-title"
      >
        <FadeIn className="det-final__inner">
          <p className="det-final__eyebrow">ひとりで決めなくていい</p>
          <h2 id="final-title">
            まずは、いまの気持ちを
            <br />
            LINEか電話で聞かせてください
          </h2>
          <p className="det-final__lead">
            匿名でかまいません。
            <br />
            依頼するかどうかは、お話のあとで決められます。
          </p>
          <CtaPair position="footer" />
        </FadeIn>
      </section>
    </main>
  );
}
