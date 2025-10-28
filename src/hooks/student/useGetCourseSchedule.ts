import { useState } from "react";
import { studentService } from "@/services/studentService";
import type { CourseScheduleResponse } from "@/types/courseSchedule";
import type { TermType } from "@/types/courseAssignment";

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
  //   try {
  //     // prueba temporal ---

      
  //     console.log("SIMULANDO LLAMADA A LA API con:", { studentId, startMonth, termType });
      
  //     const fakeData = {
  //       courses: [
  //         { courseId: 1, name: "Introducción a la Programación", section: "A", startTime: "07:00", endTime: "09:00" },
  //         { courseId: 2, name: "Matemática Discreta", section: "B", startTime: "09:00", endTime: "11:00" },
  //         { courseId: 3, name: "Lógica de Sistemas", section: "A", startTime: "11:00", endTime: "13:00" },
  //       ]
  //     };
      
  //     await new Promise(resolve => setTimeout(resolve, 1000)); 

  //     setSchedule(fakeData);

  //   } catch (err) {

  //     setError("Error: No se pudo consultar el horario. Verifique los datos.");
  //   } finally {
  //     setLoading(false);
  //   }
  };

  const resetError = () => {
    setError(null);
  }

  return { schedule, loading, error, getSchedule, resetError };
}