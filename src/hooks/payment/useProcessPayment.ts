import { useState } from "react";
import { paymentService } from "@/services/payments/paymentService";
import type { ProcessPaymentPayload, ProcessPaymentResponse } from "@/types/payments/payment";

export function useProcessPayment() {
  const [paymentResult, setPaymentResult] = useState<ProcessPaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = async (payload: ProcessPaymentPayload) => {
    setLoading(true);
    setError(null);
    setPaymentResult(null);
    try {
      const data = await paymentService.processPayment(payload);
      setPaymentResult(data);
    } catch (err) {
      setError("Error: El pago no pudo ser procesado. Intente de nuevo.");
    } finally {
        setLoading(false);
    }
  };

  const resetPaymentError = () => {
    setError(null);
  };

  return { paymentResult, loading, error, pay, resetPaymentError };
}