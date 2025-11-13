export interface CourseStudents{
    students: CourseStudent[];
}

export interface CourseStudent {
    studentId: number;
    name: string;
    profileImageURL: string;
}
