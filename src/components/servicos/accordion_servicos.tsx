import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const items = [
  {
    id: 1,
    value: "limpeza",
    nome: "Limpeza de pele",
    descricao: "Descrição do serviço de limpeza de pele...",
    duracao: 60,
    preco: 150,
  },
  {
    id: 2,
    value: "massagem",
    nome: "Massagem relaxante",
    descricao: "Descrição da massagem...",
    duracao: 90,
    preco: 200,
  },
  {
    id: 3,
    value: "sobrancelha",
    nome: "Sobrancelha",
    descricao: "Descrição do serviço...",
    duracao: 30,
    preco: 50,
  },
];

export function AccordionServicos() {
  const navigate = useNavigate();

  return (
    <Card className="bg-white/60 backdrop-blur-lg shadow-xl w-full max-w-sm">

      <CardHeader>
        <CardTitle>Menu de Serviços</CardTitle>
      </CardHeader>

      <CardContent>
        <Accordion type="single" collapsible defaultValue="limpeza">
          {items.map((item) => (

            <AccordionItem key={item.id} value={item.value}>
              
              <AccordionTrigger>
                <div className="flex justify-between w-full mr-2">
                  <p>{item.nome}</p>
                  <p className="text-pink-400 font-medium">
                    R$ {item.preco}
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="w-full flex flex-col gap-4">

                  <p>{item.descricao}</p>

                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate("/agenda", {
                        state: { servico: item },
                      })
                    }
                  >
                    <p>Agendar horário</p>
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    Duração média: {item.duracao} min
                  </p>

                </div>
              </AccordionContent>

            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}