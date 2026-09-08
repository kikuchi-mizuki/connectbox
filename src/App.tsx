import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import DetectiveLayout from "./components/DetectiveLayout";
import HpLayout from "./components/HpLayout";
import LpLayout from "./components/LpLayout";
import CompanyPage from "./pages/CompanyPage";
import HomePage from "./pages/HomePage";
import ConnectBoxPage from "./pages/business/ConnectBoxPage";
import DetectivePage from "./pages/business/DetectivePage";
import JewelryPage from "./pages/business/JewelryPage";
import IncubationPage from "./pages/business/IncubationPage";
import LpPage from "./pages/LpPage";

function LegacyConnectBoxServiceRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/connectbox/${slug ?? ""}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HpLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/connectbox" element={<ConnectBoxPage />} />
          <Route path="/jewelry" element={<JewelryPage />} />
          <Route path="/incubation" element={<IncubationPage />} />
          <Route path="/company" element={<CompanyPage />} />
        </Route>

        <Route element={<DetectiveLayout />}>
          <Route path="/detective" element={<DetectivePage />} />
        </Route>

        <Route path="/connectbox/:slug" element={<LpLayout />}>
          <Route index element={<LpPage />} />
        </Route>

        {/* 旧URL互換 */}
        <Route path="/business/connectbox" element={<Navigate to="/connectbox" replace />} />
        <Route path="/business/jewelry" element={<Navigate to="/jewelry" replace />} />
        <Route path="/business/incubation" element={<Navigate to="/incubation" replace />} />
        <Route path="/business/detective" element={<Navigate to="/detective" replace />} />
        <Route path="/lp/:slug" element={<LegacyConnectBoxServiceRedirect />} />
        <Route path="/services/:slug" element={<LegacyConnectBoxServiceRedirect />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
