export interface ProgramCourses {
    careerName: string;
    studentName: string;
    creditsEarned: number;
    courses: ProgramCourse[];
}

export interface ProgramCourse {
    courseId: number;
    name: string;
    credits: number;
    prerequisiteCourseId?: string;
    prerequisiteType: "COURSE" | "CREDITS";
    requiredCredits?: number;
    termId: number;
    academicTermTitle: string;
    status: "APPROVED" | "PENDING";
}