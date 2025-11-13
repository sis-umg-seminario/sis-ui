import Layout from "@/components/Layout";
import { useFindGrades } from "@/hooks/student/useFindGrades";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import ErrorModal from "@/components/ErrorModal";
import Loader from "@/components/Loader";
import { useState } from "react";
import type { TermType } from "@/types/academic/courseAssignment";
import { CheckCircle2, XCircle, BookOpen } from "lucide-react";

export default function Grades() {
  const { grades, loading, error, findGrades } = useFindGrades();

  const [startMonth, setStartMonth] = useState<number | null>(null);
  const [termType, setTermType] = useState<TermType | null>(null);

  const handleFindGrades = () => {
    if (startMonth && termType) findGrades(startMonth, termType);
  };

  const months = [
    { value: 1, label: "Enero" },
    { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" },
    { value: 6, label: "Junio" },
    { value: 7, label: "Julio" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" },
    { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" },
    { value: 12, label: "Diciembre" },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto min-h-[80vh]">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-600 mb-2 flex items-center justify-center gap-2">
            <BookOpen className="text-yellow-500" />
            Cursos
          </h1>
          <p className="text-gray-700">
            A continuación se listan los cursos y calificaciones del semestre:
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center items-end gap-4 mb-10">
          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mes de inicio
            </label>
            <Select onValueChange={(value) => setStartMonth(Number(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona mes" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m.value} value={String(m.value)}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tipo de período
            </label>
            <Select onValueChange={(value) => setTermType(value as TermType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SEMESTER">Semestre</SelectItem>
                <SelectItem value="TRIMESTER">Trimestre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleFindGrades}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8"
            disabled={!startMonth || !termType}
          >
            Ver
          </Button>
        </div>

        {/* Resultados */}
        {grades && grades.courses && grades.courses.length > 0 ? (
          <div className="flex flex-col gap-4">
            {grades.courses.map((course) => (
              <div
                key={course.courseId}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
              >
                {/* Encabezado del curso */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <BookOpen className="text-yellow-600" size={24} />
                    </div>
                    <h2 className="text-base font-semibold text-gray-800">
                      {course.name.toUpperCase()}
                    </h2>
                  </div>
                  <div>
                    {course.status === "APPROVED" ? (
                      <CheckCircle2 className="text-green-600" size={22} />
                    ) : (
                      <XCircle className="text-red-500" size={22} />
                    )}
                  </div>
                </div>

                {/* Calificaciones */}
                <div className="flex flex-wrap items-center justify-between text-center text-sm text-gray-700">
                  {course.scores.map((score) => (
                    <div key={score.type} className="flex-1 min-w-[60px]">
                      <p className="font-semibold text-gray-500 text-xs uppercase mb-1">
                        {mapGradeLabel(score.type)}
                      </p>
                      <p className="text-base font-bold text-blue-800">
                        {score.value !== null ? score.value : "—"}
                      </p>
                    </div>
                  ))}
                  <div className="flex-1 min-w-[60px]">
                    <p className="font-semibold text-gray-500 text-xs uppercase mb-1">
                      NF
                    </p>
                    <p
                      className={`text-base font-bold ${
                        course.total >= 60
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {course.total}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-12">
            No hay calificaciones para mostrar.
          </div>
        )}

        {/* Loader */}
        <Modal open={loading} title="Cargando">
          <Loader message="Cargando calificaciones, por favor espera..." />
        </Modal>

        {/* Error */}
        <ErrorModal
          open={!!error && !loading}
          message={error ?? ""}
          onClose={() => window.location.reload()}
        />
      </div>
    </Layout>
  );
}

// Utilidad para mostrar etiquetas legibles
function mapGradeLabel(type: string): string {
  const map: Record<string, string> = {
    midtermExam1: "P1",
    midtermExam2: "P2",
    assignments: "A",
    final: "EF",
  };
  return map[type] || type;
}
