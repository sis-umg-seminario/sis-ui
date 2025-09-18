import AssignEligibleCourses from "@/components/AssignEligibleCourses";
import FormCourseAssignment from "@/components/FormCourseAssignment";
import Layout from "@/components/Layout";
import { useFindEligibleCourses } from "@/hooks/courseAssignment/useFindEligibleCourses";
import { useRegister } from "@/hooks/courseAssignment/useRegister";
import type { OfferingCourse, TermType } from "@/types/courseAssignment";
import { useState } from "react";

export default function CourseAssignment(){
    const { eligibleCourses, loading: loadingEligibleCourses, error: errorEligibleCourses, findEligibleCourses } = useFindEligibleCourses();
    const { registerResult, loading: loadingRegister, error: errorRegister, enroll } = useRegister();
    const [studentId, setStudentId] = useState<number | null>(null);
    const [paymentCode, setPaymentCode] = useState<number | null>(null);

    const handleFindEligibleCourses = (
        {studentId, termType, startMonth, paymentCode}: {
            studentId: number,
            termType: TermType,
            startMonth: number,
            paymentCode: number
        }) => {
        findEligibleCourses(studentId, termType, startMonth, paymentCode);
        setStudentId(studentId);
        setPaymentCode(paymentCode);
    }

    const handleRegister = (offeringCourses: OfferingCourse[]) => {
        if(!eligibleCourses || !studentId || !paymentCode) return;
        enroll({
            termId: eligibleCourses.academicTermId,
            studentId: studentId,
            programId: eligibleCourses.programId,
            paymentCode: paymentCode,
            offeringCourses: offeringCourses
        })
    }

    if(loadingEligibleCourses) {
        return <Layout><p>Cargando cursos elegibles...</p></Layout>
    }
    if(loadingRegister) {
        return <Layout><p>Realizando inscripción...</p></Layout>
    }
    if(errorEligibleCourses) {
        return <Layout><p className="text-red-500">Error cargando cursos elegibles: {errorEligibleCourses}</p></Layout>
    }
    if(errorRegister) {
        return <Layout><p className="text-red-500">Error realizando inscripción: {errorRegister}</p></Layout>
    }

    if(registerResult?.status === "Ok") {
        return <Layout><p className="text-green-500">Inscripción realizada con éxito: {registerResult.message}</p></Layout>
    }
    return (
        <Layout>
                <div className="w-full h-full grid place-items-center">
                    <div className="w-full max-w-3xl">
                        {eligibleCourses ?
                        <AssignEligibleCourses eligibleCourses={eligibleCourses} onConfirm={handleRegister}/>
                        :
                        <FormCourseAssignment onSubmit={handleFindEligibleCourses} />
                        }
                    </div>
                </div>
        </Layout>
    )
};