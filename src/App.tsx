import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import DetectiveLayout from "./components/DetectiveLayout";
import GoogleAnalytics from "./components/GoogleAnalytics";
import HpLayout from "./components/HpLayout";
import LpLayout from "./components/LpLayout";
import CompanyPage from "./pages/CompanyPage";
import HomePage from "./pages/HomePage";
import ConnectBoxPage from "./pages/business/ConnectBoxPage";
import DetectivePage from "./pages/business/DetectivePage";
import LpPage from "./pages/LpPage";

function LegacyConnectBoxServiceRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/connect-box/${slug ?? ""}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <Routes>
        <Route element={<HpLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/connect-box" element={<ConnectBoxPage />} />
          <Route path="/company" element={<CompanyPage />} />
        </Route>

        <Route element={<DetectiveLayout />}>
          <Route path="/detective" element={<DetectivePage />} />
        </Route>

        <Route path="/connect-box/:slug" element={<LpLayout />}>
          <Route index element={<LpPage />} />
        </Route>

        {/* 旧URL互換 */}
        <Route path="/connectbox" element={<Navigate to="/connect-box" replace />} />
        <Route path="/connectbox/:slug" element={<LegacyConnectBoxServiceRedirect />} />
        <Route path="/business/connectbox" element={<Navigate to="/connect-box" replace />} />
        <Route path="/business/connect-box" element={<Navigate to="/connect-box" replace />} />
        <Route path="/jewelry" element={<Navigate to="/" replace />} />
        <Route path="/incubation" element={<Navigate to="/" replace />} />
        <Route path="/business/jewelry" element={<Navigate to="/" replace />} />
        <Route path="/business/incubation" element={<Navigate to="/" replace />} />
        <Route path="/business/detective" element={<Navigate to="/detective" replace />} />
        <Route path="/lp/:slug" element={<LegacyConnectBoxServiceRedirect />} />
        <Route path="/services/:slug" element={<LegacyConnectBoxServiceRedirect />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
