import { useEffect, useState } from "react";
import { professorService } from "@/services/professor/professorService";
import type { StudentGrades } from "@/types/professor/studentGrades";

export function useFetchStudentGrades(courseOfferingId: number) {
  const [studentGrades, setStudentGrades] = useState<StudentGrades | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await professorService.getStudentGrades(courseOfferingId);
        setStudentGrades(data);
      } catch (err) {
        setError("Error al cargar las notas de los estudiantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseOfferingId]);

  return { studentGrades, loading, error };
}