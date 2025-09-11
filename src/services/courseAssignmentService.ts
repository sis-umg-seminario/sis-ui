import { apiClient } from "./apiClient";
import type { EligibleCourses, TermType } from "@/types/courseAssignment";

export const courseAssignmentService = {
  getAll: (
    studentId: number,
    termType: TermType,
    startMonth: number,
    paymentCode: number
  ) => apiClient<EligibleCourses>("/academic/courses/eligible", {
    params: { studentId, termType, startMonth, paymentCode }
  }),
};
