import Layout from "@/components/Layout";
import FormFindEnrollment from "@/components/enrollments/FormFindEnrollment";
import FormProcessPayment from "@/components/payments/FormProcessPayment";
import { useGetEnrollmentFee } from "@/hooks/payment/useGetEnrollmentFee";
import { useProcessPayment } from "@/hooks/payment/useProcessPayment";
import { useState } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import ErrorModal from "../../components/ErrorModal";
import type { PaymentDetails } from "@/types/payments/payment";

export default function Enrollment() {
  const { enrollmentFee, loading: loadingFee, error: errorFee, findEnrollmentFee, resetError } = useGetEnrollmentFee();
  const { paymentResult, loading: loadingPayment, error: errorPayment, pay, resetPaymentError } = useProcessPayment();

  const [studentId, setStudentId] = useState<string | null>(null);

  const handleFindFee = ({ studentId }: { studentId: string }) => {
    setStudentId(studentId);
    findEnrollmentFee(studentId);
  };

  const handlePayment = (cardDetails: Omit<PaymentDetails, "amount">) => {
    if (!studentId || !enrollmentFee) return;

    pay({
      studentId,
      paymentTypeId: 1, // ID de Inscripción
      paymentDetails: {
        ...cardDetails,
        amount: enrollmentFee.enrollmentFee,
      },
    });
  };

  const isLoading = loadingFee || loadingPayment;
  const error = errorFee || errorPayment;

  if (paymentResult) {
    return (
      <Layout>
        <div className="w-full h-full grid place-items-center">
          <div className="text-center p-8 border-2 border-green-500 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-green-600">¡Pago Exitoso!</h2>
            <p>{paymentResult.message}</p>
            <p>
              Código de Autorización:{" "}
              <span className="font-mono bg-gray-100 p-1 rounded">{paymentResult.authorizationCode}</span>
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full h-full grid place-items-center">
        <div>
          {enrollmentFee && studentId ? (
            <FormProcessPayment
              studentId={studentId}
              enrollmentFee={enrollmentFee.enrollmentFee}
              isLoading={isLoading}
              onSubmit={handlePayment}
            />
          ) : (
            <FormFindEnrollment onSubmit={handleFindFee} isLoading={isLoading} />
          )}
        </div>
      </div>

      {/* Loader global */}
      <Modal open={isLoading} title="Procesando">
        <Loader message="Por favor espera..." />
      </Modal>

      <ErrorModal open={!!error && !isLoading && !paymentResult} message={error ?? ""} onClose={() => {resetError(); resetPaymentError();}} />
    
    </Layout>
  );
}
