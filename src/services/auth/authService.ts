import type LoginResponse from "@/types/auth/login";
import { apiClient } from "../apiClient";

export const authService = {
  login: (email: string, password: string) => apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }),
};