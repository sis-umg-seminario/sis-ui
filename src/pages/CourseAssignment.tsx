import AssignEligibleCourses from "@/components/AssignEligibleCourses";
import FormCourseAssignment from "@/components/FormCourseAssignment";
import Layout from "@/components/Layout";
import { useFindEligibleCourses } from "@/hooks/courseAssignment/useFindEligibleCourses";
import type { TermType } from "@/types/courseAssignment";
import { useState } from "react";
import { set } from "zod";

export default function CourseAssignment(){
    const { eligibleCourses, loading, error, findEligibleCourses } = useFindEligibleCourses();
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

    return (
        <Layout>
                <div className="w-full h-full grid place-items-center">
                    <div className="w-full max-w-3xl">
                        {eligibleCourses ?
                        <AssignEligibleCourses eligibleCourses={eligibleCourses}/>
                        :
                        <FormCourseAssignment onSubmit={handleFindEligibleCourses} />
                        }
                    </div>
                </div>
        </Layout>
    )
};