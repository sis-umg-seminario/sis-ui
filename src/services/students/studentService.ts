import { apiClient } from "../apiClient";
import type { TermType } from "@/types/academic/courseAssignment"; 
import type { CourseScheduleResponse } from "@/types/students/courseSchedule";

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
};