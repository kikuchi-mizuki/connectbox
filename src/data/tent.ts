/** ミノガサン探偵事務所（見逃さん） */
export const tentOffice = {
  name: "ミノガサン探偵事務所",
  nameEn: "MINOGASAN",
  legalNote: "T-connect グループ",
  /** SNS・ヒーロー向けキャッチ */
  tagline: "浮気・不倫を見逃さん。ミノガサン探偵事務所",
  /** 名前に込めた想いを短く */
  message:
    "小さな違和感も、怪しい動きも、見逃さない。あなたの隣で事実を確かめる場所でありたい。",
} as const;

/** 調査メニュー（見逃さんシリーズ） */
export const detectiveInvestigations = [
  {
    title: "不倫調査",
    slogan: "その裏切りを見逃さん",
    body: "パートナーの行動に違和感があるとき。「いつ・どこで・誰と」を事実として整理します。",
    image: "/detective/thumb-tail.jpg",
  },
  {
    title: "身辺調査",
    slogan: "怪しい動きを見逃さん",
    body: "交際相手や関係者の素性が気になるとき。知りたいポイントに絞って確認します。",
    image: "/detective/thumb-camera.jpg",
  },
  {
    title: "素行調査",
    slogan: "小さな違和感も見逃さん",
    body: "帰宅時間・交友・生活の変化など、気になる行動の有無を丁寧に調べます。",
    image: "/detective/thumb-report.jpg",
  },
] as const;
