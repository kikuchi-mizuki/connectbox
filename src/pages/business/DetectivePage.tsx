import FadeIn from "../../components/FadeIn";
import {
  DETECTIVE_LINE_URL,
  DETECTIVE_TEL,
  DETECTIVE_TEL_DISPLAY,
} from "../../constants";
import { detectiveSeo } from "../../data/detectiveSeo";
import { tentOffice } from "../../data/tent";
import { usePageMeta } from "../../hooks/usePageMeta";

/** 第一訴求まわり（ページ全体で同じ言い方に揃える） */
const PRIMARY_CLAIM = "証拠が取れなければ、調査費用は0円";
const PRIMARY_NOTE =
  "※「調査費用は0円」は、すべてのプランが対象です。条件の詳細は、ご契約前に書面でご説明します。";

const reasons = [
  {
    title: "同性の相談員が、相談から報告まで担当",
    body: "話しづらいことも、ご希望の同性の相談員が最初から最後まで伺います。",
    icon: "talk" as const,
  },
  {
    title: "秘密を守ります",
    body: "連絡の手段や時間帯はご希望に合わせます。内容を無断で他人に伝えません。",
    icon: "lock" as const,
  },
  {
    title: "経験のある調査チーム",
    body: "提携調査会社の創業から約30年。進め方の不安も、相談の段階で一緒に整理します。",
    icon: "team" as const,
  },
];

const stats = [
  { value: "同性", label: "相談員に相談可" },
  { value: "30年", label: "創業からの年数" },
  { value: "1万件以上", label: "調査実績" },
  { value: "0円", label: "取れなければ（全プラン）" },
];

/** 比較はファクト列挙ではなく、ユーザーメリットで書く */
const priceCompareRows = [
  {
    item: "あとから金額が増えにくい",
    general: "人数×時間で増えるので、終わってみないと総額がわからない",
    ours: `定額だから、最初に決めた金額で進められる（おまかせ${tentOffice.flatPlanTotal}・${tentOffice.flatPlanTaxNote}）`,
  },
  {
    item: "空振りでも損しにくい",
    general: "証拠がなくても、動いた時間分は請求されやすい",
    ours: "証拠が取れなければ調査費用は0円。踏み出すハードルを下げられる",
  },
  {
    item: "納得してから依頼できる",
    general: "調査後に請求額を知ることになりやすい",
    ours: "ご契約前に総額が見えるので、不安を残したまま進めなくてよい",
  },
] as const;

/** 提携調査会社のGoogleクチコミから抜粋 */
const voices = [
  {
    title: "勇気を出して相談して本当に良かった",
    body: "「正直、最初は『探偵事務所』と聞くだけで緊張していましたが、扉を開けた瞬間にその不安はすぐに消えました。ご報告も丁寧で、状況を細かく説明してくださったおかげで、心の整理が着き、今では次の人生に前向きに進む決意ができています。」",
  },
  {
    title: "費用の見通しがしやすかった",
    body: "「調査実施日が未確定の中、配偶者の行動パターンに関しての相談に乗っていただき、不貞当日の証拠取りまで無事終えることができました。費用の見通しがしやすく、最終的な支払額に関しての不安は有りませんでした。」",
  },
  {
    title: "優しい言葉に何度も救われた",
    body: "「『不安なことがあればいつでも連絡してください』と言ってくださり、その優しい言葉に何度も救われました。調査もとても丁寧で、依頼して本当によかったと感じています。」",
  },
];

const delivers = [
  {
    src: "/detective/scene-report.jpg",
    title: "調査報告書",
    body: "いつ・どこで・何があったかを時系列でまとめます。",
  },
  {
    src: "/detective/scene-2.jpg",
    title: "調査映像・写真",
    body: "現場の記録を、あとから見返せる形でお渡しします。",
  },
  {
    src: "/detective/scene-consult.jpg",
    title: "報告面談",
    body: "結果の意味と、この先の選択肢を一緒に整理します。",
  },
];

const flow = [
  {
    n: "01",
    title: "LINE・電話で相談",
    body: "いまのお気持ちを、ご希望の同性の担当が伺います。",
    icon: "consult" as const,
  },
  {
    n: "02",
    title: "お見積り",
    body: "調査の内容と、お支払い総額を先に明示します。",
    icon: "estimate" as const,
  },
  {
    n: "03",
    title: "ご契約",
    body: "大切なお約束を書面で確認してから進めます。",
    icon: "contract" as const,
  },
  {
    n: "04",
    title: "調査",
    body: "途中の様子も、ご連絡します。",
    icon: "search" as const,
  },
  {
    n: "05",
    title: "ご報告",
    body: "報告書・映像・説明で、事実をお渡しします。",
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
    a: `まずはLINEか電話で、必要な範囲だけお見積りします。入口の最初の一歩プランは${tentOffice.minPrice}〜（税込）。本調査のおまかせプランは${tentOffice.flatPlanTotal}（${tentOffice.flatPlanTaxNote}）で総額が見えます。成功報酬プランは${tentOffice.successDeposit}〜（税込）です。`,
  },
  {
    q: "証拠が取れなかったら？",
    a: `${PRIMARY_CLAIM}。すべてのプランが対象です。くわしい条件は、ご契約前に書面でご説明します。`,
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
          <p className="det-fv__brand">{tentOffice.name}</p>
          <p className="det-fv__category">浮気・不倫調査専門</p>
          <p className="det-fv__empathy">
            事実がほしい。でも、空振りの費用は怖い。
          </p>
          <h1 className="det-fv__copy">
            <span className="det-fv__condition">証拠が取れなければ、</span>
            <span className="det-fv__hook">
              調査費用は
              <strong>0円</strong>
            </span>
          </h1>
          <p className="det-fv__resolve">見逃さない。疑いを、事実に変える。</p>
          <p className="det-fv__support">すべてのプランが対象です。相談だけでも大丈夫。</p>
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
            送るだけでもOK。契約を急かしません。
          </p>
          <nav className="det-jump" aria-label="ページ内リンク">
            <a href="#det-price">料金の見通し</a>
            <a href="#det-voice">お客様の声</a>
            <a href="#det-flow">進め方</a>
          </nav>
        </div>
      </section>

      <section
        className="det-block det-block--ink"
        id="det-trust"
        aria-labelledby="trust-title"
      >
        <FadeIn className="det-block__inner" delay={0.04}>
          <p className="det-block__eyebrow">まず、ひとりで抱えなくていい</p>
          <h2 id="trust-title" className="det-block__title">
            話しづらいことも、
            <br />
            同性の相談員に話せます
          </h2>
          <p className="det-block__lead">
            相談から報告まで同じ担当がつきます。契約を急かさず、いまの不安から一緒に整理します。
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
            {tentOffice.partnerYearsNote}
            <br />
            {tentOffice.partnerCasesNote}
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
            まずはLINEか電話で状況を整理し、必要な範囲だけお見積りします。
          </p>

          <ol className="det-price-steps" aria-label="料金の進め方">
            <li>
              <span className="det-price-steps__n">1</span>
              <div>
                <strong>LINE・電話で相談（契約なし）</strong>
                <p>相談だけでもOK。いまの状況を整理し、必要な範囲だけ見積もります。</p>
              </div>
            </li>
            <li>
              <span className="det-price-steps__n">2</span>
              <div>
                <strong>最初の一歩 {tentOffice.minPrice}〜</strong>
                <p>大きな調査の前に、相手を確かめる入口プランです。</p>
              </div>
            </li>
            <li>
              <span className="det-price-steps__n">3</span>
              <div>
                <strong>
                  本調査は定額 {tentOffice.flatPlanTotal}（{tentOffice.flatPlanTaxNote}）
                </strong>
                <p>追加なしで、最後の金額が最初に見えるおまかせプランです。</p>
              </div>
            </li>
          </ol>

          <ul className="det-assure" aria-label="料金の安心ポイント">
            <li>
              <strong>{PRIMARY_CLAIM}</strong>
              <span>空振りの不安を減らせます（全プラン対象）</span>
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
            ※関東以外の交通費・宿泊費は実費です。{PRIMARY_NOTE.replace(/^※/, "")}
          </p>

          <aside className="det-voice-teaser" aria-label="お客様の声（抜粋）">
            <p className="det-voice-teaser__quote">
              “{featuredVoice.title}”
            </p>
            <p className="det-voice-teaser__body">
              探偵事務所と聞いて緊張していたが、相談して不安が消えた——そんな声があります。
            </p>
            <a className="det-promise__link" href="#det-voice">
              お客様の声を読む
            </a>
          </aside>

          <CtaPair position="price" />

          <h3 className="det-price__h3">プランの詳細</h3>
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
                相手の名前・住所・勤務先を確かめたい方へ。報告書つき。
              </p>
            </article>
            <article className="det-price__plan">
              <p className="det-price__plan-badge det-price__plan-badge--soft">
                総額が見える
              </p>
              <h3>おまかせプラン</h3>
              <p className="det-price__plan-catch">本調査の定額。最後の金額が最初に分かる</p>
              <p className="det-price__plan-price">
                <strong>{tentOffice.flatPlanTotal}</strong>
                <span>{tentOffice.flatPlanTaxNote}</span>
              </p>
              <p className="det-price__plan-body">
                調査員2名・移動・撮影・報告書まで。白でも黒でも、答えとして受け取りたい方に。
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
                証拠が取れた場合のみ追加あり。最初の負担を抑えて進めたい方へ。
              </p>
            </article>
          </div>

          <div className="det-price-compare">
            <h3 className="det-price-compare__title">
              料金で、不安を残さないために
            </h3>
            <ul className="det-price-cards">
              {priceCompareRows.map((row) => (
                <li key={row.item} className="det-price-cards__row">
                  <p className="det-price-cards__item">{row.item}</p>
                  <div className="det-price-cards__cols">
                    <div className="det-price-cards__col">
                      <span className="det-price-cards__label">
                        時間料金制の一般的な例
                      </span>
                      <p>{row.general}</p>
                    </div>
                    <div className="det-price-cards__col det-price-cards__col--ours">
                      <span className="det-price-cards__label">
                        ミノガサン探偵事務所
                      </span>
                      <p>{row.ours}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="det-tiny det-price-cards__note">
              ※「時間料金制の一般的な例」は、調査員の人数と時間で料金を計算する料金体系を説明したもので、特定の事務所を示すものではありません。関東以外の交通費・宿泊費は実費です。
            </p>
          </div>

          <div className="det-price__box det-price__box--soft">
            <h3>慰謝料の一般的な目安</h3>
            <p>
              証拠がそろったあとの話ですが、一般的には50万〜300万円とされることがあります。調査費用を、その後の判断材料への投資として考える方もいます。
            </p>
            <p className="det-price__box-note">
              ※受け取りを約束するものではありません。
            </p>
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
          <p className="det-block__eyebrow">依頼する前に、全体が見える</p>
          <h2 id="flow-title" className="det-block__title">
            相談から報告まで、
            <br />
            5つのステップ
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
            匿名でかまいません。依頼するかどうかは、お話のあとで決められます。
          </p>
          <CtaPair position="footer" />
        </FadeIn>
      </section>
    </main>
  );
}
