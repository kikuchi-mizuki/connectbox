import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import { DETECTIVE_FORM_URL, LINE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

const pains = [
  "パートナーの帰宅時間や連絡が、最近おかしい気がする",
  "スマホや服装の変化が気になるが、問い詰める勇気がない",
  "疑いだけが膨らみ、夜も眠れない日が続いている",
  "証拠がなければ動けないが、誰にも相談できない",
];

const reasons = [
  {
    n: "01",
    title: "秘密を、最優先に守ります",
    body: "ご相談内容・調査内容は厳重に管理し、ご本人の同意なく第三者へ開示しません。周囲に知られない進め方を大切にします。",
  },
  {
    n: "02",
    title: "不安に寄り添い、事実で整理します",
    body: "感情をあおるのではなく、状況を丁寧に伺い、何を確かめるべきかを一緒に整理します。迷っている段階でもご相談ください。",
  },
  {
    n: "03",
    title: "証拠が、次の一手につながります",
    body: "報告書として事実を残し、話し合い・決断・専門家への相談など、その後の選択を支えます。",
  },
  {
    n: "04",
    title: "法令を守った調査のみ行います",
    body: "探偵業法をはじめ、法令の範囲内で調査します。無理な勧誘はいたしません。",
  },
];

const services = [
  {
    title: "尾行・行動確認",
    body: "「いつ・どこで・誰と」を事実として把握し、疑惑の有無をはっきりさせます。",
  },
  {
    title: "証拠撮影",
    body: "判断や話し合いに使えるよう、必要な場面を適切に記録します。",
  },
  {
    title: "調査報告書",
    body: "日時・場所・事実関係を整理した報告書をお渡しします。",
  },
];

const steps = [
  {
    title: "無料相談",
    body: "LINEまたはフォームで、いま感じている違和感をお聞かせください。",
  },
  {
    title: "ヒアリング",
    body: "状況を整理し、調べるべきポイントを一緒に絞り込みます。",
  },
  {
    title: "方針・お見積り",
    body: "調査の進め方と費用感をわかりやすくご案内します。",
  },
  {
    title: "調査",
    body: "秘密厳守のもと、必要な範囲で調査を実施します。",
  },
  {
    title: "報告と今後の整理",
    body: "報告書をもとに、証拠の扱い方や次に取れる行動を整理します。",
  },
];

const faqs = [
  {
    q: "相談したことは、誰かに知られますか？",
    a: "いいえ。ご相談・調査に関する情報は厳重に管理し、ご本人の同意なく第三者へ開示しません。",
  },
  {
    q: "まだ調査するか決めていなくても大丈夫ですか？",
    a: "はい。迷っている段階のご相談がほとんどです。話を聞いたうえで、調査が必要かどうかも一緒に整理できます。",
  },
  {
    q: "費用はどのくらいかかりますか？",
    a: "内容や期間によって異なります。まずは無料相談で状況を伺い、方針と費用感をお伝えします。無理な勧誘はしません。",
  },
  {
    q: "証拠はどのように使えますか？",
    a: "ご自身の判断材料としてご利用いただけます。法的な手続きでの活用については、必要に応じて専門家への相談もご案内します。",
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

function LineButton({
  className = "",
  children = "LINEで無料相談する",
}: {
  className?: string;
  children?: string;
}) {
  return (
    <a
      className={`det-btn det-btn--line ${className}`.trim()}
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <LineIcon />
      {children}
    </a>
  );
}

function FormButton({
  className = "",
  children = "フォームで無料相談する",
}: {
  className?: string;
  children?: string;
}) {
  return (
    <a
      className={`det-btn det-btn--outline ${className}`.trim()}
      href={DETECTIVE_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export default function DetectivePage() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "不貞調査の無料相談｜秘密厳守",
    description:
      "パートナーへの不安を、一人で抱え込まないでください。不貞調査の無料相談を受付中。秘密厳守。LINEまたはフォームからご相談ください。",
    keywords: "不貞調査,浮気調査,探偵,無料相談,秘密厳守",
    path: "/detective",
  });

  return (
    <main>
      <section className="det-hero" id="det-hero" aria-label="メインビジュアル">
        <div className="det-hero__content">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="det-hero__eyebrow">Infidelity Investigation</p>
            <h1>
              その不安、
              <br />
              一人で抱え込まないでください。
            </h1>
            <p className="det-hero__lead">
              「気のせい」で済ませたい気持ちと、「確かめたい」気持ちが、同時にあるかもしれません。
              不貞調査の無料相談では、状況の整理からお手伝いします。いきなり契約ではありません。
            </p>
            <div className="det-hero__cta">
              <LineButton className="det-btn--lg" />
              <FormButton className="det-btn--lg" />
            </div>
            <p className="det-hero__note">秘密厳守｜無料相談｜無理な勧誘はいたしません</p>
          </motion.div>
        </div>
        <div className="det-hero__media" aria-hidden="true">
          <div className="det-hero__team">
            <img src="/detective/member-1.jpg" alt="" />
            <img src="/detective/member-2.jpg" alt="" />
            <img src="/detective/member-3.jpg" alt="" />
          </div>
          <div className="det-hero__shade" />
        </div>
      </section>

      <section className="det-trust" aria-label="安心のポイント">
        <div className="det-trust__inner">
          <div className="det-trust__item">
            <strong>秘密厳守</strong>
            <span>相談内容を外部に漏らしません</span>
          </div>
          <div className="det-trust__item">
            <strong>まずは無料相談</strong>
            <span>迷っている段階でも大丈夫です</span>
          </div>
          <div className="det-trust__item">
            <strong>法令遵守</strong>
            <span>探偵業法の範囲で調査します</span>
          </div>
        </div>
      </section>

      <section className="det-section" aria-labelledby="pain-title">
        <FadeIn className="det-section__inner">
          <p className="det-section__label">Concerns</p>
          <h2 id="pain-title">
            こんな気持ち、
            <br />
            ありませんか
          </h2>
          <p className="det-section__lead">
            疑いを口にできないまま、毎日が過ぎていく。その苦しさから、相談は始まっています。
          </p>
          <ul className="det-pain-list">
            {pains.map((item, i) => (
              <li key={item}>
                <span className="det-pain-list__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="det-section det-section--navy" aria-labelledby="reason-title">
        <FadeIn className="det-section__inner">
          <p className="det-section__label">Why Us</p>
          <h2 id="reason-title">大切にしていること</h2>
          <p className="det-section__lead">
            不安をあおるのではなく、信頼できる事実と、その後の選択肢を残すことを大切にしています。
          </p>
          <div className="det-reasons">
            {reasons.map((r) => (
              <article key={r.n} className="det-reason">
                <span className="det-reason__n">{r.n}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="det-section det-section--paper" aria-labelledby="service-title">
        <FadeIn className="det-section__inner">
          <p className="det-section__label">Investigation</p>
          <h2 id="service-title">不貞調査でできること</h2>
          <p className="det-section__lead">
            主軸は不貞調査です。「知りたいこと」に合わせて、調査の範囲をご提案します。
          </p>
          <div className="det-service-rows">
            {services.map((s) => (
              <article key={s.title} className="det-service-row">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="det-section" aria-labelledby="flow-title">
        <FadeIn className="det-section__inner">
          <p className="det-section__label">Flow</p>
          <h2 id="flow-title">ご相談から報告までの流れ</h2>
          <p className="det-section__lead">
            まずは無料のご相談から。状況を伺ったうえで、進め方をご案内します。
          </p>
          <ol className="det-flow">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="det-flow__n">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="det-consult">
            <h3>まずは無料でご相談ください</h3>
            <p>
              どんな小さな違和感でも構いません。
              <br />
              LINEまたはフォームから、お気軽にご連絡ください。
            </p>
            <div className="det-consult__btns">
              <LineButton className="det-btn--lg" />
              <FormButton className="det-btn--lg" />
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="det-section det-section--soft" aria-labelledby="faq-title">
        <FadeIn className="det-section__inner">
          <p className="det-section__label">FAQ</p>
          <h2 id="faq-title">よくあるご質問</h2>
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

      <section className="det-final" id="det-final-cta" aria-labelledby="cta-title">
        <FadeIn className="det-final__inner">
          <h2 id="cta-title">
            今夜も、一人で
            <br />
            悩まなくていい。
          </h2>
          <p>
            いきなり契約ではありません。まずは無料のご相談から。
            秘密厳守で、あなたの話を伺います。
          </p>
          <div className="det-final__btns">
            <LineButton className="det-btn--lg" />
            <FormButton className="det-btn--lg" />
          </div>
          <p className="det-final__hint">
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
