import { apiClient } from "../apiClient";
import type { AssignedCourses } from "../../types/professor/assignedCourses";
import type { StudentGrades } from "../../types/professor/studentGrades";
import type { CourseStudents } from "../../types/professor/courseStudents";


export const professorService = {
  getStudentGrades: (courseOfferingId: number) => apiClient<StudentGrades>(`/professor/course/${courseOfferingId}/student-grades`),
  getCourseStudents: (courseOfferingId: number) => apiClient<CourseStudents>(`/professor/course/${courseOfferingId}/students`),
  getAssignedCourses: (professorId: number) => apiClient<AssignedCourses>(`/professor/assigned-courses?professorId=${professorId}`),
};