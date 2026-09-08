import { SITE_URL } from "../constants";
import { tentOffice } from "./tent";

/** LINE / OGP 用。クローラはJSを実行しないため静的HTMLにも同じ値を埋め込む */
export const detectiveSeo = {
  title: `${tentOffice.name}｜不貞調査の無料相談`,
  description: `${tentOffice.name}。${tentOffice.message}不貞調査の無料相談を受付中。秘密厳守。`,
  keywords: "探偵事務所TENT,TENT,不貞調査,浮気調査,探偵,無料相談,秘密厳守",
  path: "/detective",
  canonical: `${SITE_URL}/detective`,
  ogImage: `${SITE_URL}/detective/scene-1.jpg`,
  siteName: tentOffice.name,
} as const;
