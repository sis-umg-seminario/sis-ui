export interface CourseScheduleItem {
  courseId: number;
  name: string;
  section: string;
  startTime: string;
  endTime: string;
}

export interface CourseScheduleResponse {
  courses: CourseScheduleItem[];
}