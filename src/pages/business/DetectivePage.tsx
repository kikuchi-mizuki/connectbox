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

/** 成功報酬0円の条件（定額プランとは別） */
const SUCCESS_FEE_NOTE =
  "※成功報酬プランの場合。証拠が取れなければ成功報酬はいただきません（お支払いには着手金が含まれます）。条件はご契約前に書面でご説明します。";

const storyBeats: ReadonlyArray<{
  src: string;
  lines: readonly [string, string];
  focus: string;
}> = [
  {
    src: "/detective/fv/01-late.jpg",
    lines: ["最近、帰りが", "遅くなった。"],
    focus: "center 38%",
  },
  {
    src: "/detective/fv/02-hide.jpg",
    lines: ["誰かと二人で、", "どこかへ向かっている。"],
    focus: "center 55%",
  },
  {
    src: "/detective/fv/03-doubt.jpg",
    lines: ["信じたい。でも、", "確かめたい。"],
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
    title: "女性が相談から報告まで",
    body: "ご相談・ご契約・報告面談まで、女性の相談員が一貫して担当します。",
  },
  {
    title: "証拠が取れなければ成功報酬0円",
    body: "成功報酬プランなら、証拠が取れなければ成功報酬はいただきません。条件は契約前に書面で示します。",
  },
  {
    title: "経費込みの定額がある",
    body: `浮気・不倫調査は定額${tentOffice.flatPlanTotal}（税込・経費込み）も選べます。あとから経費を積み上げません。`,
  },
  {
    title: "秘密を守る",
    body: "連絡の手段や時間帯はご希望に合わせます。内容を無断で第三者へ伝えません。",
  },
];

/** 資料「選ばれる理由」に合わせて短く */
const stats = [
  { value: "女性", label: "相談から報告まで担当" },
  { value: "30年", label: "提携調査チームの調査歴" },
  { value: "97.5%", label: "証拠を確保できた割合" },
  { value: "2プラン", label: "定額／成功報酬" },
];

const priceIncludes = [
  "調査員2名の人件費",
  "関東近郊の交通費・車両費",
  "撮影機材・深夜早朝の調査",
  "調査報告書・調査映像",
  "報告面談",
];

const voices = [
  {
    who: "40代・女性",
    title: "話しづらいことも、受け止めてもらえました",
    body: "女性の相談窓口だと聞いて連絡しました。急かされず状況を整理でき、調査後の報告も丁寧でした。",
  },
  {
    who: "30代・男性",
    title: "白と分かり、気持ちが楽になりました",
    body: "進め方と費用の見通しを先に説明してもらい、納得して頼めました。結果が白で、話し合うきっかけになりました。",
  },
  {
    who: "50代・女性",
    title: "報告書が、次の判断材料になりました",
    body: "日時と行動が時系列で分かりやすく、弁護士に相談するときも迷いませんでした。",
  },
];

const delivers = [
  {
    src: "/detective/scene-report.jpg",
    title: "調査報告書",
    body: "日時・場所・写真を時系列でまとめ、弁護士への相談にも使える形でお渡しします。",
  },
  {
    src: "/detective/scene-2.jpg",
    title: "調査映像",
    body: "現場の調査責任者が、各場面を時系列で編集してお渡しします。",
  },
  {
    src: "/detective/scene-consult.jpg",
    title: "報告面談",
    body: "結果を説明し、これからの選択肢と相談先を一緒に整理します。",
  },
];

const flow = [
  { n: "01", title: "無料相談", body: "女性の担当が、いまのお気持ちを伺います。" },
  { n: "02", title: "お見積り", body: "調査の内容と総額を、先に明示します。" },
  { n: "03", title: "書面でご契約", body: "重要事項を書面で確認してから進めます。" },
  { n: "04", title: "調査", body: "途中経過もご連絡します。" },
  { n: "05", title: "ご報告", body: "報告書・映像・報告面談でお渡しします。" },
];

const faqs = [
  {
    q: "料金の目安は？",
    a: `浮気・不倫調査（調査員2名・20時間・税込）は、定額プラン${tentOffice.flatPlanTotal}（経費込み）、成功報酬プラン${tentOffice.successTotalRange}です。正確な総額はLINEで無料でお伝えします。`,
  },
  {
    q: "証拠が取れなかったら？",
    a: "成功報酬プランでは、成功報酬はいただきません。お支払いは着手金のみです。定額プランは、結果が白でも総額は変わりません。条件はご契約前に書面でご説明します。",
  },
  {
    q: "相手に調査がバレませんか？",
    a: "尾行・張込みの経験を積んだ調査チームが担当します。ご本人に気をつけていただきたいことも、事前にお伝えします。",
  },
  {
    q: "家族や職場に知られませんか？",
    a: "ご連絡の方法と時間帯はご希望に合わせます。探偵業法に基づき、ご相談の内容は秘密として守ります。",
  },
  {
    q: "途中でやめられますか？",
    a: tentOffice.cancelPolicy,
  },
  {
    q: "結果が「白」だったら？",
    a: "疑いが晴れることも、ひとつの答えです。報告面談で、これからの関係を一緒に整理します。",
  },
  {
    q: "男性でも相談できますか？",
    a: "はい。男性からのご相談もお受けしています。ご希望があれば女性の相談員が対応します。",
  },
  {
    q: "関東以外でも頼めますか？",
    a: "全国に対応しています。関東以外の交通費・宿泊費は実費です。見積りで事前に明示します。",
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
              証拠が取れなければ成功報酬<strong>0円</strong>
            </span>
            <span className="det-fv__offer-price">
              浮気調査 定額{tentOffice.flatPlanTotal}
              （経費込み）／成功報酬は{tentOffice.successDeposit}〜
            </span>
            <span className="det-fv__offer-sub">
              女性の相談員が、ご相談から報告まで担当します
            </span>
          </h1>
          <p className="det-fv__dock-pre">
            正確な総額は、LINEで無料でお伝えします
          </p>
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
          <p className="det-fv__dock-note">{SUCCESS_FEE_NOTE}</p>
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
          <ul className="det-stats det-stats--4">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="det-tiny">※97.5%：{tentOffice.successRateNote}</p>
        </FadeIn>
      </section>

      <section
        className="det-block det-block--ink det-price"
        id="det-price"
        aria-labelledby="price-title"
      >
        <FadeIn className="det-block__inner">
          <h2 id="price-title" className="det-block__title">
            料金について
          </h2>
          <p className="det-block__lead">
            浮気・不倫調査（調査員2名・20時間・税込）の総額です。
          </p>

          <div className="det-price__plans">
            <article className="det-price__plan">
              <h3>定額プラン</h3>
              <p className="det-price__plan-catch">総額がいちばん分かりやすい</p>
              <p className="det-price__plan-price">
                <strong>{tentOffice.flatPlanTotal}</strong>
                <span>経費込み</span>
              </p>
              <p className="det-price__plan-body">
                証拠が取れても追加なし。結果が白でも、答えとして受け取りたい方に。
              </p>
            </article>
            <article className="det-price__plan">
              <h3>成功報酬プラン</h3>
              <p className="det-price__plan-catch">最初の負担を抑えたい方に</p>
              <p className="det-price__plan-price">
                <strong>{tentOffice.successDeposit}</strong>
                <span>着手金</span>
              </p>
              <p className="det-price__plan-body">
                証拠が取れたら＋{tentOffice.successOnEvidence}
                。取れなければ成功報酬0円（お支払いは着手金のみ）。
              </p>
            </article>
          </div>
          <p className="det-tiny">{SUCCESS_FEE_NOTE}</p>

          <h3 className="det-price__h3">20時間お願いしたときの総額イメージ</h3>
          <div className="det-price-bars" aria-label="総額比較">
            <div className="det-price-bars__row">
              <span className="det-price-bars__name">一般的な事務所</span>
              <div className="det-price-bars__track">
                <div
                  className="det-price-bars__fill det-price-bars__fill--other"
                  style={{ width: "92%" }}
                >
                  {tentOffice.marketTotalRange}＋経費別
                </div>
              </div>
            </div>
            <div className="det-price-bars__row">
              <span className="det-price-bars__name">ミノガサン定額</span>
              <div className="det-price-bars__track">
                <div
                  className="det-price-bars__fill det-price-bars__fill--ours"
                  style={{ width: "70%" }}
                >
                  {tentOffice.flatPlanTotal}・経費込み
                </div>
              </div>
            </div>
          </div>
          <p className="det-tiny">
            ※比べるのは時間単価ではなく、最後にお支払いいただく総額です。
            出典：{tentOffice.compareSource}
            ミノガサンの関東以外での交通費・宿泊費は実費です。
          </p>

          <h3 className="det-price__h3">料金に含まれるもの</h3>
          <ul className="det-price__includes">
            {priceIncludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="det-price__includes-note">
            追加調査は、必ず事前にご説明し、ご了承をいただいてから行います。
          </p>

          <div className="det-price__box">
            <h3>まずは相手の身元だけ {tentOffice.identityCheckPrice}</h3>
            <p>
              {tentOffice.identityCheckNote}
              。名前・住所・勤務先が分かります。大きな費用の前に、相手を確かめたい方に。
            </p>
          </div>

          <div className="det-price__box det-price__box--soft">
            <h3>慰謝料の一般的な目安</h3>
            <p>事案により異なりますが、一般的には50万〜300万円とされることがあります。</p>
            <p className="det-price__box-note">
              ※慰謝料・弁護士費用は一般的な範囲の目安です。受け取りを約束するものではありません。
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

      <section className="det-block det-block--dark" aria-labelledby="flow-title">
        <FadeIn className="det-block__inner">
          <h2 id="flow-title" className="det-block__title">
            ご相談から報告までの流れ
          </h2>
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
