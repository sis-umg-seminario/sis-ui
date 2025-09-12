export interface EligibleCourses {
    programId: number;
    academicTermId: number;
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

export interface RegisterRequest{
    termId: number;
    studentId: number;
    programId: number;
    paymentCode: number;
    offeringCourses: OfferingCourse[];
}

export interface RegisterResponse{
    status: "Ok" | "FAILED";
    message: string;
}

export interface OfferingCourse{
    offeringId: number;
}
export type TermType = "SEMESTER" | "TRIMESTER";

