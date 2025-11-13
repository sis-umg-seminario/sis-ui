import { apiClient } from "../apiClient";
import { type RegisterResponse, type EligibleCourses, type RegisterRequest, type TermType } from "@/types/academic/courseAssignment";

export const courseAssignmentService = {
  getAll: (
    studentId: number,
    termType: TermType,
    startMonth: number,
    paymentCode: number
  ) => apiClient<EligibleCourses>("/academic/courses/eligible", {
    params: { studentId, termType, startMonth, paymentCode }
  }),
  register: (registerRequest: RegisterRequest) => apiClient<RegisterResponse>("/enrollments/register", {
    method: "POST",
    body: JSON.stringify(registerRequest)
  })
};
