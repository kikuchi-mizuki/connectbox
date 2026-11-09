import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import {
  DETECTIVE_LINE_URL,
  DETECTIVE_TEL,
  DETECTIVE_TEL_DISPLAY,
} from "../../constants";
import { detectiveSeo } from "../../data/detectiveSeo";
import { tentOffice } from "../../data/tent";
import { usePageMeta } from "../../hooks/usePageMeta";

/** 0円訴求の注釈（成功報酬の話はここに集約） */
const ZERO_NOTE =
  "※「成功報酬0円」は、成功報酬プランの成功報酬が対象です（最初にお預かりする費用はあります）。条件はご契約前に書面でご説明します。";

const reasons = [
  {
    title: "女性が、相談から報告まで担当",
    body: "話しづらいことも、女性の相談員が最初から最後まで伺います。",
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
  { value: "女性", label: "相談から報告まで" },
  { value: "30年", label: "創業からの年数" },
  { value: "1万件以上", label: "調査実績" },
  { value: "0円", label: "成功報酬（条件あり）" },
];

const voices = [
  {
    who: "40代・女性",
    title: "話しづらいことも、受け止めてもらえました",
    body: "女性の窓口だと聞いて連絡しました。急かされず整理でき、報告も丁寧でした。",
  },
  {
    who: "30代・男性",
    title: "白と分かり、気持ちが楽になりました",
    body: "費用の見通しを先に聞けたので安心でした。結果が白で、話し合うきっかけになりました。",
  },
  {
    who: "50代・女性",
    title: "報告書が、次の判断材料になりました",
    body: "日時と行動が分かりやすく、弁護士に相談するときも迷いませんでした。",
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
    title: "無料相談",
    body: "いまのお気持ちを、女性の担当が伺います。",
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
    q: "いくらかかりますか？",
    a: `おまかせプランは${tentOffice.flatPlanTotal}（税込・経費込み）。最初の一歩プランは${tentOffice.identityCheckPrice}、成功報酬プランは${tentOffice.successDeposit}〜です。正確な総額はLINEで無料でお伝えします。`,
  },
  {
    q: "証拠が取れなかったら？",
    a: "成功報酬プランでは、成功報酬はいただきません。最初にお預かりする費用はあります。おまかせプランは、結果が白でも総額は変わりません。条件はご契約前に書面でご説明します。",
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
    q: "男性でも相談できますか？",
    a: "はい。男性からのご相談もお受けしています。ご希望があれば女性の相談員が対応します。",
  },
  {
    q: "相談だけでもいいですか？",
    a: "はい。ご相談とお見積りは、ご契約まで無料です。",
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
        LINEで無料相談する
      </a>
      <a
        className="det-btn det-btn--tel det-btn--lg"
        href={`tel:${DETECTIVE_TEL}`}
        data-cta-position={position}
      >
        電話で相談する
        <span className="det-btn__sub">{DETECTIVE_TEL_DISPLAY}</span>
      </a>
    </div>
  );
}

export default function DetectivePage() {
  const reduce = useReducedMotion();
  const featuredVoice = voices[0];
  const otherVoices = voices.slice(1);
  const priceBarsRef = useRef<HTMLDivElement>(null);
  const [barsVisible, setBarsVisible] = useState(false);

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

  useEffect(() => {
    if (reduce) {
      setBarsVisible(true);
      return;
    }
    const el = priceBarsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setBarsVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

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
          <p className="det-fv__category">浮気・不倫調査</p>
          <h1 className="det-fv__copy">
            <span className="det-fv__empathy">
              帰りが遅くなった夜から、ここへ。
            </span>
            <span className="det-fv__answer">
              証拠が取れなければ、<strong>成功報酬0円</strong>
            </span>
          </h1>
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
          <nav className="det-jump" aria-label="ページ内リンク">
            <a href="#det-promise">成功報酬0円</a>
            <a href="#det-price">料金を見る</a>
            <a href="#det-flow">進め方</a>
          </nav>
        </div>
      </section>

      <section
        className="det-block det-block--ink det-promise"
        id="det-promise"
        aria-labelledby="promise-title"
      >
        <FadeIn className="det-block__inner">
          <p className="det-promise__zero" aria-hidden="true">
            成功報酬0円
          </p>
          <h2 id="promise-title" className="det-block__title">
            証拠が取れなければ、成功報酬0円
          </h2>
          <p className="det-tiny">{ZERO_NOTE}</p>
          <a className="det-promise__link" href="#det-price">
            料金・プランを見る
          </a>
        </FadeIn>
      </section>

      <section
        className="det-block det-block--mint det-human"
        aria-labelledby="human-title"
      >
        <FadeIn className="det-block__inner" delay={0.05}>
          <div className="det-human__accent" aria-hidden="true">
            <img
              src="/detective/people/counselor-gen-a.jpg"
              alt=""
              className="det-human__face"
              loading="lazy"
            />
          </div>
          <h2 id="human-title" className="det-block__title">
            話しづらいことも、女性に話せます
          </h2>
          <p className="det-block__lead">
            相談から報告まで、女性の相談員が担当します。無理に契約を急かしません。
          </p>
        </FadeIn>
      </section>

      <section
        className="det-block det-block--ink"
        aria-labelledby="reason-title"
      >
        <FadeIn className="det-block__inner" delay={0.08}>
          <h2 id="reason-title" className="det-block__title">
            はじめてでも、安心な理由
          </h2>
          <figure className="det-reason-scene">
            <img
              src="/detective/scene-consult-bright.jpg"
              alt=""
              loading="lazy"
            />
            <figcaption>落ち着いて話せる相談の場を、大切にしています。</figcaption>
          </figure>
          <ul className="det-reasons">
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
        </FadeIn>
      </section>

      <section className="det-block det-block--mint" aria-labelledby="stats-title">
        <FadeIn className="det-block__inner" delay={0.06}>
          <h2 id="stats-title" className="det-block__title">
            提携調査チームの実績
          </h2>
          <ul className="det-stats det-stats--4">
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
        className="det-block det-block--ink det-price"
        id="det-price"
        aria-labelledby="price-title"
      >
        <FadeIn className="det-block__inner" delay={0.04}>
          <h2 id="price-title" className="det-block__title">
            料金について
          </h2>
          <p className="det-block__lead">
            他社の見え方を知ったうえで、3つのプランから選べます。
          </p>

          <div className="det-price-compare">
            <p className="det-price-compare__badge">総額で比べる</p>
            <h3 className="det-price-compare__title">
              他社より、最後の金額が分かりやすい
            </h3>
            <p className="det-price-compare__lead">
              他社は「基本料金」のほかに追加費用が乗りやすく、最終的に高くなりがちです。ミノガサンのおまかせプランは{tentOffice.flatPlanTotal}にまとまっているので、最初から総額が見えます。
            </p>
            <div
              ref={priceBarsRef}
              className={`det-price-bars${barsVisible ? " is-visible" : ""}`}
              aria-label="他社との総額比較"
            >
              <div className="det-price-bars__row">
                <span className="det-price-bars__name">他社にありがちな総額</span>
                <div className="det-price-bars__track">
                  <div
                    className="det-price-bars__fill det-price-bars__fill--other"
                    style={{ ["--det-bar-w" as string]: "100%" }}
                  >
                    {tentOffice.marketTotalRange}＋追加費用
                  </div>
                </div>
              </div>
              <div className="det-price-bars__row">
                <span className="det-price-bars__name">
                  ミノガサン <em>おまかせプラン</em>
                </span>
                <div className="det-price-bars__track">
                  <div
                    className="det-price-bars__fill det-price-bars__fill--ours"
                    style={{ ["--det-bar-w" as string]: "62%" }}
                  >
                    {tentOffice.flatPlanTotal}で完結
                  </div>
                </div>
              </div>
            </div>
            <p className="det-tiny" style={{ marginTop: "0.7rem" }}>
              ※{tentOffice.compareSource}関東以外の遠方費用は実費です。
            </p>
          </div>

          <h3 className="det-price__h3">選べる3つのプラン</h3>
          <div className="det-price__plans">
            <article className="det-price__plan">
              <h3>最初の一歩プラン</h3>
              <p className="det-price__plan-catch">大きな調査の前に、相手を確かめる</p>
              <p className="det-price__plan-price">
                <strong>{tentOffice.identityCheckPrice}</strong>
                <span>税込・報告書つき</span>
              </p>
              <p className="det-price__plan-body">
                相手の名前・住所・勤務先を確かめたい方へ。
              </p>
            </article>
            <article className="det-price__plan det-price__plan--featured">
              <p className="det-price__plan-badge">おすすめ</p>
              <h3>おまかせプラン</h3>
              <p className="det-price__plan-catch">総額が、最初から見える</p>
              <p className="det-price__plan-price">
                <strong>{tentOffice.flatPlanTotal}</strong>
                <span>経費込み・税込</span>
              </p>
              <p className="det-price__plan-body">
                調査員2名・移動・撮影・報告書まで経費込み。白でも黒でも、答えとして受け取りたい方に。
              </p>
            </article>
            <article className="det-price__plan">
              <h3>成功報酬プラン</h3>
              <p className="det-price__plan-catch">最初の負担を抑えたい方に</p>
              <p className="det-price__plan-price">
                <strong>{tentOffice.successDeposit}</strong>
                <span>〜</span>
              </p>
              <p className="det-price__plan-body">
                証拠が取れたら追加あり。取れなければ成功報酬は0円です。
              </p>
            </article>
          </div>
          <p className="det-tiny">{ZERO_NOTE}</p>

          <div className="det-price__box det-price__box--soft">
            <h3>慰謝料の一般的な目安</h3>
            <p>
              証拠がそろったあとの話ですが、一般的には50万〜300万円とされることがあります。
            </p>
            <p className="det-price__box-note">
              ※受け取りを約束するものではありません。
            </p>
          </div>

          <CtaPair position="price" />
        </FadeIn>
      </section>

      <section
        className="det-block det-block--dark"
        aria-labelledby="voice-title"
      >
        <FadeIn className="det-block__inner">
          <h2 id="voice-title" className="det-block__title">
            お客様の声
          </h2>
          <blockquote className="det-voice-feature">
            <p className="det-voice-feature__quote">“{featuredVoice.title}”</p>
            <p className="det-voice-feature__body">{featuredVoice.body}</p>
            <footer>{featuredVoice.who}</footer>
          </blockquote>
          <ul className="det-voices">
            {otherVoices.map((v) => (
              <li key={v.title}>
                <p className="det-voices__who">{v.who}</p>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
          <p className="det-tiny">
            ※個人が特定されないよう、内容は要約しています。
          </p>
        </FadeIn>
      </section>

      <section className="det-block det-block--ink" aria-labelledby="give-title">
        <FadeIn className="det-block__inner">
          <h2 id="give-title" className="det-block__title">
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
          <h2 id="flow-title" className="det-block__title">
            ご相談から報告までの流れ
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
          <h2 id="final-title">まずは、いまのお気持ちを聞かせてください。</h2>
          <p className="det-final__lead">
            ご契約を急ぐ必要はありません。相談だけでも構いません。
          </p>
          <CtaPair position="footer" />
        </FadeIn>
      </section>
    </main>
  );
}
