import { type OfferingCourse, type EligibleCourses } from "@/types/courseAssignment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

export default function AssignEligibleCourses({ eligibleCourses, onConfirm }: {eligibleCourses: EligibleCourses, onConfirm: (offeringCourses: OfferingCourse[]) => void}) {

    const [selectedCourses, setSelectedCourses] = useState<OfferingCourse[]>([]);
    const courses: Courses[] = eligibleCourses.courses.reduce((acc, course) => {
        const existingCourse = acc.find(c => c.courseName === course.courseName);
        if (existingCourse) {
            existingCourse.section.push(course.section);
        } else {
            acc.push({...course, section: [course.section]});
        }
        return acc;
    }, [] as Courses[]);

    const handleSelectCourse = (offeringId: number, isSelected: boolean) => {
        if (isSelected) {
            setSelectedCourses([...selectedCourses, { offeringId }]);
        }else {
            setSelectedCourses(selectedCourses.filter(c => c.offeringId !== offeringId));
        }
    }

    return (
        <div className="flex flex-col items-center border-2 border-black">
            <div className="w-full grid place-items-center h-20 mb-8 border-b-2 border-black">
                <h2 className="font-bold text-2xl text-center">Asignación de Cursos</h2>
            </div>
            <div className="w-11/12 m-auto mb-8">
                <div className="grid grid-cols-[1fr_140px] pl-8">
                    <h2 className="font-bold text-xl">Nombre del Curso</h2>
                    <h2 className="font-bold text-xl text-center">Sección</h2>
                </div>
                <div className="flex flex-col justify-center border-black border-2">
                    {courses.map((course, i) => (
                        <div className="grid grid-cols-[1fr_140px] items-center py-2 pl-4 border-b border-black" key={i}>
                        <p className="">{course.courseName}</p>
                        <div className="flex justify-center items-center gap-4">
                            <Select defaultValue={course.section[0]}>
                                <SelectTrigger className="w-[60px] mx-auto m-0 border-black hover:cursor-pointer">
                                    <SelectValue className="border-1 border-black"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {course.section.map(section => (
                                        <SelectItem key={section} value={section}>{section}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Checkbox onCheckedChange={(checked) => handleSelectCourse(course.offeringId, Boolean(checked))}/>
                        </div>
                    </div>
                    ))} 
                </div>
            </div>
            <Button disabled={!selectedCourses.length} onClick={() => onConfirm(selectedCourses)} className="w-48 mb-4 bg-blue-900 hover:cursor-pointer hover:bg-blue-700">Confirmar Asignación</Button>
        </div>
    )
}

 interface Courses{
    courseId: number;
    offeringId: number;
    startTime: string;
    endTime: string;
    professor: string;
    section: string[];
    capacity: number;
    courseName: string;
 }