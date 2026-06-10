import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  agendamento: any;
  onConfirmar: () => void;
  onCancelar: () => void;
  onVoltar: () => void;
}

export function ConfirmacaoHorario({
  agendamento,
  onConfirmar,
  onCancelar,
  onVoltar,
}: Props) {
  const { servico, dia, mes, horario, nome } = agendamento;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">
        Confirme os detalhes do seu horário
      </h2>

      <div>
        <h2 className="text-lg font-bold">
          <span className="text-muted-foreground">Olá, </span>
          {nome}
        </h2>
      </div>
      <div className="rounded-xl px-6 flex items-center justify-center gap-2 bg-secondary py-3 my-2 text-white">
        <div>
          <p className="text-sm text-muted-foreground">
            Você selecionou o serviço:
          </p>

          <h2 className="font-bold text-accent">{servico.nome}</h2>

          <p className="text-sm text-gray-600">
            R$ {Number(servico.preco).toFixed(2).replace(".", ",")} •{" "}
            {servico.duracao} min
          </p>
        </div>

        <div className="rounded-xl px-6 flex items-center justify-center gap-2 text-white bg-accent py-4">
          <span className="font-bold">
            {dia}/{mes}
          </span>
          <span className="font-semibold">|</span>
          <span className="font-bold">{horario}h</span>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox className="border-accent text-accent" id="termos" />

        <Label htmlFor="termos">
          Entendo que ao confirmar meu horário, taxas poderão ser aplicadas em
          caso de cancelamento.
        </Label>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onVoltar}>
          Voltar
        </Button>

        <Button variant="outline" onClick={onCancelar}>
          Cancelar
        </Button>

        <Button className="w-48" onClick={onConfirmar}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
