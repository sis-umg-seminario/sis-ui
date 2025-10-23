import { apiClient } from "./apiClient";
import type { ProgramCourses } from "../types/programCourses";

export const programCoursesService = {
  getById: (programId: number, studentId: number) => apiClient<ProgramCourses>(`/academic/program-courses/?programId=${programId}&studentId=${studentId}`),
};
