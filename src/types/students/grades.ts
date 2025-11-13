export interface Grades {
    courses: CourseGrade[];
}
export interface CourseGrade {
    courseId: number;
    name: string;
    scores: Grade[];
    total: number;
    status: "APPROVED" | "FAILED";
}

export interface Grade{
    type: "midtermExam1" | "midtermExam2" | "assignemnts" | "final";
    value: number;
}

