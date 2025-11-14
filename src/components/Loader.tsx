import { Loader2 } from "lucide-react";

export default function Loader({ message = "Cargando..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <Loader2 className="animate-spin text-primary mb-3" size={40} />
      <p className="text-muted-foreground text-lg">{message}</p>
    </div>
  );
}