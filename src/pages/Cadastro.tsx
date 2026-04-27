import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();

  return (
    // Removido px-60 e adicionado items-center para centralizar vertical e horizontalmente
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6">
        <header className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>

          <h2 className="text-4x2 font-semibold">
            Para confirmar seu horário, precisamos de um cadastro.
          </h2>
        </header>

        <div className="grid w-full gap-4 bg-white/40 p-6 rounded-2xl shadow-sm backdrop-blur-sm">
          {/* Título do Card */}
          <h2 className="text-lg font-bold text-gray-700 mb-2">
            Dados para contato
          </h2>

          <div className="grid gap-2">
            <Label className="font-bold" htmlFor="nome">
              Nome Completo
            </Label>
            <Input
              className="bg-white"
              type="text"
              id="nome"
              placeholder="Ex: Maria Silva"
            />
          </div>

          <div className="grid gap-2">
            <Label className="font-bold" htmlFor="email">
              E-mail
            </Label>
            <Input
              className="bg-white"
              type="email"
              id="email"
              placeholder="exemplo@email.com"
            />
          </div>

          <div className="grid gap-2">
            <Label className="font-bold" htmlFor="celular">
              Celular
            </Label>
            <Input
              className="bg-white"
              type="tel"
              id="celular"
              placeholder="(47) 99999-9999"
            />
          </div>

          <div className="mt-4">
            <Button
              className="
                w-full
                bg-pink-400 hover:bg-pink-500
                text-white rounded-xl
                disabled:opacity-50
                h-12
              "
            >
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
