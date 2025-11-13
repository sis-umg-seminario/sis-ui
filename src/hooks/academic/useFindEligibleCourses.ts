import { useState } from "react";
import { courseAssignmentService } from "../../services/academic/courseAssignmentService";
import type { EligibleCourses, TermType } from "../../types/academic/courseAssignment";

export function useFindEligibleCourses() {
  const [eligibleCourses, setEligibleCourses] = useState<EligibleCourses>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findEligibleCourses = async (
    studentId: number,
    termType: TermType,
    startMonth: number,
    paymentCode: number
  ) => {
    setLoading(true);
    try {
      const data = await courseAssignmentService.getAll(
        studentId,
        termType,
        startMonth,
        paymentCode
      );
      setEligibleCourses(data);
    } catch (err) {
      setError("Ocurrió un error al obtener los cursos elegibles: ");
    } finally {
        setLoading(false);
      }
  };

  const resetEligibleCoursesError = () => {
    setError(null);
  };

  return { eligibleCourses, loading, error, findEligibleCourses, resetEligibleCoursesError };
}
