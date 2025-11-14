import { apiClient } from "../apiClient";
import {
  type PaymentTypesResponse,
  type EnrollmentFeeResponse,
  type ProcessPaymentPayload,
  type ProcessPaymentResponse
} from "@/types/payments/payment";
import type { AccountStatementResponse } from "@/types/students/accountStatement";

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
    }),

    getAccountStatement: (
    studentId: number,
    year: number,
    startMonth: number,
    termType: "SEMESTER" | "TRIMESTER"
  ) => {
    const endpoint = "/payments/account-statement";

    return apiClient<AccountStatementResponse>(endpoint, {
      params: {
        studentId,
        year,
        startMonth,
        termType,
      },
    });
  },
};