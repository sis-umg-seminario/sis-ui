import Layout from "@/components/Layout";
import FormCourseSchedule from "@/components/FormCourseSchedule";
import CourseScheduleTable from "@/components/CourseScheduleTable";
import { useGetCourseSchedule } from "@/hooks/student/useGetCourseSchedule";
import { type TermType } from "@/types/courseAssignment";

export default function CourseSchedulePage() {
  const { schedule, loading, error, getSchedule } = useGetCourseSchedule();

  const handleConsultarHorario = (values: { studentId: number, startMonth: number, termType: TermType }) => {
    getSchedule(values.studentId, values.startMonth, values.termType);
  };

  return (
    <Layout>
      <div className="w-full h-full grid place-items-center">
        <div className="w-full max-w-3xl">
          {schedule ? (
            <CourseScheduleTable scheduleData={schedule} />
          ) : (
            <FormCourseSchedule isLoading={loading} onSubmit={handleConsultarHorario} />
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </Layout>
  );
}