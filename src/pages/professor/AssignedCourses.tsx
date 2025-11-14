import Layout from "@/components/Layout";
import { useFetchAssignedCourses } from "@/hooks/professor/useFetchAssignedCourses";
import { useAuth } from "@/hooks/auth/useAuth";

import {
  BookOpen,
  Clock,
  CalendarDays,
  GraduationCap,
  Briefcase,
  CalendarCheck,
} from "lucide-react";

import Modal from "@/components/Modal";
import ErrorModal from "@/components/ErrorModal";
import Loader from "@/components/Loader";
import { NavLink } from "react-router-dom";

export default function AssignedCourses() {
  const { professorUser } = useAuth();
  const { assignedCourses, loading, error } = useFetchAssignedCourses(professorUser?.profileInformation.professorId ?? 0);

  const isLoading = loading;
  const hasError = !!error;

  const yearsOfExperience = professorUser
    ? new Date().getFullYear() -
      new Date(professorUser.profileInformation.createdAt).getFullYear()
    : 0;

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto min-h-[80vh]">

        <div className="bg-white rounded-3xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-800">
                Bienvenido, {professorUser?.profileInformation.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {professorUser?.profileInformation.professionalTitle ??
                  "Profesor universitario"}
              </p>
            </div>

            <div className="flex gap-6 justify-center">

              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <Briefcase className="text-blue-700" size={22} />
                </div>
                <p className="text-xs text-gray-500">Experiencia</p>
                <p className="text-lg font-semibold">{yearsOfExperience} años</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <BookOpen className="text-blue-700" size={22} />
                </div>
                <p className="text-xs text-gray-500">Cursos Asignados</p>
                <p className="text-lg font-semibold">
                  {assignedCourses?.courses.length ?? 0}
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <CalendarCheck className="text-blue-700" size={22} />
                </div>
                <p className="text-xs text-gray-500">Ingreso</p>
                <p className="text-lg font-semibold">
                  {new Date(
                    professorUser?.profileInformation.createdAt ?? ""
                  ).getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-blue-900 mb-4">
          Cursos Asignados
        </h2>

        {assignedCourses && assignedCourses.courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {assignedCourses.courses.map((course) => (
              <NavLink
                key={course.courseId}
                to={`/assigned-courses/${course.courseId}`}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  {course.name}
                </h3>

                <div className="flex flex-col gap-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-blue-700" />
                    <span>
                      <strong>Inicio:</strong> {course.startTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="text-blue-700" />
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
              <p>No tienes cursos asignados actualmente.</p>
            </div>
          )
        )}
      </div>

      <Modal open={isLoading} title="Cargando">
        <Loader message="Cargando tus cursos, por favor espera..." />
      </Modal>

      <ErrorModal
        open={hasError && !isLoading}
        message={error ?? ""}
        onClose={() => window.location.reload()}
      />
    </Layout>
  );
}
