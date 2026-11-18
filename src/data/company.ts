import { COMPANY_NAME, CONNECT_BOX_LINE_URL } from "../constants";

export const company = {
  legalName: COMPANY_NAME,
  serviceName: "T-connect",
  englishName: "T-connect Inc.",
  representativeTitle: "代表取締役",
  representative: "田中 辰弥",
  postalCode: "〒160-0023",
  address: "東京都新宿区西新宿３丁目１−３ MITSUWAビル １０階",
  /** 会社の顔としては Connect Box を主事業として明示 */
  business:
    "Connect Box（コネクトボックス）によるBPO・コンサルティング（バックオフィス代行など）。ほか、関連事業を展開。",
  businessPrimary: "Connect Box（BPO・コンサルティング）",
  businessOther: "関連事業（買取・起業支援など）",
  /** HPからの問い合わせ導線は Connect Box に寄せる */
  lineUrl: CONNECT_BOX_LINE_URL,
};

export const companyMission = {
  tagline: "人と人との縁を紡ぐ企業",
  heroLead: "人と企業の可能性をつなぎ、選ばれ続ける未来をつくる。",
  valueTitleLines: ["目先ではなく、", "未来を選べ"] as const,
  valueLead: "T-connectの行動指針です。",
  valuePrinciples: [
    {
      title: "相手の未来まで考える",
      body: "相手・仲間・家族・会社にとって、何が最善かを考えます。",
    },
    {
      title: "長期的な信頼を選ぶ",
      body: "目先の利益より、長期的な信頼を優先します。",
    },
    {
      title: "選ばれ続ける仕事をする",
      body: "その積み重ねで、選ばれ続ける組織をつくります。",
    },
  ],
  valueReasonLabel: "なぜ、このVALUEなのか",
  valueReason:
    "私たちは日々、大小さまざまな判断を繰り返しています。その一つひとつが、自分のためだけの選択になっていないか。相手や大切にしている人のためになっているか——問い続けるために、このバリューを掲げています。",
};

/** TOP用。会社の顔として短く分かるブランドストーリー */
export const brandStory = {
  paragraphs: [
    "株式会社T-connect（ティーコネクト）は、Connect Box（コネクトボックス）を主軸に、企業のバックオフィス課題を解決する会社です。",
    "人を増やす前に、業務を外に出す。必要な支援だけを組み合わせ、現場の負担を減らします。",
    "大切にしているのは「目先ではなく、未来を選べ」。長期的な信頼を積み重ね、選ばれ続ける組織でありたいと考えています。",
  ],
};

export const representativeMessage = {
  title: "代表取締役からのメッセージ",
  paragraphs: [
    "株式会社T-connectは、Connect Boxを主軸に、企業のバックオフィス課題と向き合う会社です。",
    "大切にしているのは、「目先ではなく、未来を選べ」という価値観です。",
    "一つひとつの判断が、相手や仲間、会社の未来にとって最善か——そう問い続けます。",
    "目先の利益ではなく長期的な信頼を選び、選ばれ続ける組織でありたい。それが私たちの想いです。",
  ],
};
