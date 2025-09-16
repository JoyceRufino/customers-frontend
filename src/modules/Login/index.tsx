import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { InputField } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

type FormData = {
  name: string;
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    login(data.name.trim());
    navigate("/customers", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-sm p-6 rounded shadow"
      >
        <h1 className="text-xl font-bold mb-4">Olá, seja bem-vindo!</h1>
        <InputField
          name="name"
          control={control}
          label="Digite seu nome"
          placeholder="Digite seu nome"
          rules={{ required: "O nome é obrigatório" }}
          className="w-full mb-5"
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full mt-5"
          disabled={!isValid}
        >
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default Login;
