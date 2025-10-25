// src/components/ui/Loader.tsx
import { Loader2 } from "lucide-react";

export default function Loader({ message = "Cargando..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <Loader2 className="animate-spin text-blue-900 mb-3" size={40} />
      <p className="text-gray-700 text-lg">{message}</p>
    </div>
  );
}
