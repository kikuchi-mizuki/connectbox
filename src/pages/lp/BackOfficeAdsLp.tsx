import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import BackOfficeDiagnostic from "../../components/BackOfficeDiagnostic";
import {
  IconCalendar,
  IconCheck,
  IconTrend,
} from "../../components/BackOfficeIcons";
import ConnectBoxLeadForm from "../../components/ConnectBoxLeadForm";
import FadeIn from "../../components/FadeIn";
import { SITE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

const PAGE_PATH = "/connect-box/ads/back-office";
const PAGE_TITLE =
  "オンライン秘書・事務代行｜月8万円から・2週間無料｜Connect Box";
const PAGE_DESCRIPTION =
  "オンライン秘書・事務代行を比較中の方向け。アポ・返信・追客まで対応。人材業界10年が人選し、顔合わせ後に開始。まずは2週間無料、続くなら月8万円から。";

function getBackOfficeServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "オンライン秘書・事務代行（営業事務特化）",
    alternateName: [
      "オンライン秘書",
      "事務代行",
      "営業事務代行",
      "秘書代行",
      "バックオフィス代行",
    ],
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}${PAGE_PATH}`,
    provider: {
      "@type": "Organization",
      name: "株式会社T-connect",
      url: `${SITE_URL}/`,
    },
    areaServed: "JP",
    serviceType: "オンライン秘書・事務代行",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
      description: "2週間無料トライアル",
    },
  };
}

const issues = [
  {
    n: "01",
    title: "アポが流れる",
    body: "前日連絡がなく、当日キャンセルになる",
    loss: "商談の数が減る",
  },
  {
    n: "02",
    title: "返信が遅れる",
    body: "翌営業日になり、その間に他社へ決まる",
    loss: "商談の入口が消える",
  },
  {
    n: "03",
    title: "社長が電話に出ている",
    body: "日程調整に営業時間が溶ける",
    loss: "売れる時間が減る",
  },
  {
    n: "04",
    title: "お客様を追えていない",
    body: "名刺と履歴が散らばり、再接触できない",
    loss: "決まる率が下がる",
  },
];

const levers = [
  {
    title: "商談の数を増やす",
    items: [
      "問い合わせの当日対応",
      "日程調整の往復をなくす",
      "資料・見積の作成補助",
    ],
  },
  {
    title: "決まる率を上げる",
    items: [
      "前日・当日のリマインド",
      "商談後フォローと顧客管理",
      "失注理由の記録と再接触",
    ],
  },
];

const resultMetrics = [
  {
    label: "アポイント確定数",
    before: "2件",
    after: "5件",
    hint: "商談の数（2週間）",
  },
  {
    label: "アポ実施率",
    before: "50%",
    after: "100%",
    hint: "流れる商談を止める",
  },
  {
    label: "追客からの再商談",
    before: "1件",
    after: "4件",
    hint: "決まる率の手前（2週間）",
  },
  {
    label: "社長が売れる時間",
    before: "ほぼ取れない",
    after: "週あたり+6時間",
    hint: "商談に戻す",
  },
];

const compareRows = [
  {
    other: "時間の切り売り・何でも屋",
    ours: "売上につながる事務（アポ・返信・追客）に特化",
  },
  {
    other: "誰が来るか分からないまま開始",
    ours: "担当者と顔合わせしてから開始",
  },
  {
    other: "マニュアルは汎用テンプレ",
    ours: "最初の業務特定は代表が入る",
  },
  {
    other: "安さで選ばれる設計",
    ours: "細やかさ（状況把握・先回り・継続）で選ぶ",
  },
];

const trustPoints = [
  {
    title: "細やかさが差別化です",
    body: "相手の状況を把握して連絡を書ける。言われる前に次に気づく。決めた手順を続けられる。安さでは選んでいません。",
  },
  {
    title: "人材業界10年の代表が立ち上げ",
    body: "経験はあるのに市場に出てこない方に届く母集団から、業務の近さで人選します。",
  },
  {
    title: "担当者と顔合わせしてから開始",
    body: "実際に対応する人と先に会えます。交代する場合も、後任の手配と引き継ぎは弊社で行います。",
  },
  {
    title: "最初の「見つける」は代表が入る",
    body: "どこで落ちているかを特定するところから、代表が必ず入ります。型にしてから実務へ渡します。",
  },
];

const salesTasks = [
  "問い合わせ対応",
  "受電対応",
  "テレアポ",
  "アポイント・リマインド",
  "顧客管理",
  "追客・掘り起こし",
];

const steps = [
  { title: "相談", body: "落ちている点を伺います" },
  { title: "確認", body: "どこから外すかを決めます" },
  { title: "無料2週間", body: "動かして数字を見ます" },
  { title: "振り返り", body: "続けるかその場で判断" },
];

const faqs = [
  {
    q: "なぜ無料でできるのですか？",
    a: "説明だけでは価値が伝わらないからです。2週間・稼働10〜20時間まで、有料開始後と同じ密度で動かします。合うかどうかを数字で判断していただくための期間です。",
  },
  {
    q: "誰が担当しますか？",
    a: "実務は経験のある担当者が行います。開始前に顔合わせをし、最初の業務特定（見つける）は代表が入ります。交代時の引き継ぎも弊社が行います。",
  },
  {
    q: "情報の扱い（秘密保持）は？",
    a: "ご契約時に秘密保持契約を結び、情報の取り扱いルールに沿って管理します。必要な権限・ツールだけをお預かりします。",
  },
  {
    q: "本当に無料ですか？",
    a: "はい。2週間・稼働10〜20時間まで無料です。無料のときだけ手厚い、ということはありません。",
  },
  {
    q: "掲載の数字は実績保証ですか？",
    a: "いいえ。問い合わせ対応などを任せた場合のレポート例です。御社の業務量・業界により変わります。",
  },
  {
    q: "料金の目安は？",
    a: "続ける場合は月額8万円〜（税別／月20時間相当・時間単価4,000円換算）。業務範囲の定額です。最低契約期間はありません。",
  },
  {
    q: "他のオンライン秘書・事務代行と何が違いますか？",
    a: "安さ勝負ではなく、人選・顔合わせ・代表による業務設計・売上につながる事務への特化です。比較検討中の方ほど、2週間無料で中身を見て判断してください。",
  },
  {
    q: "いきなり話すのは不安です",
    a: "先に無料簡易診断で、強化すべき領域だけ確認できます。人と話さずに結果が出ます。",
  },
];

/** 広告専用LP（/connect-box/ads/back-office・noindex） */
export default function BackOfficeAdsLp() {
  const reduce = useReducedMotion();

  usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords:
      "オンライン秘書,オンライン秘書 費用,事務代行,バックオフィス代行,営業事務 代行,秘書 業務委託,無料トライアル,Connect Box",
    path: PAGE_PATH,
    noindex: true,
    ogTitle: PAGE_TITLE,
    ogDescription: PAGE_DESCRIPTION,
  });

  function scrollToDiagnostic(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.getElementById("diagnostic")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBackOfficeServiceJsonLd()),
        }}
      />

      <section
        className="bo-hero"
        id="page-hero"
        aria-label="メインビジュアル"
      >
        <div className="bo-hero__bg" aria-hidden="true">
          <span className="bo-hero__glow bo-hero__glow--a" />
          <span className="bo-hero__glow bo-hero__glow--b" />
          <span className="bo-hero__grid" />
        </div>
        <div className="bo-hero__content">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="bo-hero__brand">Connect Box.</p>
            <p className="bo-hero__eyebrow">オンライン秘書・事務代行</p>
            <h1 className="bo-hero__title">
              オンライン秘書を、
              <br />
              <span className="bo-hero__price">月8万円から。</span>
            </h1>
            <p className="bo-hero__lead">
              アポ・返信・追客を任せられます。人材業界10年が人選し、顔合わせしてから開始。
              <br />
              <strong>まずは2週間無料。</strong>
              合うかは、数字を見てから判断できます。
            </p>
            <ul className="bo-hero__points">
              <li>担当者と顔合わせ</li>
              <li>代表が業務設計</li>
              <li>売上につながる事務に特化</li>
            </ul>
            <div className="cta-row bo-hero__cta">
              <a
                className="btn btn--primary btn--large"
                href="#final-cta"
                data-cta-position="hero"
              >
                2週間無料で試す
              </a>
              <a
                className="btn btn--secondary btn--large"
                href="#diagnostic"
                data-cta-position="hero"
                onClick={scrollToDiagnostic}
              >
                無料で簡易診断
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="compare-title">
        <FadeIn className="section__inner">
          <p className="section__label">Difference</p>
          <h2 className="section__title" id="compare-title">
            比較検討で負けないために、先に違いを出します
          </h2>
          <p className="section__lead">
            安いオンライン秘書・事務代行との違いです。月8万円は安さ勝負の金額ではありません。
          </p>
          <div className="bo-compare" role="table" aria-label="他社との違い">
            <div className="bo-compare__head" role="row">
              <span role="columnheader">よくあるオンライン秘書</span>
              <span role="columnheader">Connect Box</span>
            </div>
            {compareRows.map((row) => (
              <div className="bo-compare__row" role="row" key={row.ours}>
                <span role="cell">{row.other}</span>
                <span role="cell">{row.ours}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section section--muted" aria-labelledby="issue-title">
        <FadeIn className="section__inner">
          <p className="section__label">Issue</p>
          <h2 className="section__title" id="issue-title">
            売上が落ちる前に、事務が落ちている
          </h2>
          <p className="section__lead">
            どれも「誰かがやればいい」仕事。でも1人分ではない。だから採用に踏み切れず、商談だけが減っていく。
          </p>
          <ul className="bo-issue-list">
            {issues.map((item) => (
              <li key={item.n}>
                <span className="bo-issue-list__n">{item.n}</span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                  <em>{item.loss}</em>
                </div>
              </li>
            ))}
          </ul>
          <figure className="bo-photo">
            <img
              src="/connect-box/lp/desk-ops.jpg"
              alt="日程表と電話が並ぶ営業事務のデスク"
              width={1600}
              height={900}
              loading="lazy"
            />
            <figcaption>
              日程調整・返信・リマインドが回る机上が、売上の手前です。
            </figcaption>
          </figure>
        </FadeIn>
      </section>

      <section
        className="section section--ink"
        aria-labelledby="mechanism-title"
      >
        <FadeIn className="section__inner">
          <p className="section__label">Why it pays</p>
          <h2 className="section__title" id="mechanism-title">
            なぜ、売上が動くのか
          </h2>
          <p className="section__lead">
            商談の中身には触れません。判断は社内に残したまま、数と率だけを押し上げます。
          </p>
          <div className="bo-formula" aria-label="受注は商談の数かける決まる率">
            <div className="bo-formula__box">
              <IconTrend className="bo-formula__icon" />
              <span className="bo-formula__label">受注</span>
            </div>
            <span className="bo-formula__op" aria-hidden="true">
              =
            </span>
            <div className="bo-formula__box">
              <IconCalendar className="bo-formula__icon" />
              <span className="bo-formula__label">商談の数</span>
            </div>
            <span className="bo-formula__op" aria-hidden="true">
              ×
            </span>
            <div className="bo-formula__box">
              <IconCheck className="bo-formula__icon" />
              <span className="bo-formula__label">決まる率</span>
            </div>
          </div>
          <div className="bo-levers">
            {levers.map((block) => (
              <div key={block.title} className="bo-levers__col">
                <h3>{block.title}</h3>
                <ul>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section" aria-labelledby="result-title">
        <FadeIn className="section__inner">
          <p className="section__label">Result</p>
          <h2 className="section__title" id="result-title">
            2週間後に見るのは、稼げる数字です
          </h2>
          <p className="section__lead">
            お渡しする振り返りレポートのイメージです。返信スピードではなく、商談につながる指標で見ます。
          </p>
          <div className="bo-result-split">
            <figure className="bo-photo bo-photo--flush">
              <img
                src="/connect-box/lp/report-photo.jpg"
                alt="アポと追客の数字を確認するレポート資料"
                width={1600}
                height={900}
                loading="lazy"
              />
            </figure>
            <div className="bo-report">
              <div className="bo-report__chrome">
                <span className="bo-report__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <p className="bo-report__title">2週間レポート（例）</p>
                <p className="bo-report__meta">Connect Box. ／ 営業事務</p>
              </div>
              <ul className="bo-metrics">
                {resultMetrics.map((m) => (
                  <li key={m.label}>
                    <p className="bo-metrics__hint">{m.hint}</p>
                    <p className="bo-metrics__label">{m.label}</p>
                    <p className="bo-metrics__change">
                      <span>{m.before}</span>
                      <span aria-hidden="true">→</span>
                      <strong>{m.after}</strong>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="bo-note bo-note--emphasis">
            ※ 数字は例です。開始後も同じ形式で毎月共有します。
          </p>
        </FadeIn>
      </section>

      <section className="section section--muted" id="trial" aria-labelledby="trial-title">
        <FadeIn className="section__inner">
          <p className="section__label">Free Trial</p>
          <h2 className="section__title" id="trial-title">
            だから先に、2週間無料で動かします
          </h2>
          <p className="section__lead">
            説明だけでは信じにくい。実際に手を動かし、上記のような数字が動くところまで見せます。稼働量は有料開始後とほぼ同じです。
          </p>
          <ul className="bo-trial-rules">
            <li>稼働は10〜20時間まで（それ以上は有料）</li>
            <li>最終日に振り返り（決裁者の同席をお願いします）</li>
            <li>同時受付に上限あり</li>
          </ul>
          <div className="cta-row" style={{ marginTop: "1.5rem" }}>
            <a
              className="btn btn--primary btn--large"
              href="#final-cta"
              data-cta-position="trial"
            >
              無料トライアルを申し込む
            </a>
          </div>
        </FadeIn>
      </section>

      <section className="section" aria-labelledby="offer-title">
        <FadeIn className="section__inner">
          <p className="section__label">Scope</p>
          <h2 className="section__title" id="offer-title">
            まず任せるのは、売上をつくる事務
          </h2>
          <p className="section__lead">
            経理や集客も相談できますが、主戦場はこちらです。
          </p>
          <div className="service-grid">
            {salesTasks.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </FadeIn>
      </section>

      <section
        className="section section--muted"
        id="diagnostic"
        aria-labelledby="diagnostic-title"
      >
        <FadeIn className="section__inner bo-diag-section">
          <p className="section__label">Free Diagnostic</p>
          <h2 className="section__title" id="diagnostic-title">
            話す前に、強化ポイントを知る
          </h2>
          <p className="section__lead">
            4問・約1分。人と話さずに結果が出ます。案内が必要なら、そのあと連絡先だけ送れます。
          </p>
          <BackOfficeDiagnostic leadSource="back_office_ads_diagnostic" />
        </FadeIn>
      </section>

      <section className="section" aria-labelledby="flow-title">
        <FadeIn className="section__inner">
          <p className="section__label">Process</p>
          <h2 className="section__title" id="flow-title">
            相談から判断まで、4ステップ
          </h2>
          <ol className="bo-steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>
      </section>

      <section
        className="section section--muted"
        aria-labelledby="trust-title"
      >
        <FadeIn className="section__inner">
          <p className="section__label">People</p>
          <h2 className="section__title" id="trust-title">
            誰がやり、どう守るか
          </h2>
          <p className="section__lead">
            月8万円は安さ勝負の金額ではありません。無料トライアルも「誰が来るのか」が分からないと不安です。人と体制を先に公開します。
          </p>
          <ul className="bo-trust-list">
            {trustPoints.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="section" aria-labelledby="price-title">
        <FadeIn className="section__inner">
          <p className="section__label">Pricing</p>
          <h2 className="section__title" id="price-title">
            料金
          </h2>
          <div className="bo-price">
            <div className="bo-price__card bo-price__card--focus">
              <p className="bo-price__label">まずは</p>
              <p className="bo-price__amount">
                2週間
                <span>0円</span>
              </p>
            </div>
            <div className="bo-price__card">
              <p className="bo-price__label">続ける場合</p>
              <p className="bo-price__amount">
                月額
                <span>8万円〜</span>
              </p>
              <p className="bo-price__note">税別／月20時間相当から・最低契約なし</p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="section section--muted" aria-labelledby="faq-title">
        <FadeIn className="section__inner">
          <p className="section__label">FAQ</p>
          <h2 className="section__title" id="faq-title">
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

      <section
        className="final-cta"
        id="final-cta"
        aria-labelledby="cta-title"
      >
        <FadeIn className="final-cta__inner final-cta__inner--wide">
          <h2 id="cta-title">
            数字が動く2週間を、
            <br />
            先に試してください
          </h2>
          <p>
            入口はひとつです。会社名とメールを送っていただければ、無料トライアルのご案内をします。
          </p>

          <div className="bo-cta-forms">
            <div className="bo-cta-forms__block" id="inquiry">
              <h3>無料トライアルを申し込む</h3>
              <p>電話番号は任意です。迷っている方は、先に簡易診断だけでもどうぞ。</p>
              <ConnectBoxLeadForm
                mode="inquiry"
                leadSource="back_office_ads_inquiry"
                ctaPosition="inquiry_form"
              />
              <p className="bo-cta-alt">
                <a
                  href="#diagnostic"
                  data-cta-position="footer_secondary"
                  onClick={scrollToDiagnostic}
                >
                  話す前に、無料簡易診断を見る →
                </a>
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
