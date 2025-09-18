import Layout from "@/components/Layout";
import FormFindEnrollment from "@/components/FormFindEnrollment";
import FormProcessPayment from "@/components/FormProcessPayment";
import { useGetEnrollmentFee } from "@/hooks/payment/useGetEnrollmentFee";
import { useProcessPayment } from "@/hooks/payment/useProcessPayment";
import { useState } from "react";
import type { PaymentDetails } from "@/types/payment";

export default function EnrollmentPage() {
    const { enrollmentFee, loading: loadingFee, error: errorFee, findEnrollmentFee } = useGetEnrollmentFee();
    const { paymentResult, loading: loadingPayment, error: errorPayment, pay } = useProcessPayment();
    

    const [studentId, setStudentId] = useState<string | null>(null);

    const handleFindFee = ({ studentId }: { studentId: string }) => {
        setStudentId(studentId);
        findEnrollmentFee(studentId);
    };

    const handlePayment = (cardDetails: Omit<PaymentDetails, 'amount'>) => {
        if (!studentId || !enrollmentFee) return;

        pay({
            studentId,
            paymentTypeId: 10, // ID de Inscripción
            paymentDetails: {
                ...cardDetails,
                amount: enrollmentFee.enrollmentFee,
            }
        });
    };

    if (paymentResult) {
        return (
            <Layout>
                <div className="w-full h-full grid place-items-center">
                    <div className="text-center p-8 border-2 border-green-500 rounded-lg">
                        <h2 className="text-2xl font-bold text-green-600">¡Pago Exitoso!</h2>
                        <p>{paymentResult.message}</p>
                        <p>Código de Autorización: <span className="font-mono bg-gray-200 p-1 rounded">{paymentResult.authorizationCode}</span></p>
                    </div>
                </div>
            </Layout>
        );
    }
    

    const isLoading = loadingFee || loadingPayment;
    const error = errorFee || errorPayment;

    return (
        <Layout>
            <div className="w-full h-full grid place-items-center">
                <div className="w-full max-w-3xl">
                    {enrollmentFee && studentId ? (
                        <FormProcessPayment 
                            studentId={studentId}
                            enrollmentFee={enrollmentFee.enrollmentFee}
                            isLoading={isLoading}
                            onSubmit={handlePayment}
                        />
                    ) : (
                        <FormFindEnrollment 
                            onSubmit={handleFindFee} 
                            isLoading={isLoading}
                        />
                    )}

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </div>
            </div>
        </Layout>
    );
}