import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import FadeIn from "../../components/FadeIn";
import { DETECTIVE_FORM_URL, DETECTIVE_LINE_URL } from "../../constants";
import { detectiveSeo } from "../../data/detectiveSeo";
import { detectiveInvestigations, tentOffice } from "../../data/tent";
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
    icon: "lock" as const,
  },
  {
    n: "02",
    title: "不安に寄り添い、事実で整理します",
    body: "感情をあおるのではなく、状況を丁寧に伺い、何を確かめるべきかを一緒に整理します。迷っている段階でもご相談ください。",
    icon: "listen" as const,
  },
  {
    n: "03",
    title: "証拠が、次の一手につながります",
    body: "報告書として事実を残し、話し合い・決断・専門家への相談など、その後の選択を支えます。",
    icon: "doc" as const,
  },
  {
    n: "04",
    title: "法令を守った調査のみ行います",
    body: "探偵業法をはじめ、法令の範囲内で調査します。無理な勧誘はいたしません。",
    icon: "scale" as const,
  },
];

const steps = [
  {
    title: "無料相談",
    body: "LINEまたはフォームで、いま感じている違和感をお聞かせください。",
    icon: "chat" as const,
  },
  {
    title: "ヒアリング",
    body: "状況を整理し、調べるべきポイントを一緒に絞り込みます。",
    icon: "listen" as const,
  },
  {
    title: "方針・お見積り",
    body: "調査の進め方と費用感をわかりやすくご案内します。",
    icon: "plan" as const,
  },
  {
    title: "調査",
    body: "秘密厳守のもと、必要な範囲で調査を実施します。",
    icon: "search" as const,
  },
  {
    title: "報告と今後の整理",
    body: "報告書をもとに、証拠の扱い方や次に取れる行動を整理します。",
    icon: "doc" as const,
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

type IconName =
  | "lock"
  | "listen"
  | "doc"
  | "scale"
  | "chat"
  | "plan"
  | "search"
  | "shield"
  | "talk"
  | "law";

function DetIcon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  const paths: Record<IconName, ReactNode> = {
    lock: (
      <>
        <rect x="9" y="14" width="14" height="12" rx="2" />
        <path d="M12 14v-3a4 4 0 0 1 8 0v3" />
        <circle cx="16" cy="20" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
    listen: (
      <>
        <path d="M8 18v-3a8 8 0 0 1 16 0v3" />
        <path d="M7 18h3v5H9a2 2 0 0 1-2-2v-3zM25 18h-3v5h1a2 2 0 0 0 2-2v-3z" />
      </>
    ),
    doc: (
      <>
        <path d="M10 6h9l5 5v15H10V6z" />
        <path d="M19 6v5h5M13 16h8M13 20h8M13 24h5" />
      </>
    ),
    scale: (
      <>
        <path d="M16 6v18M10 24h12" />
        <path d="M16 10h-7l2.5 6H16M16 10h7l-2.5 6H16" />
      </>
    ),
    chat: (
      <>
        <path d="M7 9h18v12H13l-4 4v-4H7V9z" />
        <path d="M12 14h8M12 18h5" />
      </>
    ),
    plan: (
      <>
        <rect x="8" y="7" width="16" height="18" rx="1.5" />
        <path d="M12 12h8M12 16h8M12 20h5" />
      </>
    ),
    search: (
      <>
        <circle cx="14" cy="14" r="6.5" />
        <path d="M19 19l5 5" />
      </>
    ),
    shield: (
      <>
        <path d="M16 5l10 4v7c0 6-4.5 10-10 11C10.5 26 6 22 6 16V9l10-4z" />
        <path d="M12.5 16.5l2.5 2.5 5-5" />
      </>
    ),
    talk: (
      <>
        <circle cx="11" cy="13" r="3.2" />
        <circle cx="21" cy="13" r="3.2" />
        <path d="M6.5 22c.8-3 2.8-4.5 4.5-4.5S14.5 19 15.2 22M16.8 22c.8-3 2.8-4.5 4.5-4.5s3.7 1.5 4.5 4.5" />
      </>
    ),
    law: (
      <>
        <path d="M16 6v18M9 24h14" />
        <path d="M11 10h10M13 10v3M19 10v3" />
        <path d="M8 16h4l-2 5H8l2-5zM20 16h4l-2 5h-2l2-5z" />
      </>
    ),
  };

  return (
    <svg className="det-icon" {...common}>
      {paths[name]}
    </svg>
  );
}

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
      href={DETECTIVE_LINE_URL}
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
    <main>
      <section className="det-hero" id="det-hero" aria-label="メインビジュアル">
        <div className="det-hero__content">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="det-hero__brand">
              <span className="det-hero__brand-en">{tentOffice.nameEn}</span>
              <span className="det-hero__brand-ja">{tentOffice.name}</span>
            </p>
            <h1>
              その不安、
              <br />
              一人で抱え込まないでください。
            </h1>
            <p className="det-hero__tagline">{tentOffice.tagline}</p>
            <p className="det-hero__promise">{tentOffice.message}</p>
            <p className="det-hero__lead">
              「気のせい」で済ませたい気持ちと、「確かめたい」気持ちが、同時にあるかもしれません。
              不倫・身辺・素行など、無料相談では状況の整理からお手伝いします。いきなり契約ではありません。
            </p>
            <div className="det-hero__cta">
              <LineButton className="det-btn--lg" />
              <FormButton className="det-btn--lg" />
            </div>
            <p className="det-hero__note">秘密厳守｜無料相談｜無理な勧誘はいたしません</p>
          </motion.div>
        </div>
        <div className="det-hero__media" aria-hidden="true">
          <div className="det-hero__scenes">
            <img src="/detective/scene-1.jpg" alt="" />
            <img src="/detective/scene-2.jpg" alt="" />
            <img src="/detective/scene-3.jpg" alt="" />
          </div>
          <div className="det-hero__shade" />
        </div>
      </section>

      <section className="det-trust" aria-label="安心のポイント">
        <div className="det-trust__inner">
          <div className="det-trust__item">
            <span className="det-trust__icon">
              <DetIcon name="shield" />
            </span>
            <strong>秘密厳守</strong>
            <span>相談内容を外部に漏らしません</span>
          </div>
          <div className="det-trust__item">
            <span className="det-trust__icon">
              <DetIcon name="talk" />
            </span>
            <strong>まずは無料相談</strong>
            <span>迷っている段階でも大丈夫です</span>
          </div>
          <div className="det-trust__item">
            <span className="det-trust__icon">
              <DetIcon name="law" />
            </span>
            <strong>法令遵守</strong>
            <span>探偵業法の範囲で調査します</span>
          </div>
        </div>
      </section>

      <section className="det-section det-section--pain" aria-labelledby="pain-title">
        <FadeIn className="det-section__inner det-split">
          <div className="det-split__copy">
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
          </div>
          <figure className="det-split__media">
            <img src="/detective/scene-consult.jpg" alt="" />
            <figcaption>一人で抱え込まなくていい。</figcaption>
          </figure>
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
                <div className="det-reason__mark">
                  <span className="det-reason__icon">
                    <DetIcon name={r.icon} />
                  </span>
                  <span className="det-reason__n">{r.n}</span>
                </div>
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
          <h2 id="service-title">見逃さない、3つの調査</h2>
          <p className="det-section__lead">
            「知りたいこと」に合わせて、調査の範囲をご提案します。迷っている段階でも大丈夫です。
          </p>
          <div className="det-service-grid">
            {detectiveInvestigations.map((s) => (
              <article key={s.title} className="det-service-card">
                <div className="det-service-card__media">
                  <img src={s.image} alt="" />
                </div>
                <div className="det-service-card__body">
                  <h3>{s.title}</h3>
                  <p className="det-service-card__slogan">{s.slogan}</p>
                  <p>{s.body}</p>
                </div>
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
                <div className="det-flow__body">
                  <span className="det-flow__icon">
                    <DetIcon name={s.icon} />
                  </span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
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
        <div className="det-final__bg" aria-hidden="true">
          <img src="/detective/scene-report.jpg" alt="" />
        </div>
        <FadeIn className="det-final__inner">
          <p className="det-final__brand">{tentOffice.name}</p>
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
            <a href={DETECTIVE_LINE_URL} target="_blank" rel="noopener noreferrer">
              lin.ee/zJ0hTwc
            </a>
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
