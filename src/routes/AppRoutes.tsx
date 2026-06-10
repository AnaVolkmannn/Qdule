import { BrowserRouter, Routes, Route } from "react-router-dom";
import Servico from "@/pages/Servicos";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Servico />} />
      </Routes>
    </BrowserRouter>
  );
}
