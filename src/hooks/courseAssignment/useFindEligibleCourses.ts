import { useState } from "react";
import { courseAssignmentService } from "../../services/courseAssignmentService";
import type { EligibleCourses, TermType } from "../../types/courseAssignment";

export function useFindEligibleCourses() {
  const [eligibleCourses, setEligibleCourses] = useState<EligibleCourses>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const findEligibleCourses = async (
    studentId: number,
    termType: TermType,
    startMonth: number,
    paymentCode: number
  ) => {
    try {
      const data = await courseAssignmentService.getAll(
        studentId,
        termType,
        startMonth,
        paymentCode
      );
      setEligibleCourses(data);
    } catch (err) {
      setError("Failed to fetch eligible courses: " + err);
    } finally {
        setLoading(false);
      }
  };



  return { eligibleCourses, loading, error, findEligibleCourses };
}
