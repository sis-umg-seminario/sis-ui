import { useState } from "react";
import { paymentService } from "@/services/payments/paymentService";
import type { EnrollmentFeeResponse } from "@/types/payments/payment";

export function useGetEnrollmentFee() {
  const [enrollmentFee, setEnrollmentFee] = useState<EnrollmentFeeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findEnrollmentFee = async (studentId: string) => {
    setLoading(true);
    setError(null);
    setEnrollmentFee(null);
    try {
      const data = await paymentService.getEnrollmentFee(studentId, 10);
      setEnrollmentFee(data);
    } catch (err) {
      setError("Error: No se pudo consultar el monto a pagar. Verifique el carné.");
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  }

  return { enrollmentFee, loading, error, findEnrollmentFee, resetError };
}