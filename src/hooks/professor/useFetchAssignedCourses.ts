import { useEffect, useState } from "react";
import { professorService } from "@/services/professor/professorService";
import type { AssignedCourses } from "@/types/professor/assignedCourses";

export function useFetchAssignedCourses(professorId: number) {
  const [assignedCourses, setAssignedCourses] = useState<AssignedCourses | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await professorService.getAssignedCourses(professorId);
        setAssignedCourses(data);
      } catch (err) {
        setError("Error al cargar los cursos asignados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [professorId]);

  return { assignedCourses, loading, error };
}


 