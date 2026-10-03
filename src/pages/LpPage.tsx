import { Navigate, useParams } from "react-router-dom";
import BackOfficeLp from "./lp/BackOfficeLp";
import LogTrackLp from "./lp/LogTrackLp";

/** 廃止した薄いLP。旧URLは Connect Box ハブへ集約 */
const RETIRED_LP_SLUGS = new Set([
  "web-marketing",
  "hr",
  "coaching",
  "strategy",
  "business-upgrade",
]);

export default function LpPage() {
  const { slug } = useParams();

  if (slug && RETIRED_LP_SLUGS.has(slug)) {
    return <Navigate to="/connect-box" replace />;
  }

  switch (slug) {
    case "back-office":
      return <BackOfficeLp />;
    case "ryohi-one":
      return <LogTrackLp />;
    case "log-track":
      return <Navigate to="/connect-box/ryohi-one" replace />;
    default:
      return <Navigate to="/connect-box" replace />;
  }
}
