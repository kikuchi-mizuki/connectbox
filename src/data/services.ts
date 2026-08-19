export type Service = {
  slug: string;
  name: string;
  en: string;
  path: string;
  /** HPカタログから案内LPへリンクする */
  hasLp: boolean;
  tagline: string;
  lead: string;
  heroImage: string;
  pains: string[];
  offerings: string[];
  approachTitle: string;
  approachBody: string;
  approachPoints: { title: string; body: string }[];
  patterns: { title: string; body: string }[];
  description: string;
};

const backOffice: Service = {
  slug: "back-office",
  name: "バックオフィス",
  en: "Back office",
  path: "/lp/back-office",
  hasLp: true,
  tagline: "属人化しない回し方に変える。",
  lead: "処理の穴埋めではなく、経理・総務・人事・営業事務の持ち方を整え、繁忙期にも耐えられる体制にします。",
  heroImage:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80",
  pains: [
    "経理や総務に時間が取られ、本業に手が回らない",
    "担当者しか分からない業務がある",
    "繁忙期や欠員のたびに回り方が崩れる",
  ],
  offerings: [
    "請求書・見積書・発注書の作成",
    "売掛金・買掛金管理",
    "経費精算・データ入力",
    "勤怠管理・給与計算補助",
    "営業事務（受発注・資料作成）",
    "人事・労務・総務業務",
    "マニュアル作成・業務フロー整理",
  ],
  approachTitle: "人を増やす前に、業務の持ち方を変える",
  approachBody:
    "採用だけでは回りにくい時期に、標準化と代行で管理部門の運営を安定させます。",
  approachPoints: [
    {
      title: "属人化を減らす",
      body: "引き継ぎ可能な形に整え、担当者依存を弱めます。",
    },
    {
      title: "繁忙期の揺れに合わせる",
      body: "必要な時期・時間だけ体制を厚くできます。",
    },
    {
      title: "コストの見直しにつながる",
      body: "固定費に頼らず、業務量に応じた持ち方へ寄せられます。",
    },
  ],
  patterns: [
    {
      title: "経理まわりの定型処理から",
      body: "請求書・売掛買掛・経費・データ入力など、繰り返し発生する処理を外出しします。",
    },
    {
      title: "繁忙期・欠員のバッファとして",
      body: "必要なときだけ体制を厚くする使い方です。採用せずに負荷を吸収できます。",
    },
    {
      title: "属人化の整理から始める",
      body: "棚卸し・フロー整理・マニュアル化のあと、必要範囲だけ代行に切り替えます。",
    },
  ],
  description:
    "コネクトボックスのバックオフィス。属人化しない回し方に変えます。",
};

const logTrack: Service = {
  slug: "log-track",
  name: "LogTrack",
  en: "LogTrack",
  path: "/lp/log-track",
  hasLp: true,
  tagline: "出張の記録から、日当と報告書まで。",
  lead: "出張の移動を自動で残し、日当の計算と出張報告書までつなげます。",
  heroImage:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2400&q=80",
  pains: [
    "出張の移動記録が手入力で、漏れや誤りが起きやすい",
    "日当の計算と出張報告書の作成に時間がかかる",
    "税務エビデンスが残らず、節税の判断に不安がある",
  ],
  offerings: [
    "GPS移動ログの自動取得",
    "日当の自動算出",
    "出張報告書の自動作成",
    "Web画面での移動履歴管理",
    "税務エビデンスの確保",
  ],
  approachTitle: "移動の事実を、正しくデータ化する",
  approachBody:
    "正確で透明なデータが、公平性と信頼性を実現し、安心・安全な節税を支えます。",
  approachPoints: [
    {
      title: "自動取得",
      body: "移動ログをアプリで記録し、手入力の負荷を減らします。",
    },
    {
      title: "自動計算",
      body: "日当清算額がひと目で分かる形で表示します。",
    },
    {
      title: "エビデンス",
      body: "出張報告書までつなげ、説明できる形を残します。",
    },
  ],
  patterns: [
    {
      title: "移動ログの記録から",
      body: "まずは日々の移動を正しく残すところから始められます。",
    },
    {
      title: "日当算出から",
      body: "記録されたログをもとに、清算額を自動で出します。",
    },
    {
      title: "報告書作成から",
      body: "出張報告書の作成まで一気通貫で自動化します。",
    },
  ],
  description:
    "LogTrack。出張の移動を自動記録し、日当と出張報告書までつなげる。",
};

export const services: Service[] = [
  backOffice,
  logTrack,
  {
    slug: "web-marketing",
    name: "WEBマーケ",
    en: "Marketing",
    path: "/lp/web-marketing",
    hasLp: false,
    tagline: "選ばれ続ける導線と信頼をつくる。",
    lead: "今月の広告だけを回すのではなく、問い合わせが残る導線と、発信の持ち方に変えます。",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2400&q=80",
    pains: [],
    offerings: [],
    approachTitle: "",
    approachBody: "",
    approachPoints: [],
    patterns: [],
    description:
      "コネクトボックスのWEBマーケ。選ばれ続ける導線と信頼をつくります。",
  },
  {
    slug: "hr",
    name: "採用・人事",
    en: "People",
    path: "/lp/hr",
    hasLp: false,
    tagline: "長く働ける採用と定着をつくる。",
    lead: "",
    heroImage:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=80",
    pains: [],
    offerings: [],
    approachTitle: "",
    approachBody: "",
    approachPoints: [],
    patterns: [],
    description:
      "コネクトボックスの採用・人事。長く働ける採用と定着をつくります。",
  },
  {
    slug: "coaching",
    name: "組織コーチング",
    en: "Coaching",
    path: "/lp/coaching",
    hasLp: false,
    tagline: "判断の軸を揃える。",
    lead: "",
    heroImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=80",
    pains: [],
    offerings: [],
    approachTitle: "",
    approachBody: "",
    approachPoints: [],
    patterns: [],
    description:
      "コネクトボックスの組織コーチング。判断の軸を揃えます。",
  },
  {
    slug: "strategy",
    name: "経営戦略",
    en: "Strategy",
    path: "/lp/strategy",
    hasLp: false,
    tagline: "未来を選ぶ意思決定を支える。",
    lead: "",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=80",
    pains: [],
    offerings: [],
    approachTitle: "",
    approachBody: "",
    approachPoints: [],
    patterns: [],
    description:
      "コネクトボックスの経営戦略。未来を選ぶ意思決定を支えます。",
  },
  {
    slug: "business-upgrade",
    name: "既存事業ブラッシュアップ",
    en: "Business",
    path: "/lp/business-upgrade",
    hasLp: false,
    tagline: "次に選ばれる理由を磨く。",
    lead: "",
    heroImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2400&q=80",
    pains: [],
    offerings: [],
    approachTitle: "",
    approachBody: "",
    approachPoints: [],
    patterns: [],
    description:
      "コネクトボックスの既存事業ブラッシュアップ。次に選ばれる理由を磨きます。",
  },
];

export function getService(slug: string | undefined) {
  return services.find((s) => s.slug === slug);
}

export const lpServices = services.filter((s) => s.hasLp);

export const steps = [
  {
    title: "LINEで相談",
    body: "公式アカウントを追加し、関心のある領域と、いま困っている点を簡単にお送りください。",
  },
  {
    title: "オンラインでヒアリング",
    body: "15分程度で現状を伺い、どの領域から始めるのがよいかを一緒に整理します。",
  },
  {
    title: "適用範囲をご提案",
    body: "やる範囲と、今やらなくてよい範囲を分けてお返しします。いきなり契約ではありません。",
  },
  {
    title: "引き継ぎ後、支援開始",
    body: "合意した領域から伴走を始めます。ほかの領域は、必要になったタイミングで足せます。",
  },
];

export const faqs = [
  {
    q: "サービスをまとめて契約する必要がありますか？",
    a: "いいえ。それぞれ別のサービスです。関心のある領域から始められます。",
  },
  {
    q: "個人事業主でも相談できますか？",
    a: "できます。規模にかかわらず、必要な領域から始められます。",
  },
  {
    q: "いきなり契約する必要がありますか？",
    a: "いいえ。まずはLINEでのご相談と、15分程度のオンラインヒアリングからで大丈夫です。",
  },
  {
    q: "担当するのは、どんな人ですか？",
    a: "3,000名以上の子育て世帯ワーカーが在籍しています。大手企業での勤務経験など、領域に合わせた実務経験を持つアシスタントから、必要な人材をアサインします。",
  },
  {
    q: "料金は掲載されていますか？",
    a: "業務内容・稼働時間・必要なスキルによって異なるため、一律の料金表は掲載していません。ご状況を15分ほどお聞きしたうえで、必要な範囲だけご提案します。",
  },
];
