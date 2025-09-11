export interface EligibleCourses {
    programId: number;
    academicTerm: number;
    courses: EligibleCourse[];
}

export interface EligibleCourse{
    courseId: number;
    offeringId: number;
    startTime: string;
    endTime: string;
    professor: string;
    section: string;
    capacity: number;
    courseName: string;
}

export type TermType = "SEMESTER" | "TRIMESTER";