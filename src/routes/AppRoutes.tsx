import { BrowserRouter, Routes, Route } from "react-router-dom";
import Servico from "@/pages/Servicos";
import Agenda from "@/pages/Agendamento";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Servico />} />
        <Route path="/agenda" element={<Agenda />} />
      </Routes>
    </BrowserRouter>
  );
}