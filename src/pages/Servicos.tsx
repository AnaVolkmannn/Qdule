import { AccordionServicos } from "@/components/servicos/accordion_servicos";

export default function Servico() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h1 className="text-6xl font-semibold">Hanna Kupas</h1>
      <h2 className="text-3xl font-semibold">Estética Facial & Corporal</h2>
      <AccordionServicos/>
    </div>
  );
}