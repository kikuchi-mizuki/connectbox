import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../../components/CtaButton";
import FadeIn from "../../components/FadeIn";
import { LINE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

const chips = ["自動で記録", "日当が見える", "報告書まで"];

const beforeAfter = [
  { before: "移動を手入力", after: "GPSで自動記録" },
  { before: "日当を手計算", after: "自動で確認" },
  { before: "月末に報告書", after: "記録から作成" },
  { before: "根拠が曖昧", after: "移動履歴が残る" },
];

const flow = [
  {
    n: "01",
    title: "記録する",
    body: "アプリがGPSで移動を取得",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
  },
  {
    n: "02",
    title: "確認する",
    body: "私用の移動はWebで除外",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    n: "03",
    title: "日当が出る",
    body: "ログから清算額を表示",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    n: "04",
    title: "報告書へ",
    body: "記録から作成までつなぐ",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
];

const faqs = [
  {
    q: "LogTrackは、何のサービスですか？",
    a: "出張や移動の記録をアプリで残し、日当の計算と出張報告書の作成までつなげるクラウドです。手入力の精算を、移動の事実から自動に近づけます。",
  },
  {
    q: "日当を出すと、なぜ手取りに効くのですか？",
    a: "一定の要件を満たす日当は、税法上非課税とされる場合があります。役員報酬を上げるより、手取りに残りやすいことがあります。ただし要件と可否は顧問税理士の判断が必要です。LogTrackは、その判断の前提になる「いつ・どこへ動いたか」を残します。",
  },
  {
    q: "税務上、必ず認められるのですか？",
    a: "いいえ。LogTrackは税務の保証をするものではありません。移動の事実をデータとして残す仕組みです。導入の可否や日当の設計は、税理士とあわせてご確認ください。",
  },
  {
    q: "私用の移動も記録されますか？",
    a: "移動ログは取得されます。Web画面で履歴を確認し、対象外の移動は除外できます。",
  },
  {
    q: "いきなり契約する必要がありますか？",
    a: "いいえ。まずはLINEで、出張の多さやいまの精算方法をお聞かせください。",
  },
];

export default function LogTrackLp() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "LogTrack",
    description:
      "出張の移動を自動記録し、日当の計算と出張報告書までつなげる。LogTrackの案内。",
  });

  return (
    <main className="lt-page">
      <section className="lt-hero" id="page-hero" aria-label="メインビジュアル">
        <div className="lt-hero__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2400&q=80"
            alt=""
          />
          <div className="lt-hero__shade" />
        </div>
        <div className="lt-hero__copy">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="lt-logo">LogTrack</p>
            <h1>
              出張の移動を自動で残し、
              <br />
              日当と報告書までつなげる。
            </h1>
            <p className="lt-hero__sub">
              出張・外勤の多い企業向け。
              <br />
              GPSで移動履歴を自動記録し、日当計算・出張報告まで効率化します。
            </p>
            <ul className="lt-chips">
              {chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="lt-hero__cta">
              <CtaButton className="btn--large">導入の相談をする</CtaButton>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="lt-block" aria-labelledby="change-title">
        <FadeIn className="lt-wrap">
          <p className="section__label">Change</p>
          <h2 className="lt-section-title" id="change-title">
            出張精算、こう変わります
          </h2>
          <div className="lt-ba">
            <div className="lt-ba__head">
              <span className="lt-ba__label lt-ba__label--before">いま</span>
              <span />
              <span className="lt-ba__label lt-ba__label--after">LogTrack導入後</span>
            </div>
            {beforeAfter.map((row) => (
              <div className="lt-ba__row" key={row.before}>
                <span className="lt-ba__before">{row.before}</span>
                <span className="lt-ba__arrow" aria-hidden="true" />
                <span className="lt-ba__after">{row.after}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="lt-block lt-block--muted" aria-labelledby="example-title">
        <FadeIn className="lt-wrap">
          <p className="section__label">Example</p>
          <h2 className="lt-section-title" id="example-title">
            例えば、こんな運用に
          </h2>
          <div className="lt-example">
            <div className="lt-example__step">
              <span className="lt-example__n">01</span>
              <p>営業5名が月10回出張</p>
            </div>
            <span className="lt-example__down" aria-hidden="true">
              ↓
            </span>
            <div className="lt-example__step">
              <span className="lt-example__n">02</span>
              <p>移動履歴を自動記録</p>
            </div>
            <span className="lt-example__down" aria-hidden="true">
              ↓
            </span>
            <div className="lt-example__step">
              <span className="lt-example__n">03</span>
              <p>日当確認・報告書作成を一本化</p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="lt-why-band" aria-labelledby="why-title">
        <div className="lt-why-band__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=80"
            alt=""
          />
          <div className="lt-why-band__shade" />
        </div>
        <FadeIn className="lt-why-band__copy">
          <p className="section__label" id="why-title">
            Why
          </p>
          <h2 className="lt-section-title">
            日当の運用には、
            <br />
            移動の記録が重要です
          </h2>
          <p>
            出張日・訪問先・移動履歴などを記録として残すことで、出張実態を確認しやすい運用へ。
          </p>
          <p>
            一定の要件を満たす日当は、非課税とされる場合があります。LogTrackは、その判断の前提になる「いつ・どこへ動いたか」をデータとして残します。
          </p>
          <p className="lt-note">
            税務の保証ではありません。可否は顧問税理士の判断です。
          </p>
        </FadeIn>
      </section>

      <section className="lt-block" aria-labelledby="flow-title">
        <FadeIn className="lt-wrap">
          <p className="section__label">Flow</p>
          <h2 className="lt-section-title" id="flow-title">
            記録して、見て、出して、残す
          </h2>
          <ol className="lt-flow">
            {flow.map((s) => (
              <li key={s.n}>
                <img src={s.image} alt="" />
                <span>{s.n}</span>
                <strong>{s.title}</strong>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </FadeIn>
      </section>

      <section className="lt-block" aria-labelledby="faq-title">
        <FadeIn className="lt-wrap">
          <p className="section__label">FAQ</p>
          <h2 className="lt-section-title" id="faq-title">
            よくあるご質問
          </h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="lt-download" id="final-cta">
        <div className="lt-download__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2400&q=80"
            alt=""
          />
          <div className="lt-download__shade" />
        </div>
        <FadeIn className="lt-download__inner">
          <h2>
            出張の精算が、
            <br />
            いまどうなっているかから
          </h2>
          <p>
            移動の多さ、日当の有無、報告書の作り方をLINEでお聞かせください。
          </p>
          <CtaButton className="btn--large btn--pulse" />
          <p className="mail-hint">
            LINE：{" "}
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
              lin.ee/RiVp6pb
            </a>
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
