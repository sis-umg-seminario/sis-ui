export interface AssignedCourses{
    courses: AssignedCourse[];
}

export interface AssignedCourse {
    courseId: number;
    courseOfferingId: number;
    name: string;
    startTime: string;
    endTime: string;
}
