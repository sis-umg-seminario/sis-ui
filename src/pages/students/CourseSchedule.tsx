import Layout from "@/components/Layout";
import FormCourseSchedule from "@/components/students/FormCourseSchedule";
import CourseScheduleTable from "@/components/students/CourseScheduleTable";
import { useGetCourseSchedule } from "@/hooks/student/useGetCourseSchedule";
import { type TermType } from "@/types/academic/courseAssignment";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import ErrorModal from "@/components/ErrorModal";

export default function CourseSchedule() {
  const { schedule, loading, error, getSchedule, resetError } = useGetCourseSchedule();

  const handleConsultarHorario = (values: {
    studentId: number;
    startMonth: number;
    termType: TermType;
  }) => {
    getSchedule(values.studentId, values.startMonth, values.termType);
  };

  return (
    <Layout>
      <div className="w-full min-h-[80vh] flex justify-center items-center">
        <div className="w-full max-w-4xl">
          {schedule ? (
            <CourseScheduleTable scheduleData={schedule} />
          ) : (
            <FormCourseSchedule isLoading={loading} onSubmit={handleConsultarHorario} />
          )}
        </div>
      </div>

      <Modal open={loading} title="Procesando">
        <Loader message="Consultando horario, por favor espera..." />
      </Modal>

      <ErrorModal
        open={!!error && !loading}
        message={error ?? ""}
        onClose={resetError}
      />
    </Layout>
  );
}