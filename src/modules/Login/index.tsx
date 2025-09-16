import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    navigate("/customers", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-6 rounded shadow"
      >
        <h1 className="text-xl font-bold mb-4">Olá, seja bem-vindo!</h1>
        <label className="block  mb-1" htmlFor="name">
          Digite seu nome
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Digite seu nome"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full py-2 rounded bg-primary text-white disabled:opacity-50"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
