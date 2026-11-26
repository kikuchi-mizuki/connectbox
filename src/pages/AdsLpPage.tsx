import { Navigate, useParams } from "react-router-dom";
import BackOfficeAdsLp from "./lp/BackOfficeAdsLp";

/** 広告専用LP（検索インデックス対象外） */
export default function AdsLpPage() {
  const { slug } = useParams();

  switch (slug) {
    case "back-office":
      return <BackOfficeAdsLp />;
    default:
      return <Navigate to="/connect-box" replace />;
  }
}
