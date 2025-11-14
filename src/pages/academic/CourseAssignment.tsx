import AssignEligibleCourses from "@/components/academic/AssignEligibleCourses";
import FormCourseAssignment from "@/components/academic/FormCourseAssignment";
import Layout from "@/components/Layout";
import { useFindEligibleCourses } from "@/hooks/academic/useFindEligibleCourses";
import { useRegister } from "@/hooks/academic/useRegister";
import type { OfferingCourse, TermType } from "@/types/academic/courseAssignment";
import { useState } from "react";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import ErrorModal from "@/components/ErrorModal";

export default function CourseAssignment() {
  const {
    eligibleCourses,
    loading: loadingEligibleCourses,
    error: errorEligibleCourses,
    findEligibleCourses,
    resetEligibleCoursesError
  } = useFindEligibleCourses();
  const {
    registerResult,
    loading: loadingRegister,
    error: errorRegister,
    enroll,
    resetRegisterError
  } = useRegister();

  const [studentId, setStudentId] = useState<number | null>(null);
  const [paymentCode, setPaymentCode] = useState<number | null>(null);

  const handleFindEligibleCourses = ({
    studentId,
    termType,
    startMonth,
    paymentCode,
  }: {
    studentId: number;
    termType: TermType;
    startMonth: number;
    paymentCode: number;
  }) => {
    findEligibleCourses(studentId, termType, startMonth, paymentCode);
    setStudentId(studentId);
    setPaymentCode(paymentCode);
  };

  const handleRegister = (offeringCourses: OfferingCourse[]) => {
    if (!eligibleCourses || !studentId || !paymentCode) return;
    enroll({
      termId: eligibleCourses.academicTermId,
      studentId: studentId,
      programId: eligibleCourses.programId,
      paymentCode: paymentCode,
      offeringCourses: offeringCourses,
    });
  };

  const isLoading = loadingEligibleCourses || loadingRegister;
  const error = errorEligibleCourses || errorRegister;

  if (registerResult?.status === "Ok") {
    return (
      <Layout>
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-center p-8 border-2 border-green-500 rounded-lg shadow-md bg-card max-w-md w-full">
            <h2 className="text-2xl font-bold text-green-500 mb-3">
              ¡Asignación Exitosa!
            </h2>
            <p className="text-foreground">{registerResult.message}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full min-h-[80vh] flex justify-center items-center">
        <div className="w-full max-w-4xl bg-card shadow-lg rounded-xl p-8 border">
          {eligibleCourses ? (
            <AssignEligibleCourses
              eligibleCourses={eligibleCourses}
              onConfirm={handleRegister}
            />
          ) : (
            <FormCourseAssignment onSubmit={handleFindEligibleCourses} />
          )}
        </div>
      </div>

      <Modal open={isLoading} title="Procesando">
        <Loader message="Por favor espera..." />
      </Modal>

        <ErrorModal
          open={!!error && !isLoading && !registerResult}
          message={error ?? ""}
          onClose={() => {resetEligibleCoursesError(); resetRegisterError();}}
        />
    </Layout>
  );
}