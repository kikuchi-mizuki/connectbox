import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import {
  DETECTIVE_LINE_URL,
  DETECTIVE_TEL,
  DETECTIVE_TEL_DISPLAY,
} from "../../constants";
import { detectiveSeo } from "../../data/detectiveSeo";
import { tentOffice } from "../../data/tent";
import { usePageMeta } from "../../hooks/usePageMeta";

const NOTE2 =
  "※証拠が取れなかった場合、お預かりした調査費用は全額返金します。条件の詳細はご契約前に書面でご説明します。";

/**
 * 気持ちの流れ。
 * lines = 意図した改行位置（スマホで変な折り返しをしない）
 * src = 縦構図に切り出したFV専用画像（主題が大きく見える）
 */
const storyBeats: ReadonlyArray<{
  src: string;
  lines: readonly [string, string];
  focus: string;
}> = [
  {
    src: "/detective/fv/01-late.jpg",
    lines: ["最近、", "帰りが遅くなった。"],
    focus: "center 38%",
  },
  {
    src: "/detective/fv/02-hide.jpg",
    lines: ["誰かと二人で、", "どこかへ向かっている。"],
    focus: "center 55%",
  },
  {
    src: "/detective/fv/03-doubt.jpg",
    lines: ["信じたい。", "でも、確かめたい。"],
    focus: "center 36%",
  },
  {
    src: "/detective/fv/04-fact.jpg",
    lines: ["その疑いを、", "事実に変える。"],
    focus: "center 48%",
  },
];

const BEAT_MS = 3000;

const reasons = [
  {
    title: "証拠が取れなければ0円",
    body: "取れなかった調査費用は全額返金。条件は契約前に書面で示します。",
  },
  {
    title: "女性の相談窓口",
    body: `${tentOffice.counselorName}（女性）が対応。急かさず、話しづらいことも伺います。`,
  },
  {
    title: "秘密を守る",
    body: "連絡の手段・時間帯はご希望どおり。無断で第三者へ伝えません。",
  },
  {
    title: "追加料金の後出しなし",
    body: "範囲と費用は見積りで事前提示。見積り外をあとから請求しません。",
  },
];

const stats = [
  { value: "3万件", label: "これまでのご相談" },
  { value: "1万件+", label: "現場調査の実績" },
  { value: "97.5%", label: "証拠を取れた割合" },
  { value: "30年", label: "現場ひとすじの経験" },
  { value: "0円", label: "証拠なしの場合" },
];

/** お客様の声（匿名・要約。文言はミノガサン向けに作成） */
const voices = [
  {
    who: "40代・女性",
    title: "話しづらいことも、受け止めてもらえました",
    body: "女性の相談窓口だと聞いて連絡しました。疑いを口にするだけでも辛かったのに、急かされず状況を整理できました。調査後の報告も丁寧で、次にどうするか決められました。",
  },
  {
    who: "30代・男性",
    title: "白と分かり、気持ちが楽になりました",
    body: "自分でも調べようとして空回りしていました。相談の段階で進め方と費用の見通しを説明してもらい、納得して頼めました。結果が白で、夫婦で話し合うきっかけになりました。",
  },
  {
    who: "50代・女性",
    title: "報告書が、そのまま次の判断材料になりました",
    body: "日時と行動が時系列で残っていて分かりやすかったです。弁護士に相談するときも、何を伝えればよいか迷いませんでした。連絡の時間帯も希望どおりで助かりました。",
  },
];

const delivers = [
  {
    src: "/detective/scene-report.jpg",
    title: "調査報告書",
    body: "日時・場所・行動を記録した書面です。弁護士への提出も想定した体裁でお渡しします。",
  },
  {
    src: "/detective/scene-2.jpg",
    title: "調査映像・写真",
    body: "現場で撮った映像と写真を、時系列がわかる形に整理してお渡しします。",
  },
  {
    src: "/detective/scene-consult.jpg",
    title: "報告面談",
    body: "結果の読み方と、この先の選択肢（話し合う／弁護士／様子を見る）を一緒に整理します。",
  },
];

const flow = [
  {
    n: "01",
    title: "無料相談",
    body: "いまの状況を伺います。ご契約までは費用はかかりません。",
  },
  {
    n: "02",
    title: "お見積り",
    body: "調査の範囲と日数に応じた費用を、事前に明示します。",
  },
  {
    n: "03",
    title: "ご契約",
    body: "内容・費用・返金条件を書面で確認してから進めます。",
  },
  {
    n: "04",
    title: "調査",
    body: "経験のある調査員が、相手に気づかれないよう実態を調べます。",
  },
  {
    n: "05",
    title: "ご報告",
    body: "報告書と映像をお渡しし、今後の選択を一緒に整理します。",
  },
];

const faqs = [
  {
    q: "相手に調査がバレませんか？",
    a: "経験を積んだ調査チームが担当します。調査の進め方と、注意していただきたい点は事前にお伝えします。",
  },
  {
    q: "家族や職場に知られませんか？",
    a: "連絡の手段・時間帯はご希望に合わせます。ご相談内容は秘密として扱い、無断で第三者には伝えません。",
  },
  {
    q: "途中でやめられますか？",
    a: `はい。${tentOffice.cancelPolicy}`,
  },
  {
    q: "結果が「白」（問題なし）だったら？",
    a: "疑いが晴れることも、ひとつの答えです。報告面談で、この先の関係の整理をお手伝いします。",
  },
  {
    q: "男性でも相談できますか？",
    a: "はい。男性からのご相談もお受けしています。相談窓口は女性スタッフも対応できます。",
  },
  {
    q: "関東以外でも頼めますか？",
    a: "全国に対応しています。関東以外で発生する交通費・宿泊費は実費をいただきます。",
  },
  {
    q: "相談だけでもいいですか？",
    a: "はい。ご相談とお見積りは、ご契約まで無料です。無理にお勧めすることはありません。",
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

function CtaPair({ position }: { position: "footer" }) {
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
  const dockRef = useRef<HTMLDivElement>(null);
  const fvRef = useRef<HTMLElement>(null);
  const resumeTimer = useRef<number | null>(null);
  const [beat, setBeat] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = storyBeats[beat];

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

  /* 案内ドックは最初から表示。実高を --det-dock-h に反映 */
  useEffect(() => {
    const dock = dockRef.current;
    const fv = fvRef.current;
    if (!dock || !fv) return;
    const sync = () => {
      const h = Math.ceil(dock.getBoundingClientRect().height);
      if (h > 0) fv.style.setProperty("--det-dock-h", `${h}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(dock);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (reduce) {
      setBeat(storyBeats.length - 1);
      return;
    }
    if (paused) return;
    // 最終ビートのあともループしてストーリーを回す
    const id = window.setInterval(() => {
      setBeat((i) => (i + 1) % storyBeats.length);
    }, BEAT_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const pauseBriefly = () => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 5000);
  };

  const goToBeat = (i: number) => {
    setBeat(i);
    pauseBriefly();
  };

  return (
    <main className="det-main">
      <section
        ref={fvRef}
        className="det-fv is-offer"
        id="det-hero"
        aria-label="ファーストビュー"
      >
        <div className="det-fv__stage" aria-hidden="true">
          {storyBeats.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt=""
              className={`det-fv__photo${i === beat ? " is-active" : ""}`}
              style={{ objectPosition: s.focus }}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          ))}
          <div className="det-fv__veil" />
        </div>

        <div className="det-fv__story">
          <p className="det-fv__brand">{tentOffice.name}</p>
          <div className="det-fv__line-wrap" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.lines.join("")}
                className="det-fv__line"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.lines[0]}
                <br />
                {current.lines[1]}
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="det-fv__tag">※再現映像です</p>

          <div className="det-fv__dots" role="tablist" aria-label="ストーリー">
            {storyBeats.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === beat}
                className={`det-fv__dot${i === beat ? " is-on" : ""}`}
                onClick={() => goToBeat(i)}
              >
                <span className="sr-only">{s.lines.join("")}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={dockRef} className="det-fv__dock is-ready">
          <h1 className="det-fv__offer">
            <span className="det-fv__offer-main">
              証拠が取れなければ<strong>0円</strong>
            </span>
            <span className="det-fv__offer-sub">
              まずは無料相談から。見積り以外の追加料金はありません。
            </span>
          </h1>
          <div className="det-fv__dock-cta">
            <a
              className="det-btn det-btn--line"
              href={DETECTIVE_LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-position="fv"
            >
              <LineIcon />
              LINEで無料相談
            </a>
            <a
              className="det-btn det-btn--tel"
              href={`tel:${DETECTIVE_TEL}`}
              data-cta-position="fv"
            >
              電話する
            </a>
          </div>
          <p className="det-fv__dock-note">{NOTE2}</p>
        </div>
      </section>

      <section
        className="det-block det-block--ink"
        aria-labelledby="reason-title"
      >
        <FadeIn className="det-block__inner">
          <h2 id="reason-title" className="det-block__title">
            ミノガサンが安心な理由
          </h2>
          <p className="det-block__lead">
            不安をあおらず、事実と選択肢を残します。
          </p>
          <ul className="det-reasons">
            {reasons.map((r) => (
              <li key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="det-block det-block--dark" aria-labelledby="stats-title">
        <FadeIn className="det-block__inner">
          <h2 id="stats-title" className="det-block__title">
            数字で見る、ミノガサン
          </h2>
          <p className="det-block__lead">
            相談・現場調査の実績と、証拠の取れやすさを一覧にしました。
          </p>
          <ul className="det-stats">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="det-tiny">※{tentOffice.successRateNote}</p>
        </FadeIn>
      </section>

      <section
        className="det-block det-block--ink"
        aria-labelledby="voice-title"
      >
        <FadeIn className="det-block__inner">
          <h2 id="voice-title" className="det-block__title">
            お客様の声
          </h2>
          <p className="det-block__lead">
            現場ひとすじ30年・調査実績1万件以上。これまでにご相談いただいた方の声です。
          </p>
          <ul className="det-voices">
            {voices.map((v) => (
              <li key={v.title}>
                <p className="det-voices__who">{v.who}</p>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
          <p className="det-tiny">
            ※個人が特定されないよう、内容は要約・編集しています。
          </p>
        </FadeIn>
      </section>

      <section className="det-block det-block--dark" aria-labelledby="give-title">
        <FadeIn className="det-block__inner">
          <h2 id="give-title" className="det-block__title">
            調査後にお渡しするもの
          </h2>
          <p className="det-block__lead">
            「何がわかったか」を、あとから見返せる形で残します。
          </p>
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

      <section className="det-block det-block--ink" aria-labelledby="flow-title">
        <FadeIn className="det-block__inner">
          <h2 id="flow-title" className="det-block__title">
            ご相談から報告までの流れ
          </h2>
          <p className="det-block__lead">
            いきなり契約ではありません。相談と見積もりは無料です。
          </p>
          <ol className="det-flow-list">
            {flow.map((s) => (
              <li key={s.n}>
                <span className="det-flow-list__n">{s.n}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="det-tiny">
            相談窓口：{tentOffice.counselorName}（女性）／ご希望に応じて対応します
          </p>
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
          <h2 id="final-title">
            まずは、いまのお気持ちを聞かせてください。
          </h2>
          <p className="det-final__lead">
            相談だけでも構いません。ご契約までは費用はかかりません。
          </p>
          <CtaPair position="footer" />
        </FadeIn>
      </section>
    </main>
  );
}
