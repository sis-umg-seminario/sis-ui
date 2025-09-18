import { useState } from "react";
import { courseAssignmentService } from "../../services/courseAssignmentService";
import type { RegisterRequest, RegisterResponse } from "../../types/courseAssignment";

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
      setError("Failed to register courses: " + err);
    } finally {
        setLoading(false);
      }
  };



  return { registerResult, loading, error, enroll };
}
