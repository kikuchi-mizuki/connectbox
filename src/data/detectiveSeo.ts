import { SITE_URL } from "../constants";
import { tentOffice } from "./tent";

/** LINE / OGP 用。クローラはJSを実行しないため静的HTMLにも同じ値を埋め込む */
export const detectiveSeo = {
  title: `${tentOffice.name}｜証拠なし0円の浮気調査・女性相談`,
  description:
    "証拠が取れなければ0円。経費込み・追加料金なし。女性の相談員がご相談から報告まで担当。秘密厳守。まずはLINEで無料相談。",
  keywords:
    "ミノガサン探偵事務所,浮気調査,浮気調査 費用,探偵 料金,証拠なし0円,不倫調査,探偵,無料相談,女性相談,秘密厳守",
  path: "/detective",
  canonical: `${SITE_URL}/detective`,
  ogImage: `${SITE_URL}/detective/scene-consult-bright.jpg`,
  siteName: tentOffice.name,
} as const;
