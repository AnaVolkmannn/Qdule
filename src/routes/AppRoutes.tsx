import { BrowserRouter, Routes, Route } from "react-router-dom";
import Servico from "@/pages/Servicos";
import Agenda from "@/pages/Agendamento";
import Cadastro from "@/pages/Cadastro";
import ConfirmaçãoHorário from "@/pages/ConfirmaçãoHorário";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Servico />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/confirmacao" element={<ConfirmaçãoHorário />} />
      </Routes>
    </BrowserRouter>
  );
}
