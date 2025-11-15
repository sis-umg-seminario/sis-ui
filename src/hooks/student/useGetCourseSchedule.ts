import { useState } from "react";
import { studentService } from "@/services/students/studentService";
import type { CourseScheduleResponse } from "@/types/students/courseSchedule";
import type { TermType } from "@/types/academic/courseAssignment";

export function useGetCourseSchedule() {
  const [schedule, setSchedule] = useState<CourseScheduleResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSchedule = async (
    studentId: number,
    startMonth: number,
    termType: TermType
  ) => {
    setLoading(true);
    setError(null);
    setSchedule(null);
    try {
      const data = await studentService.getCourseSchedule(
        studentId,
        startMonth,
        termType
      );
      setSchedule(data);
    } catch (err) {
      setError("Error: No se pudo consultar el horario. Verifique los datos.");
    } finally {
      setLoading(false);
    }
  };

  // 1. AÑADIMOS LA FUNCIÓN DE RESETEO
  const resetSchedule = () => {
    setSchedule(null);
    setError(null);
  };

  // 2. LA AÑADIMOS AL RETURN
  return { schedule, loading, error, getSchedule, resetSchedule };
}