import { Navigate, useParams } from "react-router-dom";
import BackOfficeLp from "./lp/BackOfficeLp";
import BusinessLp from "./lp/BusinessLp";
import CoachingLp from "./lp/CoachingLp";
import HrLp from "./lp/HrLp";
import LogTrackLp from "./lp/LogTrackLp";
import MarketingLp from "./lp/MarketingLp";
import StrategyLp from "./lp/StrategyLp";

export default function LpPage() {
  const { slug } = useParams();

  switch (slug) {
    case "web-marketing":
      return <MarketingLp />;
    case "back-office":
      return <BackOfficeLp />;
    case "log-track":
      return <LogTrackLp />;
    case "hr":
      return <HrLp />;
    case "coaching":
      return <CoachingLp />;
    case "strategy":
      return <StrategyLp />;
    case "business-upgrade":
      return <BusinessLp />;
    default:
      return <Navigate to="/" replace />;
  }
}
