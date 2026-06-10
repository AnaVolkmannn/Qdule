import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Servico } from "@/components/servicos/cards_servicos";

interface CadastroAgendamentoProps {
  servico: Servico;
  dia: string | null;
  mes: string | null;
  horario: string | null;

  onSubmit: (dados: { nome: string; email: string; celular: string }) => void;
}

interface FormData {
  nome: string;
  email: string;
  celular: string;
}

export function CadastroAgendamento({
  servico,
  dia,
  mes,
  horario,
  onSubmit,
}: CadastroAgendamentoProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      email: "",
      celular: "",
    },
  });

  function handleCelularChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatado = e.target.value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15);

    setValue("celular", formatado);
  }

  return (
    <>
      <h2 className="text-xl font-semibold leading-tight text-left">
        Para confirmar seu horário, precisamos de algumas informações
      </h2>

      {/* Resumo */}
      <div className="rounded-xl px-6 flex items-center justify-center gap-2 bg-secondary py-3 my-2 text-white">
        <span className="font-semibold text-sm">{servico.nome}</span>

        <span className="opacity-70">-</span>

        <span className="font-semibold text-sm">
          {dia}/{mes}
        </span>

        <span className="opacity-70">|</span>

        <span className="font-bold text-sm">{horario}h</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-2">
        <div className="grid gap-2">
          <Label className="font-bold text-sm">Nome Completo</Label>

          <Input
            className="bg-white"
            placeholder="Ex: Maria Silva"
            {...register("nome", {
              required: "Nome é obrigatório",
              minLength: {
                value: 3,
                message: "Nome muito curto",
              },
            })}
          />

          {errors.nome && (
            <span className="text-red-500 text-xs">{errors.nome.message}</span>
          )}
        </div>

        <div className="grid gap-2">
          <Label className="font-bold text-sm">E-mail</Label>

          <Input
            type="email"
            className="bg-white"
            placeholder="exemplo@email.com"
            {...register("email", {
              required: "E-mail obrigatório",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail inválido",
              },
            })}
          />

          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        <div className="grid gap-2">
          <Label className="font-bold text-sm">Celular</Label>

          <Input
            type="tel"
            className="bg-white"
            placeholder="(47) 99999-9999"
            {...register("celular", {
              required: "Celular é obrigatório",
            })}
            onChange={handleCelularChange}
          />

          {errors.celular && (
            <span className="text-red-500 text-xs">
              {errors.celular.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-accent hover:bg-buttonhover text-white rounded-xl h-12 mt-2 cursor-pointer"
        >
          Continuar
        </Button>
      </form>
    </>
  );
}
