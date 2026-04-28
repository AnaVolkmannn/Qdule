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
      {/* Container principal agora é uma coluna única e estreita */}
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* HEADER E RESUMO DO SERVIÇO */}
        <div className="flex flex-col gap-6">
          <header className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="p-0 h-auto cursor-pointer"
            >
              <ArrowLeft />
            </Button>
            <h2 className="font-semibold text-foreground">
              Horários disponíveis
            </h2>
          </header>

          <div className="rounded-2xl p-6 bg-white/60 border border-border shadow-sm">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Serviço selecionado:
            </p>
            <h2 className="text-2xl font-bold text-fuchsia-800 mt-1">
              {servico.nome}
            </h2>
            <p className="text-sm mt-2 font-medium">
              R$ {servico.preco} • {servico.duracao} min
            </p>
          </div>
        </div>

        {/* CALENDÁRIO */}
        <section className="space-y-4">
          <h3 className="font-bold text-lg text-foreground">
            1. Escolha o dia
          </h3>
          <div className="flex justify-center p-4 bg-white/60 rounded-2xl border border-border shadow-sm">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
              disabled={{ before: new Date() }}
              className="rounded-lg"
            />
          </div>
          {diaSelecionado && (
            <p className="text-sm font-medium text-center">
              Data selecionada: {diaSelecionado}/{mesSelecionado}
            </p>
          )}
        </section>

        {/* HORÁRIOS */}
        <section className="space-y-4">
          <h3 className="font-bold text-lg text-foreground">
            2. Escolha o horário
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {horarios.length === 0 && diaSelecionado && (
              <p className="col-span-3 text-sm text-center py-4 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
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
                  className={`rounded-xl cursor-pointer h-12 transition-all ${
                    ativo
                      ? "bg-pink-400 text-white border-pink-400 shadow-md scale-105"
                      : "hover:border-pink-300"
                  }`}
                >
                  {hora}
                </Button>
              );
            })}
          </div>
        </section>

        {/* BOTÃO FINAL */}
        <div className="pt-4">
          <Button
            disabled={!diaSelecionado || !horarioSelecionado}
            onClick={handleConfirmar}
            className="w-full h-14 cursor-pointer bg-pink-400 hover:bg-pink-500 text-white text-lg font-bold rounded-2xl shadow-lg disabled:opacity-30 transition-all active:scale-95"
          >
            Próximo passo
          </Button>
        </div>
      </div>
    </div>
  );
}
