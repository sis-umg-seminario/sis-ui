import { apiClient } from "./apiClient";
import type { User } from "../types";

export const userService = {
  getAll: () => apiClient<User[]>("/users"),
  getById: (id: number) => apiClient<User>(`/users/${id}`),
};
