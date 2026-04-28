import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

/* ================= MOCK ================= */

const mockHorarios: Record<number, string[]> = {
  21: ["08:30", "09:30", "10:00", "10:15", "10:30"],
  22: ["10:00"],
  23: ["14:00"],
  27: ["10:00"],
};

export default function Agenda() {
  const navigate = useNavigate();
  const location = useLocation();

  const servico = location.state?.servico;

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [horarios, setHorarios] = useState<string[]>([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(
    null,
  );

  const diaSelecionado = date ? String(date.getDate()).padStart(2, "0") : null;
  const mesSelecionado = date
    ? String(date.getMonth() + 1).padStart(2, "0")
    : null;

  useEffect(() => {
    if (!diaSelecionado) return;

    setHorarios([]);
    setHorarioSelecionado(null);

    const timer = setTimeout(() => {
      const diaNum = Number(diaSelecionado);
      setHorarios(mockHorarios[diaNum] || []);
    }, 250);

    return () => clearTimeout(timer);
  }, [diaSelecionado]);

  function handleConfirmar() {
    navigate("/cadastro", {
      state: {
        agendamento: {
          servico: servico, // O que veio da primeira tela
          dia: diaSelecionado, // Adicionado aqui
          mes: mesSelecionado, // Adicionado aqui
          horario: horarioSelecionado, // Adicionado aqui
        },
      },
    });
  }

  if (!servico) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Serviço não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ================= LEFT ================= */}
        <div className="flex flex-col gap-6">
          <header className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>

            <h1 className="text-2xl font-semibold">Agendamento</h1>
          </header>

          <div className="rounded-2xl p-6 bg-white/60 backdrop-blur shadow-sm">
            <p className="text-sm text-muted-foreground">Serviço selecionado</p>

            <h2 className="text-2xl font-bold text-pink-500 mt-1">
              {servico.nome}
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              R$ {servico.preco} • {servico.duracao} min
            </p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex flex-col gap-8">
          {/* CALENDÁRIO */}
          <div>
            <h3 className="font-medium mb-3">Escolha o dia</h3>

            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                captionLayout="dropdown"
                disabled={{ before: new Date() }}
                className="rounded-lg bordered bg-white/60 backdrop-blur shadow-sm"
              />
            </div>

            {diaSelecionado && (
              <p className="text-sm text-muted-foreground pt-4 text-center">
                Data selecionada: {diaSelecionado}/{mesSelecionado}
              </p>
            )}
          </div>

          {/* HORÁRIOS */}
          <div>
            <h3 className="font-medium mb-3">Horários disponíveis</h3>

            <div className="grid grid-cols-3 gap-3">
              {horarios.length === 0 && diaSelecionado && (
                <p className="col-span-3 text-sm text-muted-foreground">
                  Nenhum horário disponível para esse dia
                </p>
              )}

              {horarios.map((hora) => {
                const ativo = horarioSelecionado === hora;

                return (
                  <Button
                    key={hora}
                    onClick={() => setHorarioSelecionado(hora)}
                    variant="outline"
                    className={`
                      rounded-xl transition
                      ${ativo ? "bg-pink-400 text-white border-pink-400" : ""}
                    `}
                  >
                    {hora}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* BOTÃO */}
          <div className="mt-auto">
            <Button
              disabled={!diaSelecionado || !horarioSelecionado}
              onClick={handleConfirmar}
              className="
                w-full
                bg-pink-400 hover:bg-pink-500
                text-white rounded-xl
                disabled:opacity-50
              "
            >
              Confirmar agendamento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
