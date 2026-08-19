import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import HpLayout from "./components/HpLayout";
import LpLayout from "./components/LpLayout";
import CompanyPage from "./pages/CompanyPage";
import HomePage from "./pages/HomePage";
import LpPage from "./pages/LpPage";

function LegacyServiceRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/lp/${slug ?? ""}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HpLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/company" element={<CompanyPage />} />
        </Route>
        <Route path="/lp/:slug" element={<LpLayout />}>
          <Route index element={<LpPage />} />
        </Route>
        <Route path="/services/:slug" element={<LegacyServiceRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
