import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ConfirmaçãoHorário() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6">
        <header className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>

          <h2 className="text-4x2 font-semibold">
            Você está prestes a agendar um horário.
          </h2>
        </header>

        <div className="grid w-full gap-4 bg-white/40 p-6 rounded-2xl shadow-sm backdrop-blur-sm">
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
