import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import LoginForm from "@/components/auth/LoginForm";
import logo from "@/assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Si ya está logueado → redirigir
  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (data: { email: string; password: string }) => {
    setError("");
    setLoading(true);

    try {
      await login(data.email, data.password);
      navigate("/home");
    } catch (err: any) {
      setError("Credenciales inválidas o error de servidor.");
    }

    setLoading(false);
  };

return (
  <main className="w-full h-screen grid place-items-center bg-primary p-4">
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <img src={logo} alt="Logo" className="w-32 h-32" />
        <h1 className="text-3xl font-bold text-primary-foreground text-center">
          Portal Estudiantil
        </h1>

        <div className="w-full mt-4">
          <LoginForm isLoading={loading} onSubmit={handleSubmit} />
        </div>

        {error && (
          <p className="bg-destructive text-destructive-foreground text-center mt-2 p-3 rounded-md">{error}</p>
        )}

        <div className="text-center text-sm text-primary-foreground/70 mt-4">
          <a href="#" className="hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </main>
  );
}
