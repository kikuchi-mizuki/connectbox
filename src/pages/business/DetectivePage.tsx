import { useEffect, useRef } from "react";
import DetectiveLeadForm from "../../components/DetectiveLeadForm";
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

const FV_VIDEO_SRC = "/detective/fv-opening.mp4";

/** 初回表示をポスター優先にし、アイドル後に動画を読み込む */
function DetHeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slowNet =
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";
    if (reduceMotion || slowNet) return;

    let cancelled = false;
    const start = () => {
      if (cancelled || el.getAttribute("src")) return;
      el.src = FV_VIDEO_SRC;
      el.load();
      void el.play().catch(() => {});
    };

    // FVの主役なので遅延せずすぐ再生
    start();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <video
      ref={ref}
      className="det-fv__video"
      poster="/detective/fv/hero.jpg"
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}

/** 第一訴求まわり（ページ全体で同じ言い方に揃える） */
const DECISION_LINES = [
  "事実がほしい。",
  "でも、空振りで人生を壊したくない。",
] as const;
const PRIMARY_CLAIM = "証拠が取れなければ、調査費用は0円";
const PRIMARY_NOTE =
  "※すべての調査が対象です。条件はご契約前に書面でご説明します。";
const BRIDGE_LINE =
  "空振りの不安を小さくしてから、確かめにいけます。まずは金額感だけ。";

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

/** 決め手の裏付け（夜RECトーンの写真チャプター） */
const reasons = [
  {
    title: "取れなければ0円（全調査）",
    body: "空振りの費用を払わなくていいから、確かめにいけます。",
    image: "/detective/story-01.jpg",
  },
  {
    title: "話しづらいことは、同性の担当へ",
    body: "ご希望の同性の相談員が、最初から最後まで伺います。",
    image: "/detective/scene-consult.jpg",
  },
  {
    title: "契約前に、総額が見える",
    body: "納得してから進められます。追加料金はありません。",
    image: "/detective/story-03.jpg",
  },
];

/** 提携調査会社のGoogleクチコミから抜粋 */
const voices = [
  {
    title: "勇気を出して相談して本当に良かった",
    body: "探偵事務所と聞くだけで緊張していましたが、不安はすぐに消えました。報告も丁寧で、次の人生に前向きに進む決意ができています。",
    image: "/detective/story-02.jpg",
  },
  {
    title: "費用の見通しがしやすかった",
    body: "相談から証拠取りまで任せられました。費用の見通しがしやすく、支払額の不安はありませんでした。",
    image: "/detective/scene-1.jpg",
  },
  {
    title: "優しい言葉に何度も救われた",
    body: "いつでも連絡してください、という言葉に何度も救われました。依頼して本当によかったです。",
    image: "/detective/scene-report.jpg",
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
    src: "/detective/story-02.jpg",
    title: "報告面談",
    body: "結果と、この先の選択肢を整理します。",
  },
];

const flow = [
  {
    n: "01",
    title: "LINE・電話で相談",
    body: "同性の担当が伺います。",
    image: "/detective/scene-consult.jpg",
  },
  {
    n: "02",
    title: "お見積り",
    body: "内容と総額を先に明示。",
    image: "/detective/story-02.jpg",
  },
  {
    n: "03",
    title: "ご契約",
    body: "書面確認のうえ開始。",
    image: "/detective/scene-1.jpg",
  },
  {
    n: "04",
    title: "調査",
    body: "進捗もご連絡します。",
    image: "/detective/story-01.jpg",
  },
  {
    n: "05",
    title: "ご報告",
    body: "報告書・映像で事実をお渡し。",
    image: "/detective/scene-report.jpg",
  },
];

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
    a: `${PRIMARY_CLAIM}。すべての調査が対象です。条件はご契約前に書面でご説明します。`,
  },
  {
    q: "探偵と興信所は違いますか？",
    a: "呼び方の違いはありますが、浮気調査や人探しなど、調査の依頼先として探される点は共通です。当事務所は探偵業の届出を行い、興信所をお探しの方の費用・調査のご相談にも対応しています。",
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

/** 照準マーク（ブランド核） */
function SightMark({
  className = "",
  size = 28,
  tone = "on-dark",
}: {
  className?: string;
  size?: number;
  tone?: "on-dark" | "on-light";
}) {
  return (
    <img
      className={`det-sight ${className}`.trim()}
      src={
        tone === "on-light"
          ? detectiveBrand.markBlack
          : detectiveBrand.markWhite
      }
      alt=""
      width={size}
      height={size}
      draggable={false}
    />
  );
}

function CtaPair({ position }: { position: "footer" | "price" }) {
  const hint =
    position === "price"
      ? "状況を伺い、予算に合う進め方をご提案します。契約を急かしません。"
      : "まずは検討だけでも大丈夫です。予算のご相談も個別に乗ります。";

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
        LINEで無料相談
      </a>
      <a
        className="det-btn det-btn--tel det-btn--lg"
        href={`tel:${DETECTIVE_TEL}`}
        data-cta-position={position}
      >
        電話で無料相談
        <span className="det-btn__sub">{DETECTIVE_TEL_DISPLAY}</span>
      </a>
      <a
        className="det-btn det-btn--form det-btn--lg"
        href="#det-contact"
        data-cta-position={`${position}-form`}
      >
        フォームで無料相談
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
    noindex: true,
    ogTitle: detectiveSeo.title,
    ogDescription: detectiveSeo.description,
    ogImage: detectiveSeo.ogImage,
    ogSiteName: detectiveSeo.siteName,
  });

  return (
    <main className="det-main det-main--sight">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="det-fv det-fv--sight" id="det-hero" aria-label="ファーストビュー">
        <div className="det-fv__media" aria-hidden="true">
          <img
            src="/detective/fv/hero.jpg"
            alt=""
            className="det-fv__photo"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />
          <DetHeroVideo />
        </div>

        <div className="det-fv__panel">
          <div className="det-fv__brand">
            <p className="det-fv__tag">浮気・不倫を見逃さん</p>
          </div>

          <div className="det-fv__emotion">
            <h1 className="det-fv__decision">
              <span className="det-fv__decision-line">{DECISION_LINES[0]}</span>
              <span className="det-fv__decision-line det-fv__decision-line--em">
                {DECISION_LINES[1]}
              </span>
            </h1>
            <div className="det-fv__promise">
              <p className="det-fv__promise-label">
                <SightMark size={14} tone="on-light" />
                見逃さない、ための約束
              </p>
              <p className="det-fv__answer">
                <span className="det-fv__condition">証拠が取れなければ、</span>
                <span className="det-fv__hook">
                  調査費用は
                  <strong>
                    <span className="det-fv__zero">0</span>円
                  </strong>
                </span>
              </p>
              <p className="det-fv__note">{PRIMARY_NOTE}</p>
            </div>
          </div>

          <div className="det-fv__meta">
            <ul className="det-fv__stats" aria-label="実績">
              <li>
                <strong>{tentOffice.partnerYears}</strong>
                <span>{tentOffice.partnerYearsLabel}</span>
              </li>
              <li>
                <strong>{tentOffice.partnerCases}</strong>
                <span>{tentOffice.partnerCasesLabel}</span>
              </li>
            </ul>
            <p className="det-fv__stats-note">
              ※提携調査会社の創業年数・累計調査件数
            </p>
            <p className="det-fv__support">
              同性の担当が状況を伺います。予算も個別にご相談ください。
            </p>
            <p className="det-fv__price-line">
              入口
              <strong>
                {tentOffice.minPrice}
                <span>〜（税込）</span>
              </strong>
              <em>相談・見積り無料</em>
            </p>
          </div>

          <div className="det-fv__action">
            <div className="det-fv__ctas">
              <a
                className="det-btn det-btn--line det-fv__cta"
                href={DETECTIVE_LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-position="fv"
              >
                <LineIcon />
                LINEで無料相談
              </a>
              <a
                className="det-btn det-btn--tel det-fv__cta"
                href={`tel:${DETECTIVE_TEL}`}
                data-cta-position="fv"
              >
                電話で無料相談
                <span className="det-btn__sub">{DETECTIVE_TEL_DISPLAY}</span>
              </a>
              <a
                className="det-btn det-btn--form det-fv__cta"
                href="#det-contact"
                data-cta-position="fv-form"
              >
                フォームで無料相談
              </a>
            </div>
            <p className="det-fv__reassure">
              依頼を決めていなくて大丈夫です。
              <br className="det-br-narrow" />
              まずは金額感だけでも確認できます。
            </p>
          </div>

          <nav className="det-jump" aria-label="ページ内リンク">
            <a href="#det-trust">見逃さない理由</a>
            <a href="#det-price">料金の目安</a>
            <a href="#det-contact">無料相談</a>
          </nav>
        </div>
      </section>

      <section
        className="det-sight-head"
        id="det-trust"
        aria-labelledby="trust-title"
      >
        <FadeIn className="det-sight-head__inner">
          <h2 id="trust-title" className="det-sight-head__title">
            空振りの不安に、
            <br />
            照準を合わせる
          </h2>
          <p className="det-sight-head__lead">{BRIDGE_LINE}</p>
        </FadeIn>
      </section>

      <div className="det-chapters">
        {reasons.map((r, i) => (
          <section
            key={r.title}
            className={`det-chapter${i % 2 === 1 ? " det-chapter--flip" : ""}`}
            aria-labelledby={`reason-${i}`}
          >
            <FadeIn className="det-chapter__inner">
              <figure className="det-chapter__media det-shot">
                <img src={r.image} alt="" loading="lazy" />
                <span className="det-chapter__sight" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figure>
              <div className="det-chapter__copy">
                <h3 id={`reason-${i}`} className="det-chapter__title">
                  {r.title}
                </h3>
                <p className="det-chapter__body">{r.body}</p>
              </div>
            </FadeIn>
          </section>
        ))}
      </div>
      <p className="det-tiny det-trust__cred">
        調査は提携調査会社が担当（{tentOffice.partnerYearsLabel}
        {tentOffice.partnerYears}・{tentOffice.partnerCasesLabel}
        {tentOffice.partnerCases}）。
      </p>

      <section
        className="det-block det-price det-price--sight"
        id="det-price"
        aria-labelledby="price-title"
      >
        <FadeIn className="det-block__inner" delay={0.04}>
          <div className="det-sight-label">
            <SightMark size={16} tone="on-light" />
            <p className="det-block__eyebrow">探偵・興信所の費用</p>
          </div>
          <h2 id="price-title" className="det-block__title det-price__headline">
            いきなり高額で、
            <br />
            決めなくて大丈夫です
          </h2>
          <p className="det-block__lead">
            相談・お見積りは無料です。いきなり55万円を決める必要はありません。
            <br />
            入口は{tentOffice.minPrice}〜。まずは金額感だけ確かめられます。
          </p>

          <div className="det-price__plans det-price__plans--ladder">
            <a
              className="det-price__plan det-price__plan--featured det-price__plan--link"
              href={DETECTIVE_LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-position="price-plan"
            >
              <p className="det-price__plan-badge">はじめやすい</p>
              <h3>最初の一歩プラン</h3>
              <p className="det-price__plan-catch">
                大きな調査の前に、相手を確かめたい方へ
              </p>
              <p className="det-price__plan-price">
                <strong>{tentOffice.identityCheckPrice}</strong>
                <span>{tentOffice.identityCheckNote}</span>
              </p>
              <p className="det-price__plan-body">
                名前・住所・勤務先の確認。報告書つき。
              </p>
              <span className="det-price__plan-cta">LINEで無料相談</span>
            </a>
            <div className="det-price__plans-rest">
              <a
                className="det-price__plan det-price__plan--link det-price__plan--quiet"
                href={DETECTIVE_LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-position="price-plan"
              >
                <p className="det-price__plan-badge det-price__plan-badge--soft">
                  総額が見える
                </p>
                <h3>おまかせプラン</h3>
                <p className="det-price__plan-catch">
                  本調査の総額を、先に決めたい方へ
                </p>
                <p className="det-price__plan-price">
                  <strong>{tentOffice.flatPlanTotal}</strong>
                  <span>{tentOffice.flatPlanTaxNote}</span>
                </p>
                <p className="det-price__plan-body">
                  調査員2名・移動・撮影・報告書まで。
                </p>
                <span className="det-price__plan-cta">LINEで無料相談</span>
              </a>
              <a
                className="det-price__plan det-price__plan--link det-price__plan--quiet"
                href={DETECTIVE_LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-position="price-plan"
              >
                <h3>成功報酬プラン</h3>
                <p className="det-price__plan-catch">
                  最初の負担を抑えたい方へ
                </p>
                <p className="det-price__plan-price">
                  <strong>{tentOffice.successDeposit}</strong>
                  <span>{tentOffice.successTaxNote}</span>
                </p>
                <p className="det-price__plan-body">
                  証拠が取れた場合のみ追加あり。
                </p>
                <span className="det-price__plan-cta">LINEで無料相談</span>
              </a>
            </div>
          </div>

          <ul className="det-assure" aria-label="料金の安心ポイント">
            <li>
              <strong>{PRIMARY_CLAIM}</strong>
              <span>すべての調査が対象です</span>
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
            ※関東以外の交通費・宿泊費は実費です。
            <br />
            {PRIMARY_NOTE}
          </p>

          <CtaPair position="price" />

          <div className="det-survey det-survey--secondary" id="det-survey">
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
        className="det-voice-stage det-voice-stage--sight"
        id="det-voice"
        aria-labelledby="voice-title"
      >
        <FadeIn className="det-voice-stage__intro">
          <p className="det-sight-head__eyebrow">お客様の声</p>
          <h2 id="voice-title" className="det-sight-head__title">
            相談して、不安が消えた
          </h2>
        </FadeIn>

        <FadeIn className="det-voice-hero">
          <figure className="det-voice-hero__media det-shot" aria-hidden="true">
            <img src={featuredVoice.image} alt="" loading="lazy" />
          </figure>
          <blockquote className="det-voice-hero__quote">
            <p className="det-voice-hero__title">“{featuredVoice.title}”</p>
            <p className="det-voice-hero__body">{featuredVoice.body}</p>
          </blockquote>
        </FadeIn>

        <ul className="det-voice-rail">
          {otherVoices.map((v) => (
            <li key={v.title}>
              <FadeIn className="det-voice-card">
                <div className="det-voice-card__shot det-shot">
                  <img src={v.image} alt="" loading="lazy" />
                </div>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
        <p className="det-tiny det-voice-stage__note">
          ※提携調査会社に寄せられた口コミ（Googleクチコミ）から一部を抜粋しています。
        </p>
      </section>

      <section className="det-give-stage det-give-stage--sight" aria-labelledby="give-title">
        <FadeIn className="det-give-stage__head">
          <h2 id="give-title" className="det-sight-head__title">
            調査後にお渡しするもの
          </h2>
        </FadeIn>
        <ul className="det-give-rail">
          {delivers.map((d, i) => (
            <li key={d.title}>
              <FadeIn className="det-give-card" delay={0.04 * i}>
                <div className="det-give-card__shot det-shot">
                  <img src={d.src} alt="" loading="lazy" />
                  <span className="det-give-card__n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="det-give-card__copy">
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="det-flow-stage det-flow-stage--sight"
        id="det-flow"
        aria-labelledby="flow-title"
      >
        <FadeIn className="det-flow-stage__head">
          <h2 id="flow-title" className="det-sight-head__title">
            相談から報告まで
          </h2>
        </FadeIn>
        <ol className="det-flow-list det-flow-list--sight">
          {flow.map((s) => (
            <li key={s.n}>
              <div className="det-flow-row">
                <figure className="det-flow-row__media det-shot">
                  <img src={s.image} alt="" loading="lazy" />
                </figure>
                <div className="det-flow-row__copy">
                  <p className="det-flow-row__n">{s.n}</p>
                  <strong>{s.title}</strong>
                  <p>{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="det-tiny">ご相談・お見積りは、ご契約まで無料です。</p>
      </section>

      <section className="det-block det-faq-stage det-faq-stage--sight" aria-labelledby="faq-title">
        <FadeIn className="det-block__inner">
          <h2 id="faq-title" className="det-block__title">
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
        className="det-final det-final--sight"
        id="det-final-cta"
        aria-labelledby="final-title"
      >
        <div className="det-final__media det-shot" aria-hidden="true">
          <img src="/detective/story-03.jpg" alt="" loading="lazy" />
        </div>
        <FadeIn className="det-final__inner">
          <SightMark className="det-final__sight" size={40} />
          <p className="det-final__eyebrow">ひとりで決めなくていい</p>
          <h2 id="final-title">
            まずは、いまの状況を
            <br />
            聞かせてください
          </h2>
          <p className="det-final__lead">
            匿名でかまいません。予算も個別にご相談できます。
            <br />
            依頼するかどうかは、お話のあとで決められます。
          </p>
          <CtaPair position="footer" />
        </FadeIn>
      </section>

      <section
        className="det-contact-stage"
        id="det-contact"
        aria-labelledby="contact-form-title"
      >
        <FadeIn className="det-contact-stage__inner">
          <p className="det-contact-stage__eyebrow">無料相談</p>
          <h2 id="contact-form-title" className="det-contact-stage__title">
            フォームで相談・お見積り
          </h2>
          <p className="det-contact-stage__lead">
            状況とご予算を伺い、進め方をご提案します。契約の強制はありません。
            <br />
            連絡先だけでも大丈夫です。内容を確認のうえ、ご連絡します。
          </p>
          <DetectiveLeadForm />
        </FadeIn>
      </section>
    </main>
  );
}
