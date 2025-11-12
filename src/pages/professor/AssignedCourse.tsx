import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { useFetchCourseStudents } from "@/hooks/professor/useFetchCourseStudents";
import { useFetchStudentGrades } from "@/hooks/professor/useFetchStudentGrades";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/Modal";
import ErrorModal from "@/components/ErrorModal";
import Loader from "@/components/Loader";
import type { StudentGrades } from "@/types/studentGrades";
import { useState, useEffect } from "react";

interface CourseGradesProps {
  editable?: boolean; // true => modo profesor (puede modificar notas)
}

const gradeLimits = {
  midtermExam1: 10,
  midtermExam2: 20,
  assignments: 35,
  final: 35,
};

export default function AssignedCourse({ editable = true }: CourseGradesProps) {
  const { id } = useParams();
  const courseId = Number(id);

  const { courseStudents, loading: studentsLoading, error: studentsError } =
    useFetchCourseStudents(courseId);
  const { studentGrades, loading: gradesLoading, error: gradesError } =
    useFetchStudentGrades(courseId);

  const isLoading = studentsLoading || gradesLoading;
  const hasError = !!studentsError || !!gradesError;

  const [grades, setGrades] = useState<StudentGrades["students"]>([]);

  // sincroniza con los datos cargados
  useEffect(() => {
    if (studentGrades?.students) {
      setGrades(studentGrades.students);
    }
  }, [studentGrades]);

  const handleChange = (studentId: number, type: string, value: number) => {
    if (value < 0) value = 0;
    const limit = gradeLimits[type as keyof typeof gradeLimits];
    if (value > limit) value = limit;

    const updated = grades.map((s) =>
      s.studentId === studentId
        ? {
            ...s,
            scores: s.scores.map((g) =>
              g.type === type ? { ...g, value } : g
            ),
            total: s.scores.reduce(
              (sum, g) =>
                g.type === type ? sum + value - g.value : sum + g.value,
              0
            ),
          }
        : s
    );

    setGrades(updated);
  };

  const calculateTotal = (scores: StudentGrades["students"][number]["scores"]) =>
    scores.reduce((sum, g) => sum + g.value, 0);

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto min-h-[80vh]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Calificaciones del Curso
          </h1>
          <p className="text-gray-600">
            Visualiza o actualiza las notas de los estudiantes
          </p>
        </div>

        {/* Grid de estudiantes */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grades.map((student) => (
            <Card
              key={student.studentId}
              className="shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200"
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
                <CardTitle className="text-lg text-blue-900">
                  {student.name}
                </CardTitle>
                <Badge
                  variant={
                    student.status === "APPROVED" ? "success" : "destructive"
                  }
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
                    <span className="capitalize text-gray-700">
                      {score.type === "midtermExam1"
                        ? "Parcial 1"
                        : score.type === "midtermExam2"
                        ? "Parcial 2"
                        : score.type === "assignemnts"
                        ? "Actividades"
                        : "Examen Final"}
                    </span>

                    {editable ? (
                      <Input
                        type="number"
                        min={0}
                        max={gradeLimits[score.type as keyof typeof gradeLimits]}
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

                <hr className="my-2" />

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-blue-900">
                    {calculateTotal(student.scores)}
                  </span>
                </div>

                {editable && (
                  <Button
                    className="w-full mt-3"
                    variant="outline"
                    onClick={() =>
                      console.log("Guardar cambios del alumno", student)
                    }
                  >
                    Guardar cambios
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estado de carga */}
        <Modal open={isLoading} title="Cargando">
          <Loader message="Cargando calificaciones, por favor espera..." />
        </Modal>

        {/* Estado de error */}
        <ErrorModal
          open={hasError && !isLoading}
          message={studentsError ?? gradesError ?? ""}
          onClose={() => window.location.reload()}
        />
      </div>
    </Layout>
  );
}
