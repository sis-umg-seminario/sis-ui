import { useEffect, useState } from "react";
import { programCoursesService } from "../../services/academic/programCoursesService";
import type { ProgramCourses } from "../../types/academic/programCourses";

export function useFetchProgramCourses(programId: number, studentId: number) {
  const [programCourses, setProgramCourses] = useState<ProgramCourses | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await programCoursesService.getById(programId, studentId);
        setProgramCourses(data);
      } catch (err) {
        setError("Failed to fetch program courses");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [programId, studentId]);

  return { programCourses, loading, error };
}
