// src/pages/professor/AssignedCourses.tsx
import Layout from "@/components/Layout";
import { useFetchAssignedCourses } from "@/hooks/professor/useFetchAssignedCourses";
import { BookOpen, Clock, CalendarDays } from "lucide-react";
import { NavLink } from "react-router-dom";
import Modal from "@/components/Modal";
import ErrorModal from "@/components/ErrorModal";
import Loader from "@/components/Loader";

export default function AssignedCourses() {
  const { assignedCourses, loading, error } = useFetchAssignedCourses(1);

  const isLoading = loading;
  const hasError = !!error;

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto min-h-[80vh]">
        <div className="text-center mb-8">
          <BookOpen className="mx-auto text-blue-900 mb-2" size={60} />
          <h1 className="text-3xl font-bold text-orange-600 mb-2">Cursos Asignados</h1>
          <p className="text-gray-600">Visualiza tus cursos y sus horarios</p>
        </div>

        {assignedCourses && assignedCourses.courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {assignedCourses.courses.map((course) => (
              <NavLink
                key={course.courseId}
                to={`/assigned-courses/${course.courseId}`}
                className="block rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 p-6"
              >
                <h2 className="text-xl font-semibold text-blue-900 mb-3">
                  {course.name}
                </h2>
                <div className="flex flex-col gap-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-blue-800" />
                    <span>
                      <strong>Inicio:</strong> {course.startTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="text-blue-800" />
                    <span>
                      <strong>Fin:</strong> {course.endTime}
                    </span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="text-center text-gray-600 mt-10">
              <p>No hay cursos asignados en este momento.</p>
            </div>
          )
        )}
      </div>

      {/* Modal de carga */}
      <Modal open={isLoading} title="Cargando">
        <Loader message="Cargando tus cursos, por favor espera..." />
      </Modal>

      {/* Modal de error */}
      <ErrorModal
        open={hasError && !isLoading}
        message={error ?? ""}
        onClose={() => window.location.reload()}
      />
    </Layout>
  );
}
