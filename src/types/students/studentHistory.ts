export interface StudentHistory{
    studentHistory: History[];
    totalCreditsEarned: number;
}

export interface History{
    historyId: number;
    studentId: number;
    courseId: number;
    grade: string;
    status: "APPROVED" | "FAILED" | "IN_PROGRESS";
    creditsEarned: number;
    createdAt: string;
}