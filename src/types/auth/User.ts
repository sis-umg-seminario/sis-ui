export interface User{
    userId: number;
    email: string;
    roles: Role[];
    profileInformation: StudentProfile | ProfessorProfile;
    type: "access";
    iat: number;
    exp: number;
}
export type Role = "admin" | "professor" | "student";

export interface StudentUser{
    userId: number;
    email: string;
    roles: Role[];
    profileInformation: StudentProfile;
    type: "access";
    iat: number;
    exp: number;
}

export interface ProfessorUser{
    userId: number;
    email: string;
    roles: Role[];
    profileInformation: ProfessorProfile;
    type: "access";
    iat: number;
    exp: number;
}

//STUDENT PROFILE
export interface StudentProfile{
    studentId: number;
    userId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    studentPrograms: StudentProgram[];
}

export interface StudentProgram{
    studentProgramId: number;
    studentId: number;
    programId: number;
    startDate: string;
    endDate: string | null;
    status: "ENROLLED" | "COMPLETED" | "DROPPED";
    createdAt: string;
    program: Program;
}

export interface Program{
    programId: number;
    name: string;
    description: string;
    enrollmentFee: number;
    createdAt: string;
}
//PROFESSOR PROFILE
export interface ProfessorProfile{
    professorId: number;
    userId: number;
    name: string;
    professionalTitle: string;
    createdAt: string;
}