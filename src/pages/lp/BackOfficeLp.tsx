import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../../components/CtaButton";
import FadeIn from "../../components/FadeIn";
import { CONNECT_BOX_LINE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

const pains = [
  {
    text: "経理や総務に時間が取られ、本業に手が回らない",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80",
  },
  {
    text: "担当者しか分からない属人化した業務がある",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  },
  {
    text: "繁忙期だけ業務量が増え、対応が難しい",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    text: "事務員を1名採るほどではないが、手が足りない",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  },
];

const offerings = [
  "請求書の発行・送付／入金確認・消込",
  "経費精算・データ入力／仕訳入力",
  "勤怠集計・給与計算補助／入退社手続き",
  "採用事務・面接の日程調整",
  "受発注・見積・問い合わせ一次対応",
  "業務棚卸し・マニュアル・フロー整備",
];

const cases = [
  {
    industry: "士業・専門｜経理部門",
    metric: "月初 約6割減",
    metricLabel: "定型処理のイメージ",
    title: "定型的な経理事務を切り出す",
    challenge: "請求・入金・経費が月末月初に集中し、残業につながっている。",
    action: "請求発行・入金確認・経費集計など、定型フローを代行。",
    effect: "経理は判断業務へ集中。追加採用なしで繁忙を吸収できる。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    industry: "卸・製造｜管理部門",
    metric: "採用 0",
    metricLabel: "属人化を仕組みで解消",
    title: "「〇〇さんしか分からない」を解消",
    challenge: "事務が特定社員に集中し、休むと止まり、辞めると引き継げない。",
    action: "フローを手順書化し、定型業務をConnect Box側で運用。",
    effect: "人に依存しない形へ。採用と教育の循環が減る。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    industry: "中小企業｜〜10名",
    metric: "週8h → 2h",
    metricLabel: "代表・営業の事務兼務のイメージ",
    title: "採用せず、必要な業務だけ外部化",
    challenge: "事務員1名ほどではないが、社長や営業が事務まで兼務している。",
    action: "経理・人事・営業事務から必要な業務だけ選択して外出し。",
    effect: "社員は売上につながる仕事へ。固定の採用コストを増やさずに回せる。",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
  },
];

const steps = [
  {
    title: "ご相談",
    body: "困っている点を伺います。LINEでもOKです。",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "業務の確認",
    body: "外に出せる範囲と、社内に残す範囲を分けます。",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "マニュアル作成",
    body: "手順書に落とし、受託範囲を確定します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "担当者との顔合わせ",
    body: "実際に対応する担当者と責任者をご紹介します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "業務開始",
    body: "進捗は週次で共有します。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
];

const faqs = [
  {
    q: "料金の目安は？",
    a: "一部から月6万円〜、まるっと月20万円〜（税別）。時間の切り売りではなく、業務範囲での定額です。初期費用はありません。",
  },
  {
    q: "いきなり契約する必要がありますか？",
    a: "いいえ。まずは現状の共有からで大丈夫です。対象業務が固まっていない段階でもご相談いただけます。",
  },
  {
    q: "掲載の数字は必ずその通りになりますか？",
    a: "想定モデル（代表例）です。実際の業務量と体制により変わります。",
  },
];

export default function BackOfficeLp() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "バックオフィス業務代行｜Connect Box",
    description:
      "採用せずに、必要な業務だけ外に出せます。経理・人事・営業事務などのバックオフィス代行。月6万円〜。初期費用なし。",
    keywords:
      "バックオフィス代行,経理代行,総務代行,営業事務,Connect Box,コネクトボックス,BPO",
    path: "/connect-box/back-office",
  });

  return (
    <main>
      <section className="hero" id="page-hero" aria-label="メインビジュアル">
        <div className="hero__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=80"
            alt=""
          />
          <div className="hero__shade" />
        </div>
        <div className="hero__content">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero__brand">Connect Box.</p>
            <h1 className="hero__title">バックオフィス業務代行</h1>
            <p className="hero__lead">
              採用せずに、必要な業務だけ外に出せます。
            </p>
            <div className="cta-row">
              <CtaButton className="btn--large btn--pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="pain-title">
        <FadeIn className="section__inner">
          <p className="section__label">Challenges</p>
          <h2 className="section__title" id="pain-title">
            こんなお悩み、ありませんか
          </h2>
          <ul className="pain-photos">
            {pains.map((item, i) => (
              <li key={item.text}>
                <img src={item.image} alt="" />
                <div>
                  <span className="pain-list__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="section section--muted" aria-labelledby="offer-title">
        <FadeIn className="section__inner">
          <p className="section__label">Services</p>
          <h2 className="section__title" id="offer-title">
            お任せいただける業務
          </h2>
          <p className="section__lead">
            必要なものだけ選べます。1つの業務からでも構いません。
            <br />
            一部から月6万円〜／まるっと月20万円〜。初期費用なし。
          </p>
          <div className="service-grid">
            {offerings.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="section__lead" style={{ marginTop: "1.25rem" }}>
            記載のない業務も、定型化できるものであればご相談ください。
          </p>
        </FadeIn>
      </section>

      <section className="section" aria-labelledby="team-title">
        <FadeIn className="section__inner">
          <p className="section__label">Team</p>
          <h2 className="section__title" id="team-title">
            実務経験のある人材をアサイン
          </h2>
          <p className="section__lead">
            経理・総務・営業事務などの実務経験者が、対象業務に合わせて対応します。
          </p>
          <ul className="stat-row">
            <li>
              <strong>実務経験</strong>
              <span>経理・総務・営業事務など</span>
            </li>
            <li>
              <strong>柔軟対応</strong>
              <span>業務量に合わせてアサイン</span>
            </li>
            <li>
              <strong>顔合わせあり</strong>
              <span>開始前に担当者をご紹介</span>
            </li>
          </ul>
        </FadeIn>
      </section>

      <section className="section section--muted" aria-labelledby="cases-title">
        <FadeIn className="section__inner">
          <p className="section__label">Use Cases</p>
          <h2 className="section__title" id="cases-title">
            こう変わるイメージ
          </h2>
          <p className="section__lead">
            よくある使い方です。数値は想定モデルです。
          </p>
          <ul className="use-cases">
            {cases.map((c, i) => (
              <li className="use-case" key={c.title}>
                <img src={c.image} alt="" />
                <div className="use-case__body">
                  <p className="use-case__industry">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {c.industry}
                  </p>
                  <p className="use-case__metric">{c.metric}</p>
                  <p className="use-case__metric-label">{c.metricLabel}</p>
                  <h3>{c.title}</h3>
                  <dl className="use-case__points">
                    <div>
                      <dt>課題</dt>
                      <dd>{c.challenge}</dd>
                    </div>
                    <div>
                      <dt>Connect Boxで対応</dt>
                      <dd>{c.action}</dd>
                    </div>
                    <div>
                      <dt>導入後</dt>
                      <dd>{c.effect}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="section" aria-labelledby="flow-title">
        <FadeIn className="section__inner">
          <p className="section__label">Process</p>
          <h2 className="section__title" id="flow-title">
            ご相談から開始までの流れ
          </h2>
          <p className="section__lead">
            いきなり契約ではありません。まずは現状の共有から。
          </p>
          <ol className="flow">
            {steps.map((s, i) => (
              <li className="flow-step flow-step--photo" key={s.title}>
                <span className="flow-step__dot">{i + 1}</span>
                <div>
                  <img src={s.image} alt="" />
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
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

      <section className="final-cta" id="final-cta" aria-labelledby="cta-title">
        <FadeIn className="final-cta__inner">
          <h2 id="cta-title">
            まずは、御社の課題を
            <br />
            お聞かせください
          </h2>
          <p>15分ほどで、対象になりそうな業務があるかを一緒に整理します。</p>
          <div className="cta-row">
            <CtaButton className="btn--large btn--pulse" />
          </div>
          <p className="mail-hint">
            友だち追加：{" "}
            <a
              href={CONNECT_BOX_LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              lin.ee/w0pvsAp
            </a>
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
