export default function Sucesso() {
  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6">
        <header className="flex items-center gap-3">
          <h2 className="text-xl font-semibold leading-tight text-left">
            Serviço agendado com sucesso!
          </h2>
        </header>

        <div className="grid w-full gap-4 bg-white/60 p-6 rounded-2xl shadow-lg border border-pink-100">
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-bold text-gray-800 text-muted-foreground">
                Você receberá uma confirmação de agendamento pelo e-mail que
                você cadastrou.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
