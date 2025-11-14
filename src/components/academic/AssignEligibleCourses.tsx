import { type OfferingCourse, type EligibleCourses } from "@/types/academic/courseAssignment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

interface CourseGroup {
  courseId: number;
  offeringId: number;
  courseName: string;
  section: string[];
  startTime: string;
  endTime: string;
  professor: string;
  capacity: number;
}

export default function AssignEligibleCourses({
  eligibleCourses,
  onConfirm,
}: {
  eligibleCourses: EligibleCourses;
  onConfirm: (offeringCourses: OfferingCourse[]) => void;
}) {
  const [selectedCourses, setSelectedCourses] = useState<OfferingCourse[]>([]);

  const courses: CourseGroup[] = eligibleCourses.courses.reduce((acc, course) => {
    const existing = acc.find((c) => c.courseName === course.courseName);
    if (existing) {
      existing.section.push(course.section);
    } else {
      acc.push({ ...course, section: [course.section] });
    }
    return acc;
  }, [] as CourseGroup[]);

  const handleSelectCourse = (offeringId: number, checked: boolean) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, { offeringId }]);
    } else {
      setSelectedCourses((prev) => prev.filter((c) => c.offeringId !== offeringId));
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-primary text-center mb-6">
        Asignación de Cursos
      </h2>

      <div className="rounded-xl border shadow-sm overflow-hidden">
        <div className="grid grid-cols-[1fr_140px_60px] bg-primary text-primary-foreground px-6 py-3 font-semibold">
          <span>Curso</span>
          <span className="text-center">Sección</span>
          <span className="text-center">Asignar</span>
        </div>

        {courses.map((course, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_140px_60px] items-center px-6 py-3 border-t hover:bg-accent"
          >
            <div>
              <p className="font-medium text-foreground">{course.courseName}</p>
              <p className="text-xs text-muted-foreground">
                {course.professor} • {course.startTime} - {course.endTime}
              </p>
            </div>

            <div className="flex justify-center">
              <Select defaultValue={course.section[0]}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {course.section.map((sec) => (
                    <SelectItem key={sec} value={sec}>
                      {sec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleSelectCourse(course.offeringId, Boolean(checked))
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          disabled={!selectedCourses.length}
          onClick={() => onConfirm(selectedCourses)}
          className="w-48"
        >
          Confirmar Asignación
        </Button>
      </div>
    </div>
  );
}