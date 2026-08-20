import { COMPANY_NAME, LINE_URL } from "../constants";

export const company = {
  legalName: COMPANY_NAME,
  serviceName: "T-connect",
  englishName: "T-connect Inc.",
  representativeTitle: "代表取締役",
  representative: "田中 辰弥",
  postalCode: "〒160-0023",
  address: "東京都新宿区西新宿３丁目１−３ MITSUWAビル １０階",
  business:
    "BPO・コンサルティング（Connect Box）、探偵事業、宝飾事業、起業家育成事業",
  lineUrl: LINE_URL,
};

export const companyMission = {
  tagline: "人と人との縁を紡ぐ企業",
  heroLead: "人と企業の可能性をつなぎ\n選ばれ続ける未来をつくる",
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

export const representativeMessage = {
  title: "代表取締役からのメッセージ",
  /** 差し替え用。用意できたら `/representative.jpg` などに変更 */
  photoSrc: null as string | null,
  photoAlt: "代表取締役 田中 辰弥",
  paragraphs: [
    "T-connectは、Connect Boxをはじめとする4つの事業を通じて、人と人とのつながりに価値を生み出す会社です。",
    "私たちが大切にしているのは、「目先ではなく、未来を選べ」という価値観です。",
    "一つひとつの判断が、自分のためだけではなく、相手や仲間、大切な人、会社の未来にとって最善か。",
    "私たちは、そう問い続けます。",
    "目先の利益ではなく、長期的な信頼を選ぶ。その積み重ねによって、選ばれ続ける組織でありたい。",
    "それが、T-connectの想いです。",
  ],
};
