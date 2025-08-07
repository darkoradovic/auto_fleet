import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/validation";
import { z } from "zod";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit, formState } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: LoginData) => {
    const success = auth.login(data.username, data.password);
    if (success) navigate("/vehicles");
    else alert("Pogrešni podaci");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl mb-4 font-bold">Prijava</h1>
        <input
          {...register("username")}
          placeholder="Korisničko ime"
          className="w-full mb-2 border p-2"
        />
        {formState.errors.username && (
          <p className="text-red-500">{formState.errors.username.message}</p>
        )}
        <input
          {...register("password")}
          placeholder="Lozinka"
          type="password"
          className="w-full mb-6 border p-2"
        />
        {formState.errors.password && (
          <p className="text-red-500">{formState.errors.password.message}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Prijavi se
        </button>
      </form>
    </div>
  );
}
