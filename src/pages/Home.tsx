// src/pages/Home.tsx
import Layout from "@/components/Layout";
import { Bell, Settings, BookOpen, Calendar, FileText, Pencil, Wallet, Archive } from "lucide-react";

export default function Home() {
  // Datos quemados (mock)
  const user = {
    studentName: "LUIS A. MURALES",
    program: "Ingeniería en Sistemas de Información",
    creditsEarned: 223,
    idBadge: "20 - 564",
  };

  const features = [
    { id: "schedules", label: "Horarios", icon: Calendar, to: "/course-schedule" },
    { id: "pensum", label: "Pensum", icon: BookOpen, to: "/program-courses" },
    { id: "grades", label: "Notas", icon: FileText, to: "/grades" },
    { id: "course-assignment", label: "Asignación", icon: Pencil, to: "/course-assignment" },
    { id: "balance", label: "Estado de Cuenta", icon: Wallet, to: "/balance" },
    { id: "library", label: "Biblioteca", icon: Archive, to: "/library" },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* header card */}
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-md mb-6">
          <div className="h-36 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
            {/* action buttons */}
            <div className="absolute right-4 top-3 flex gap-3">
              <button className="bg-white/90 p-2 rounded-full shadow flex items-center justify-center"><Bell size={18} /></button>
              <button className="bg-white/90 p-2 rounded-full shadow flex items-center justify-center"><Settings size={18} /></button>
            </div>
            {/* decorative curve */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
              <div className="w-36 h-36 bg-white rounded-full filter blur-sm opacity-20"></div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-4">
            <h2 className="text-center text-sm text-slate-600">INGENIERÍA EN SISTEMAS DE INFORMACIÓN Y CIENCIAS DE LA COMPUTACIÓN, SÁBADO MATUTINA</h2>
            <h1 className="text-center text-xl font-bold mt-2">{user.studentName}</h1>

            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-xs text-gray-500">Créditos Aprobados</p>
                <p className="text-lg font-semibold">{user.creditsEarned}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Carné</p>
                <p className="text-lg font-semibold">{user.idBadge}</p>
              </div>
            </div>
          </div>
        </div>

        {/* feature grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <a
                key={f.id}
                href={f.to}
                className="group bg-white rounded-2xl p-6 flex flex-col items-center gap-3 text-center shadow hover:shadow-lg transition"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 group-hover:border-transparent group-hover:scale-105 transform transition">
                  <Icon size={28} />
                </div>
                <span className="text-sm text-gray-700">{f.label}</span>
              </a>
            );
          })}
        </section>

        {/* quick info / cards */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Avisos recientes</h3>
            <ul className="mt-2 text-sm text-gray-600">
              <li>- Pago de inscripción 15/11</li>
              <li>- Publicado horario parcial</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Atajos</h3>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 rounded bg-indigo-50 text-indigo-700 text-sm">Solicitar constancia</button>
              <button className="px-3 py-1 rounded bg-green-50 text-green-700 text-sm">Ver pagos</button>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-gray-400">"Y conoceréis la verdad y la verdad os hará libres"</p>
      </div>
    </Layout>
  );
}
