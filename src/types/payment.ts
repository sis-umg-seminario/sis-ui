export interface PaymentType {
  id: number;
  description: string;
}

export interface PaymentTypesResponse {
  paymentTypes: PaymentType[];
}


export interface EnrollmentFeeResponse {
  paymentTypeId: number;
  enrollmentFee: number;
}


export interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  cardVerificationValue: string;
  amount: number;
}

export interface ProcessPaymentPayload {
  studentId: string;
  paymentTypeId: number;
  paymentDetails: PaymentDetails;
}


export interface ProcessPaymentResponse {
  message: string;
  authorizationCode: string;
}