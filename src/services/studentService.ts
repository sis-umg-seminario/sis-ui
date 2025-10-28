import { apiClient } from "./apiClient";
import type { TermType } from "@/types/courseAssignment"; 
import type { CourseScheduleResponse } from "@/types/courseSchedule";

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