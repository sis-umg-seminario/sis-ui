import { apiClient } from "../apiClient";
import type { TermType } from "@/types/academic/courseAssignment"; 
import type { CourseScheduleResponse } from "@/types/students/courseSchedule";
import type { Grades } from "@/types/students/grades";
import type { StudentHistory } from "@/types/students/studentHistory";
import type { StudentProfile } from "@/types/students/studentProfile";

export const studentService = {
  
  getCourseSchedule: (
    studentId: number,
    startMonth: number,
    termType: TermType
  ) => {
    const endpoint = `/students/${studentId}/course-schedule`;

    return apiClient<CourseScheduleResponse>(endpoint, {
      params: {
        startMonth,
        termType,
      },
    });
  }, 

  getGrades: (startMonth: number, termType: TermType) => apiClient<Grades>(`/students/student-grades`, {
    params: { startMonth, termType }
  }),
  getProfile: () => apiClient<StudentProfile>(`/students/student-profile`),
  getHistory: () => apiClient<StudentHistory>(`/students/student-history`),
};