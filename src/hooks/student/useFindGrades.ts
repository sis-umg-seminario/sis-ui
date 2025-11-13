import { useState } from "react";
import { studentService } from "../../services/students/studentService";
import type { TermType } from "../../types/academic/courseAssignment";
import type { Grades } from "@/types/students/grades";

export function useFindGrades() {
  const [grades, setGrades] = useState<Grades>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findGrades = async (
    startMonth: number,
    termType: TermType
  ) => {
    setLoading(true);
    try {
      const data = await studentService.getGrades(
        startMonth,
        termType
      );
      setGrades(data);
    } catch (err) {
      setError("Error al cargar las calificaciones");
    } finally {
        setLoading(false);
      }
  };

  const resetGradesError = () => {
    setError(null);
  };

  return { grades, loading, error, findGrades, resetGradesError };
}
