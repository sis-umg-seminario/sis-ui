import ErrorModal from "@/components/ErrorModal";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/auth/useAuth";
import { useFetchStudentProfile } from "@/hooks/student/useFetchStudentProfile";
import { BookOpen, Calendar, FileText, Pencil, Wallet, Archive } from "lucide-react";
import { Link } from "react-router-dom"; // Usar Link en vez de a

export default function Home() {
  const { studentUser } = useAuth();
  const { studentProfile, loading, error } = useFetchStudentProfile();

  const features = [
    { id: "schedules", label: "Horarios", icon: Calendar, to: "/course-schedule" },
    { id: "pensum", label: "Pensum", icon: BookOpen, to: "/program-courses" },
    { id: "grades", label: "Notas", icon: FileText, to: "/grades" },
    { id: "course-assignment", label: "Asignación", icon: Pencil, to: "/course-assignment" },
    { id: "balance", label: "Estado de Cuenta", icon: Wallet, to: "/account-statement" },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Modal open={loading} title="Cargando">
          <Loader message="Obteniendo información del estudiante..." />
        </Modal>

        <ErrorModal
          open={!!error}
          message={error ?? ""}
          onClose={() => {
            window.location.reload();
          }}
        />

        <div className="relative bg-card rounded-2xl overflow-hidden shadow-md mb-6 border">
          <div className="h-36 bg-primary/80 relative">
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
              <div className="w-36 h-36 bg-card rounded-full filter blur-sm opacity-20"></div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-4">
            <h2 className="text-center text-sm text-muted-foreground">{studentProfile?.program.name}</h2>
            <h1 className="text-center text-xl font-bold mt-2 text-foreground">{studentUser?.profileInformation.firstName} {studentUser?.profileInformation.lastName}</h1>

            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Créditos Aprobados</p>
                <p className="text-lg font-semibold text-foreground">{studentProfile?.creditsEarned}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link // Usar Link
                key={f.id}
                to={f.to} // Usar to
                className="group bg-card rounded-2xl p-6 flex flex-col items-center gap-3 text-center shadow hover:shadow-lg transition border hover:border-primary"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 group-hover:scale-105 transform transition text-primary">
                  <Icon size={28} />
                </div>
                <span className="text-sm text-foreground">{f.label}</span>
              </Link>
            );
          })}
        </section>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card p-4 rounded-lg shadow border">
            <h3 className="font-semibold text-foreground">Avisos recientes</h3>
            <ul className="mt-2 text-sm text-muted-foreground">
              <li>- Pago de inscripción 15/11</li>
              <li>- Publicado horario parcial</li>
            </ul>
          </div>

          <div className="bg-card p-4 rounded-lg shadow border">
            <h3 className="font-semibold text-foreground">Atajos</h3>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 rounded bg-secondary text-secondary-foreground text-sm">Solicitar constancia</button>
              <button className="px-3 py-1 rounded bg-secondary text-secondary-foreground text-sm">Ver pagos</button>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}