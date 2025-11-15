import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { useFetchCourseStudents } from "@/hooks/professor/useFetchCourseStudents";
import { useFetchStudentGrades } from "@/hooks/professor/useFetchStudentGrades";
import { useUpdateStudentGrades } from "@/hooks/professor/useUpdateStudentGrades";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/Modal";
import ErrorModal from "@/components/ErrorModal";
import Loader from "@/components/Loader";
import type { StudentGrades, Grade } from "@/types/professor/studentGrades";
import { useState, useEffect } from "react";

interface CourseGradesProps {
  editable?: boolean;
}

const gradeLimits = {
  midtermExam1: 10,
  midtermExam2: 20,
  assignments: 35,
  final: 35,
};

const allScoreTypes: Grade["type"][] = [
  "midtermExam1",
  "midtermExam2",
  "assignments",
  "final",
];

export default function AssignedCourse({ editable = true }: CourseGradesProps) {
  const { id } = useParams();
  const courseId = Number(id);

  const { courseStudents, loading: studentsLoading, error: studentsError } =
    useFetchCourseStudents(courseId);

  const { studentGrades: originalGrades, loading: gradesLoading, error: gradesError } =
    useFetchStudentGrades(courseId);

  const { updateGrades, loading: updating, error: updateError } =
    useUpdateStudentGrades();

  const [grades, setGrades] = useState<StudentGrades["students"]>([]);

  useEffect(() => {
    if (!courseStudents?.students) return;

    const gradedMap = new Map(
      originalGrades?.students?.map((s) => [s.studentId, s]) ?? []
    );

    const merged = courseStudents.students.map((student) => {
      const found = gradedMap.get(student.studentId);

      const baseScores = allScoreTypes.map((type) => {
        const existing = found?.scores.find((s) => s.type === type);
        return existing ?? { type, value: 0 };
      });

      return {
        studentId: student.studentId,
        name: found?.name ?? student.name,
        status: found?.status ?? "FAILED",
        scores: baseScores,
      };
    });

    setGrades(merged as StudentGrades["students"]); 
  }, [courseStudents, originalGrades]);

  // Handle input changes
  const handleChange = (studentId: number, type: Grade["type"], value: number) => {
    if (value < 0) value = 0;
    const max = gradeLimits[type];
    if (value > max) value = max;

    const updated = grades.map((s) =>
      s.studentId === studentId
        ? {
            ...s,
            scores: s.scores.map((g) =>
              g.type === type ? { ...g, value } : g
            ),
          }
        : s
    );

    setGrades(updated);
  };

  const calculateTotal = (scores: Grade[]) =>
    scores.reduce((sum, g) => sum + (g.value || 0), 0);

  const isLoading = studentsLoading || gradesLoading || updating;
  const hasError = !!studentsError || !!gradesError || !!updateError;

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto min-h-[80vh]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Calificaciones del Curso
          </h1>
          <p className="text-muted-foreground">
            Visualiza o actualiza las notas de los estudiantes
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grades.map((student) => {
            const original = originalGrades?.students.find(
              (s) => s.studentId === student.studentId
            );

            return (
              <Card
                key={student.studentId}
                className="shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="flex flex-col items-center">
                  <img
                    src={
                      courseStudents?.students.find(
                        (s) => s.studentId === student.studentId
                      )?.profileImageURL || "/placeholder-user.png"
                    }
                    alt={student.name}
                    className="w-16 h-16 rounded-full mb-3 object-cover"
                  />

                  <CardTitle className="text-lg text-foreground">
                    {student.name}
                  </CardTitle>

                  <Badge
                    variant={student.status === "APPROVED" ? "default" : "destructive"}
                    className={student.status === "APPROVED" ? "bg-green-600" : ""}
                  >
                    {student.status === "APPROVED" ? "Aprobado" : "Reprobado"}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-3">
                  {student.scores.map((score) => (
                    <div
                      key={score.type}
                      className="flex justify-between items-center"
                    >
                      <span className="capitalize text-muted-foreground">
                        {score.type === "midtermExam1"
                          ? "Parcial 1"
                          : score.type === "midtermExam2"
                          ? "Parcial 2"
                          : score.type === "assignments"
                          ? "Actividades"
                          : "Examen Final"}
                      </span>

                      {editable ? (
                        <Input
                          type="number"
                          min={0}
                          max={gradeLimits[score.type]}
                          value={score.value}
                          onChange={(e) =>
                            handleChange(
                              student.studentId,
                              score.type,
                              Number(e.target.value)
                            )
                          }
                          className="w-20 text-right"
                        />
                      ) : (
                        <span className="font-semibold">{score.value}</span>
                      )}
                    </div>
                  ))}

                  <hr className="my-2 border-border" />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">
                      {calculateTotal(student.scores)}
                    </span>
                  </div>

                  {editable && (
                    <Button
                      className="w-full mt-3"
                      variant="outline"
                      onClick={() =>
                        updateGrades(
                          student.studentId,
                          courseId,
                          original?.scores ?? [],
                          student.scores
                        )
                      }
                    >
                      Guardar cambios
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Modal open={isLoading} title="Cargando">
          <Loader message="Cargando calificaciones, por favor espera..." />
        </Modal>

        <ErrorModal
          open={hasError && !isLoading}
          message={studentsError ?? gradesError ?? updateError ?? ""}
          onClose={() => window.location.reload()}
        />
      </div>
    </Layout>
  );
}
