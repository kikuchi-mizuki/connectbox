import { SITE_URL } from "../constants";
import { tentOffice } from "./tent";

/** LINE / OGP 用。クローラはJSを実行しないため静的HTMLにも同じ値を埋め込む */
export const detectiveSeo = {
  title: `${tentOffice.name}｜浮気調査 定額${tentOffice.flatPlanTotal}（税込）・同性相談`,
  description: `証拠が取れなければ、調査費用は0円（全プラン対象）。おまかせプラン${tentOffice.flatPlanTotal}（税込）。同性の相談員が相談から報告まで担当。まずは無料相談から。`,
  keywords:
    "ミノガサン探偵事務所,浮気調査,浮気調査 費用,探偵 料金,定額プラン,不倫調査,探偵,無料相談,同性相談,秘密厳守",
  path: "/detective",
  canonical: `${SITE_URL}/detective`,
  ogImage: `${SITE_URL}/detective/scene-consult-bright.jpg`,
  siteName: tentOffice.name,
} as const;
