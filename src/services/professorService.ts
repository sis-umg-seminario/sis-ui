import { apiClient } from "./apiClient";
import type { AssignedCourses } from "../types/assignedCourses";
import type { StudentGrades } from "../types/studentGrades";
import type { CourseStudents } from "../types/courseStudents";


export const professorService = {
  getStudentGrades: (courseOfferingId: number) => apiClient<StudentGrades>(`/professor/course/${courseOfferingId}/student-grades`),
  getCourseStudents: (courseOfferingId: number) => apiClient<CourseStudents>(`/professor/course/${courseOfferingId}/students`),
  getAssignedCourses: (professorId: number) => apiClient<AssignedCourses>(`/professor/assigned-courses?professorId=${professorId}`),
};