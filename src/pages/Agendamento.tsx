import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

/* ================= MOCK ================= */

const mockHorarios: Record<number, string[]> = {
  21: ["08:30", "09:30"],
  22: ["10:00"],
  23: ["14:00"],
};

/* ======================================= */

export default function Agenda() {
  const navigate = useNavigate();
  const location = useLocation();

  const servico = location.state?.servico;

  const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null);
  const [horarios, setHorarios] = useState<string[]>([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);

  /* simula backend */
  useEffect(() => {
    if (!diaSelecionado) return;

    setTimeout(() => {
      setHorarios(mockHorarios[diaSelecionado] || []);
    }, 300);
  }, [diaSelecionado]);

  function handleConfirmar() {
    const payload = {
      servicoId: servico?.id,
      dia: diaSelecionado,
      horario: horarioSelecionado,
    };

    console.log("ENVIAR PRO BACK:", payload);
  }

  if (!servico) {
    return <p>Serviço não encontrado</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 gap-6">

      {/* HEADER */}
      <div className="w-full max-w-sm flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </Button>

        <h1 className="text-xl font-semibold">
          Horários disponíveis
        </h1>
      </div>

      {/* SERVIÇO */}
      <div className="text-center">
        <p className="text-muted-foreground">
          Serviço selecionado:
        </p>

        <p className="font-semibold text-purple-600">
          {servico.nome}
        </p>

        <p className="text-sm">
          R$ {servico.preco} • {servico.duracao} min
        </p>
      </div>

      {/* DIAS */}
      <div className="flex gap-2">
        {[21, 22, 23].map((dia) => (
          <button
            key={dia}
            onClick={() => setDiaSelecionado(dia)}
            className={`
              w-12 h-12 rounded-xl
              ${diaSelecionado === dia
                ? "bg-pink-400 text-white"
                : "bg-white/60"}
            `}
          >
            {dia}
          </button>
        ))}
      </div>

      {/* HORÁRIOS */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {horarios.map((hora) => (
          <Button
            key={hora}
            onClick={() => setHorarioSelecionado(hora)}
            className={`
              rounded-xl
              ${horarioSelecionado === hora
                ? "bg-pink-400 text-white"
                : ""}
            `}
          >
            {hora}
          </Button>
        ))}
      </div>

      {/* BOTÃO FINAL */}
      <Button
        disabled={!diaSelecionado || !horarioSelecionado}
        onClick={handleConfirmar}
        className="w-full max-w-sm bg-pink-400 hover:bg-pink-500 text-white rounded-xl"
      >
        Escolher horário
      </Button>
    </div>
  );
}