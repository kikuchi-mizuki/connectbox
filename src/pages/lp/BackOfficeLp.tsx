import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../../components/CtaButton";
import FadeIn from "../../components/FadeIn";
import { LINE_URL } from "../../constants";
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
    text: "バックオフィスのコストを見直したい",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  },
];

const offerings = [
  "請求書・見積書・発注書の作成",
  "売掛金・買掛金管理",
  "経費精算・データ入力",
  "勤怠管理・給与計算補助",
  "営業事務（受発注・資料作成）",
  "人事・労務・総務業務",
  "マニュアル作成・業務フロー整理",
];

const cases = [
  {
    n: "週8h → 2h",
    title: "代表の経理兼務を減らす",
    body: "請求・入金・経費の定型を外出しし、最終確認だけ社内に残す使い方です。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "月40h → 16h",
    title: "月初の定型処理を薄くする",
    body: "請求確認と振込準備を代行し、月初の定型処理にかかる時間を約6割削減。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "採用 0",
    title: "退職後も、処理を止めない",
    body: "棚卸しとマニュアル化のあと定型を代行し、採用せずに翌月から継続。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
];

const steps = [
  {
    title: "LINEで友だち追加・ご相談",
    body: "公式アカウントを追加し、対象業務やいま困っている点を簡単にお送りください。",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "オンラインでヒアリング（15分程度）",
    body: "現状を伺いながら、どこから始めるのがよいかを一緒に整理します。",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "適用範囲をご提案",
    body: "やる範囲と今やらなくてよい範囲を分けてお返しします。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "引き継ぎ後、運用開始",
    body: "合意後に業務を引き継ぎ、専任体制で安定運用に入ります。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
];

const faqs = [
  {
    q: "どのくらいの業務量から相談できますか？",
    a: "月数十時間程度のスポット的なご相談からでも問題ありません。まずは対象業務の整理から一緒に進められます。",
  },
  {
    q: "セキュリティや情報管理はどうなっていますか？",
    a: "業務に必要な範囲での情報共有を前提に、取り扱いルールをご説明したうえで進めます。詳細は初回ヒアリング時にご確認ください。",
  },
  {
    q: "いきなり契約する必要がありますか？",
    a: "いいえ。まずはLINEでのご相談と、短いオンラインヒアリングからで大丈夫です。導入判断は内容をご覧いただいたあとに行えます。",
  },
  {
    q: "どの業務から始めるのがよいですか？",
    a: "定型度が高く、属人化しにくい経理・営業事務の処理から始める企業様が多いです。状況に合わせてご提案します。",
  },
  {
    q: "掲載の数字は、必ずその通りになりますか？",
    a: "いいえ。よくある変化のイメージです。業務量・範囲・いまの持ち方で変わります。現状を伺ったうえで、御社の数字でご提案します。",
  },
];

export default function BackOfficeLp() {
  const reduce = useReducedMotion();
  usePageMeta({
    title: "バックオフィス",
    description:
      "バックオフィスの負担を、採用せずに減らす。経理・総務・人事・営業事務の代行。",
  });

  return (
    <main>
      {/* ① ファーストビュー */}
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
            <h1 className="hero__title">
              バックオフィスの負担を、
              <br />
              採用せずに減らす。
            </h1>
            <p className="hero__lead">
              経理・総務・人事・営業事務などの業務を代行し、属人化や繁忙期の揺れにも耐えられる体制をつくります。
            </p>
            <div className="cta-row">
              <CtaButton className="btn--large btn--pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ② こんなお悩み */}
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

      {/* ③ 何を頼める？ */}
      <section className="section section--muted" aria-labelledby="offer-title">
        <FadeIn className="section__inner">
          <p className="section__label">Services</p>
          <h2 className="section__title" id="offer-title">
            こんな業務をお任せいただけます
          </h2>
          <p className="section__lead">
            業務内容に合わせて、実務経験のあるアシスタントが対応します。量の増減にも柔軟に合わせられます。
          </p>
          <div className="service-grid">
            {offerings.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ④ なぜここに任せられるか */}
      <section className="section" aria-labelledby="team-title">
        <FadeIn className="section__inner">
          <p className="section__label">Team</p>
          <h2 className="section__title" id="team-title">
            3,000名以上の実務経験者から、
            <br />
            御社に合う人材をアサイン
          </h2>
          <p className="section__lead">
            大手企業での勤務経験を持つ人材や、子育てと両立しながら働く経験者が在籍。請求・経費・営業事務などの実務経験を持つアシスタントが、対象業務に合わせて対応します。
          </p>
          <ul className="stat-row">
            <li>
              <strong>3,000+</strong>
              <span>登録人材</span>
            </li>
            <li>
              <strong>実務経験</strong>
              <span>経理・総務・営業事務など</span>
            </li>
            <li>
              <strong>柔軟対応</strong>
              <span>業務量に合わせてアサイン</span>
            </li>
          </ul>
        </FadeIn>
      </section>

      {/* ⑤ 実際どう変わるか */}
      <section className="section section--muted" aria-labelledby="cases-title">
        <FadeIn className="section__inner">
          <p className="section__label">Cases</p>
          <h2 className="section__title" id="cases-title">
            よくある使い方
          </h2>
          <p className="section__lead">
            数字はよくある変化のイメージです。現状を伺ったうえで、御社の範囲でご提案します。
          </p>
          <ul className="home-cases">
            {cases.map((c) => (
              <li key={c.title}>
                <img src={c.image} alt="" />
                <div>
                  <p className="home-team__n">{c.n}</p>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* ⑥ どう始めるか */}
      <section className="section" aria-labelledby="flow-title">
        <FadeIn className="section__inner">
          <p className="section__label">Process</p>
          <h2 className="section__title" id="flow-title">
            ご相談から開始までの流れ
          </h2>
          <p className="section__lead">
            いきなり契約ではありません。まずはLINEでの現状共有から。
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

      {/* ⑦ FAQ */}
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

      {/* ⑧ Final CTA */}
      <section className="final-cta" id="final-cta" aria-labelledby="cta-title">
        <FadeIn className="final-cta__inner">
          <h2 id="cta-title">
            まずは現状の課題を、
            <br />
            LINEでお聞かせください
          </h2>
          <p>
            公式アカウントを友だち追加のうえ、ご状況を簡単にお送りください。折り返しご連絡いたします。
          </p>
          <div className="cta-row">
            <CtaButton className="btn--large btn--pulse" />
          </div>
          <p className="mail-hint">
            友だち追加：{" "}
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
              lin.ee/RiVp6pb
            </a>
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
