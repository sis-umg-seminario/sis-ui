import { apiClient } from "../apiClient";
import {
  type PaymentTypesResponse,
  type EnrollmentFeeResponse,
  type ProcessPaymentPayload,
  type ProcessPaymentResponse
} from "@/types/payments/payment";

export const paymentService = {

  getPaymentTypes: () => 
    apiClient<PaymentTypesResponse>("/payments/paymentTypes"),


  getEnrollmentFee: (studentId: string, paymentTypeId: number) =>
    apiClient<EnrollmentFeeResponse>("/payments/paymentFee", {
      params: {
        studentId,
        paymentTypeId,
      }
    }),
  

  processPayment: (payload: ProcessPaymentPayload) =>
    apiClient<ProcessPaymentResponse>("/payments/processPayment", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};