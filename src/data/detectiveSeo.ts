import { SITE_URL } from "../constants";
import { tentOffice } from "./tent";

/** LINE / OGP 用。クローラはJSを実行しないため静的HTMLにも同じ値を埋め込む */
export const detectiveSeo = {
  title: `${tentOffice.name}｜浮気調査${tentOffice.minPriceLabel}〜・証拠なし0円`,
  description: `浮気調査${tentOffice.minPriceLabel}〜（税別）。証拠が取れなければ0円。女性の相談員が対応。秘密厳守で、見積り以外の追加料金はありません。`,
  keywords:
    "ミノガサン探偵事務所,浮気調査,浮気調査 費用,探偵 料金,証拠なし0円,不倫調査,探偵,無料相談,女性相談,秘密厳守",
  path: "/detective",
  canonical: `${SITE_URL}/detective`,
  ogImage: `${SITE_URL}/detective/scene-consult-bright.jpg`,
  siteName: tentOffice.name,
} as const;
