import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    celular: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    celular: "",
  });

  function validar() {
    let novosErros = {
      nome: "",
      email: "",
      celular: "",
    };

    // Nome
    if (!form.nome.trim()) {
      novosErros.nome = "Nome é obrigatório";
    } else if (form.nome.trim().length < 3) {
      novosErros.nome = "Nome muito curto";
    }

    // Email
    if (!form.email.trim()) {
      novosErros.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      novosErros.email = "E-mail inválido";
    }

    // Celular
    if (!form.celular.trim()) {
      novosErros.celular = "Celular é obrigatório";
    } else if (!/^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(form.celular)) {
      novosErros.celular = "Formato inválido (ex: (47) 99999-9999)";
    }

    setErrors(novosErros);

    return !novosErros.nome && !novosErros.email && !novosErros.celular;
  }

  function formatarCelular(valor: string) {
    const numeros = valor.replace(/\D/g, "");

    if (numeros.length <= 2) {
      return `(${numeros}`;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    if (numeros.length <= 11) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    if (id === "celular") {
      setForm({
        ...form,
        celular: formatarCelular(value),
      });
    } else {
      setForm({
        ...form,
        [id]: value,
      });
    }
  }

  function handleSubmit() {
    if (validar()) {
      alert("Cadastro confirmado!");
      navigate("/confirmacao");
    }
  }

  const isDisabled = !form.nome || !form.email || !form.celular;

  return (
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
          <h2 className="text-lg font-bold text-gray-700 mb-2">
            Dados para contato
          </h2>

          {/* Nome */}
          <div className="grid gap-2">
            <Label className="font-bold" htmlFor="nome">
              Nome Completo
            </Label>
            <Input
              className="bg-white"
              type="text"
              id="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex: Maria Silva"
            />
            {errors.nome && (
              <span className="text-red-500 text-sm">{errors.nome}</span>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label className="font-bold" htmlFor="email">
              E-mail
            </Label>
            <Input
              className="bg-white"
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="exemplo@email.com"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Celular */}
          <div className="grid gap-2">
            <Label className="font-bold" htmlFor="celular">
              Celular
            </Label>
            <Input
              className="bg-white"
              type="tel"
              id="celular"
              value={form.celular}
              onChange={handleChange}
              placeholder="(47) 99999-9999"
            />
            {errors.celular && (
              <span className="text-red-500 text-sm">{errors.celular}</span>
            )}
          </div>

          <div className="mt-4">
            <Button
              onClick={handleSubmit}
              disabled={isDisabled}
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
