import { SITE_URL } from "../constants";
import { tentOffice } from "./tent";

/** LINE / OGP 用。クローラはJSを実行しないため静的HTMLにも同じ値を埋め込む */
export const detectiveSeo = {
  title: `${tentOffice.name}｜浮気調査の料金・証拠なし0円の無料相談`,
  description:
    "証拠が取れなければ0円。浮気調査の料金は無料相談でお伝えします。女性が相談できる探偵事務所。見積り以外の追加料金はありません。",
  keywords:
    "ミノガサン探偵事務所,浮気調査,料金,証拠なし0円,不倫調査,探偵,無料相談,女性相談",
  path: "/detective",
  canonical: `${SITE_URL}/detective`,
  ogImage: `${SITE_URL}/detective/scene-consult-bright.jpg`,
  siteName: tentOffice.name,
} as const;
