import { useState, useEffect } from "react";
import { professorService } from "@/services/professor/professorService";
import type { CourseStudents } from "@/types/professor/courseStudents";

export function useFetchCourseStudents(courseOfferingId: number) {
  const [courseStudents, setCourseStudents] = useState<CourseStudents | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await professorService.getCourseStudents(courseOfferingId);
        setCourseStudents(data);
      } catch (err) {
        setError("Error al cargar los estudiantes del curso.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseOfferingId]);

  return { courseStudents, loading, error };
}