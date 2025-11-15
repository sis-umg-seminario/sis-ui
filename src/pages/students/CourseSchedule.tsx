import Layout from "@/components/Layout";
import FormCourseSchedule from "@/components/students/FormCourseSchedule";
import CourseScheduleTable from "@/components/students/CourseScheduleTable";
import { useGetCourseSchedule } from "@/hooks/student/useGetCourseSchedule";
import type { TermType } from "@/types/academic/courseAssignment";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import ErrorModal from "@/components/ErrorModal";

export default function CourseSchedule() {
  const { schedule, loading, error, getSchedule, resetSchedule } = useGetCourseSchedule();

  const handleConsultarHorario = (values: { studentId: number; startMonth: number; termType: TermType }) => {
    getSchedule(values.studentId, values.startMonth, values.termType);
  };

  return (
    <Layout>
      {/*
        El 'grid place-items-center' se encarga de centrar vertical y horizontalmente.
        El 'div' interior se encarga de limitar el ancho máximo de su contenido.
      */}
      <div className="w-full h-full grid place-items-center">
        <div className="w-full max-w-3xl"> {/* <-- ESTE ES EL CONTENEDOR QUE AÑADIMOS/MODIFICAMOS */}
          {schedule ? (
            <CourseScheduleTable scheduleData={schedule} onGoBack={resetSchedule} />
          ) : (
            <FormCourseSchedule isLoading={loading} onSubmit={handleConsultarHorario} />
          )}
        </div>
      </div>

      <Modal open={loading} title="Consultando">
        <Loader message="Buscando tu horario..." />
      </Modal>

      <ErrorModal open={!!error && !loading} message={error ?? ""} onClose={resetSchedule} />
    </Layout>
  );
}