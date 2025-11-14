export interface StudentProfile{
    studentId: number;
    name: string;
    program: {
        id: number;
        name: string;
    }
    creditsEarned: number;
}