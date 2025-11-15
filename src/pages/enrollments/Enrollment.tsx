import Layout from "@/components/Layout";
import FormFindEnrollment from "@/components/enrollments/FormFindEnrollment";
import FormProcessPayment from "@/components/payments/FormProcessPayment";
import { useGetEnrollmentFee } from "@/hooks/payment/useGetEnrollmentFee";
import { useProcessPayment } from "@/hooks/payment/useProcessPayment";
import { useState } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import ErrorModal from "../../components/ErrorModal";
import { CheckCircle2 } from "lucide-react";

export default function Enrollment() {
  const { enrollmentFee, loading: loadingFee, error: errorFee, findEnrollmentFee, resetEnrollmentFee, resetError } = useGetEnrollmentFee();
  const { paymentResult, loading: loadingPayment, error: errorPayment, pay, resetPaymentError } = useProcessPayment();

  const [studentId, setStudentId] = useState<string | null>(null);

  const handleFindFee = ({ studentId }: { studentId: string }) => {
    setStudentId(studentId);
    findEnrollmentFee(studentId);
  };

  const handlePayment = (cardDetails: { cardName: string; cardNumber: string; expirationDate: string; cardVerificationValue: string; }) => {
    if (!studentId || !enrollmentFee) return;

    pay({
      studentId,
      paymentTypeId: 1,
      paymentDetails: {
        ...cardDetails,
        amount: Number(enrollmentFee.enrollmentFee),
      },
    });
  };

  const handleCancelPayment = () => {
    resetEnrollmentFee();
  };

  const error = errorFee || errorPayment;
  const isLoading = loadingFee || loadingPayment;

  if (paymentResult) {
    return (
      <Layout>
        <div className="w-full h-full grid place-items-center">
          <div className="text-center p-8 border-2 border-green-500 rounded-lg shadow-md bg-card flex flex-col items-center gap-4">
            <CheckCircle2 className="text-green-500" size={48} />
            <h2 className="text-2xl font-bold text-green-500">¡Pago Exitoso!</h2>
            <p className="text-foreground">{paymentResult.message}</p>
            <p className="text-muted-foreground">
              Código de Autorización:{" "}
              <span className="font-mono bg-secondary text-secondary-foreground p-1 rounded">{paymentResult.authorizationCode}</span>
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full h-full grid place-items-center p-4">
        {enrollmentFee && studentId ? (
          <FormProcessPayment
            studentId={studentId}
            enrollmentFee={enrollmentFee.enrollmentFee}
            isLoading={loadingPayment}
            onSubmit={handlePayment}
            onCancel={handleCancelPayment}
          />
        ) : (
          <FormFindEnrollment onSubmit={handleFindFee} isLoading={loadingFee} />
        )}
      </div>

      <Modal open={isLoading} title="Procesando">
        <Loader message="Por favor espera..." />
      </Modal>

      <ErrorModal open={!!error && !isLoading && !paymentResult} message={error ?? ""} onClose={() => {resetError(); resetPaymentError();}} />
    
    </Layout>
  );
}