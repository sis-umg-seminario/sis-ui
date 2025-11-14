import { createContext } from "react";
import type { ProfessorUser, StudentUser, User } from "../../types/auth/User";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  studentUser: StudentUser | null;
  professorUser: ProfessorUser | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  studentUser: null,
  professorUser: null,
});
