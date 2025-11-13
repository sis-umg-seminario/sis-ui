export interface StudentGrades {
    students: StudentGrade[];
}
export interface StudentGrade {
    studentId: number;
    name: string;
    scores: Grade[];
    total: number;
    status: "APPROVED" | "FAILED";
}

export interface Grade{
    type: "midtermExam1" | "midtermExam2" | "assignemnts" | "final";
    value: number;
}

