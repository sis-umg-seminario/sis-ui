import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-background">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <p className="text-2xl font-medium text-muted-foreground mb-4">¡Ups! Página no encontrada.</p>
      <Link to="/home" className="text-primary hover:underline">
        Volver a la página principal
      </Link>
    </div>
  );
}