import { useState } from "react";
import { courseAssignmentService } from "../../services/academic/courseAssignmentService";
import type { RegisterRequest, RegisterResponse } from "../../types/academic/courseAssignment";

export function useRegister() {
  const [registerResult, setRegisterResult] = useState<RegisterResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enroll = async (registerRequest: RegisterRequest) => {
    setLoading(true);
    try {
      const data = await courseAssignmentService.register(registerRequest);
      setRegisterResult(data);
    } catch (err) {
      setError("Hubo un error al asignar los cursos ");
    } finally {
        setLoading(false);
      }
  };

  const resetRegisterError = () => {
    setError(null);
  };

  return { registerResult, loading, error, enroll, resetRegisterError };
}
