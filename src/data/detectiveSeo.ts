import { SITE_URL } from "../constants";
import { tentOffice } from "./tent";

/** LINE / OGP 用。クローラはJSを実行しないため静的HTMLにも同じ値を埋め込む */
export const detectiveSeo = {
  title: `${tentOffice.name}｜浮気・不倫・素行調査の無料相談`,
  description: `${tentOffice.tagline}。不倫調査・身辺調査・素行調査の無料相談を受付中。秘密厳守。いきなり契約ではありません。`,
  keywords:
    "ミノガサン探偵事務所,見逃さん,不倫調査,浮気調査,身辺調査,素行調査,探偵,無料相談,秘密厳守",
  path: "/detective",
  canonical: `${SITE_URL}/detective`,
  ogImage: `${SITE_URL}/detective/scene-1.jpg`,
  siteName: tentOffice.name,
} as const;
