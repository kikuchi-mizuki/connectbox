import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "../../components/CtaButton";
import FadeIn from "../../components/FadeIn";
import { LINE_URL } from "../../constants";
import { usePageMeta } from "../../hooks/usePageMeta";

const pains = [
  {
    text: "経理や総務などのバックオフィス業務に時間が取られている",
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
  {
    text: "コア業務に集中できる体制を整えたい",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
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

const trust = [
  {
    n: "3,000+",
    title: "子育て世帯のワーカー",
    body: "3,000名以上が在籍しています。月初や期末など、必要な時期・時間だけ経理の体制を厚くできます。",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "実務経験",
    title: "経理・総務の実務がある",
    body: "大手企業での勤務経験や、請求・経費・営業事務などの実務経験を持つアシスタントが対応します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "正確 × 速さ",
    title: "採用せず、すぐ始められる",
    body: "採用の固定費をかけず、LINEと15分程度の説明から始められます。正確性とスピード感を持って処理します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
];

const patterns = [
  {
    title: "経理まわりの定型処理から",
    body: "請求書・売掛買掛・経費・データ入力など、繰り返し発生する処理を外出しし、社内の時間をコア業務に戻します。",
    example:
      "具体例：社員8名で代表が経理を兼務。請求・入金・経費に週8時間 → 最終確認の週2時間へ。月およそ24時間を本業に戻す使い方です。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "繁忙期・欠員のバッファとして",
    body: "月次・期末・担当者不在のタイミングだけ負荷を吸収する使い方です。採用せずに、必要なときだけ体制を厚くできます。",
    example:
      "具体例：経理1名で月初1〜10日が埋まる会社。請求確認と振込準備を代行し、月初の定型を月40時間 → 16時間（およそ6割減）。繁忙期の残業目安は月60時間 → 15時間です。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "属人化の整理から始める",
    body: "業務棚卸し・フロー整理・マニュアル化を先に行い、外に出せる範囲を明確にしてから、必要部分だけ代行に切り替えます。",
    example:
      "具体例：担当退職で手順が残っていなかった会社。棚卸しとマニュアルのあと定型処理を代行し、採用せずに翌月から処理を継続します。",
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
    title: "オンラインでヒアリング",
    body: "オンラインで15分程度、現状を伺いながら概略をご説明します。効率化・コスト削減のポイントもその場で整理します。",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "適用範囲をご提案",
    body: "どこから始めるのがよいか、進め方のイメージをお返しします。",
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
    q: "掲載の時間や割合は、必ずその通りになりますか？",
    a: "いいえ。よくある変化のイメージです。業務量・範囲・いまの持ち方で変わります。現状を伺ったうえで、御社の数字でご提案します。",
  },
  {
    q: "担当するのは、どんな人ですか？",
    a: "3,000名以上の子育て世帯ワーカーが在籍しています。大手企業での勤務経験や、請求・経費・営業事務などの実務経験を持つアシスタントが、対象業務に合わせて対応します。",
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
            <p className="hero__brand">バックオフィス</p>
            <h1 className="hero__title">
              バックオフィスの負担を、
              <br />
              採用せずに減らす。
            </h1>
            <p className="hero__lead">
              経理・総務・人事・営業事務などの業務を代行し、属人化や繁忙期の揺れにも耐えられる体制をつくります。たとえば請求・振込を外に出すと、月初の定型が月40時間→16時間になる使い方があります。
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
          <p className="section__lead">
            多くの企業様から、バックオフィスまわりで次のようなご相談をいただいています。
          </p>
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
            対応できるバックオフィス業務
          </h2>
          <p className="section__lead">
            請求・経費・営業事務など、業務内容に合わせて実務経験のあるアシスタントが対応します。量の増減や担当変更にも柔軟に合わせられます。
          </p>
          <div className="service-grid">
            {offerings.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section" aria-labelledby="trust-title">
        <FadeIn className="section__inner">
          <p className="section__label">Team</p>
          <h2 className="section__title" id="trust-title">
            3,000名以上の、
            <br />
            子育て世帯のワーカーが在籍
          </h2>
          <p className="section__lead">
            大手企業での勤務経験や、請求・経費・営業事務の実務があるアシスタントが所属しています。安く × カンタンに × 便利に、正確性とスピード感を持って経理まわりを代行します。
          </p>
          <ul className="bo-trust">
            {trust.map((item) => (
              <li key={item.title}>
                <img src={item.image} alt="" />
                <div>
                  <p className="bo-trust__n">{item.n}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="section section--ink" aria-labelledby="approach-title">
        <div className="section__inner approach">
          <FadeIn>
            <div className="approach__visual">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80"
                alt="デスクで業務を進める様子"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="section__label">Approach</p>
            <h2 className="section__title" id="approach-title">
              人を増やす前に、
              <br />
              業務の持ち方を変える
            </h2>
            <p className="section__lead">
              採用だけでは回りにくい時代に、標準化と代行で管理部門の運営を安定させます。
            </p>
            <ul className="approach__points">
              <li>
                <p className="approach__num">採用 0</p>
                <h3>属人化を減らす</h3>
                <p>
                  引き継ぎ可能な形に整え、担当者依存を弱めます。担当退職後も、採用せずに翌月から処理を続ける使い方があります。
                </p>
              </li>
              <li>
                <p className="approach__num">60h→15h</p>
                <h3>繁忙期の揺れに合わせる</h3>
                <p>
                  必要な時期・時間だけ体制を厚くできます。経理1名体制なら、繁忙期の残業目安を月60時間から15時間へ寄せられます。
                </p>
              </li>
              <li>
                <p className="approach__num">40h→16h</p>
                <h3>コストの見直しにつながる</h3>
                <p>
                  固定費に頼らず、業務量に応じた持ち方へ寄せられます。月初の定型を月40時間から16時間へ減らす例があります。
                </p>
              </li>
            </ul>
          </FadeIn>
        </div>
      </section>

      <section className="section" aria-labelledby="patterns-title">
        <FadeIn className="section__inner">
          <p className="section__label">Patterns</p>
          <h2 className="section__title" id="patterns-title">
            まずはここから、という始め方
          </h2>
          <p className="section__lead">
            よくある支援パターンです。貴社の状況に合わせて、無理のない入り口を一緒に選びます。数字はよくある変化のイメージです。
          </p>
          <div className="pattern-list">
            {patterns.map((p) => (
              <article className="pattern-item pattern-item--photo" key={p.title}>
                <div className="pattern-item__num" aria-hidden="true" />
                <div>
                  <img src={p.image} alt="" />
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <p className="pattern-item__example">{p.example}</p>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section section--muted" aria-labelledby="flow-title">
        <FadeIn className="section__inner">
          <p className="section__label">Process</p>
          <h2 className="section__title" id="flow-title">
            ご相談から開始までの流れ
          </h2>
          <p className="section__lead">
            いきなり契約ではありません。まずはLINEでの現状共有から。オンラインは15分程度で、概略をご説明します。
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

      <section className="section" aria-labelledby="faq-title">
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
