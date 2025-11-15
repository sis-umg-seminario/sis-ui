import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type CourseScheduleResponse } from "@/types/students/courseSchedule";
// 1. IMPORTAMOS EL COMPONENTE DEL BOTÓN
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { CalendarDays } from "lucide-react";

interface CourseScheduleTableProps {
  scheduleData: CourseScheduleResponse;
  onGoBack: () => void; // 2. AÑADIMOS LA NUEVA PROP
}

export default function CourseScheduleTable({ scheduleData, onGoBack }: CourseScheduleTableProps) {
  return (
    <Card className="w-full max-w-3xl">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarDays /> Horario de Cursos Asignados</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Curso</TableHead>
                        <TableHead className="font-bold text-center">Sección</TableHead>
                        <TableHead className="font-bold text-center">Hora Inicio</TableHead>
                        <TableHead className="font-bold text-center">Hora Fin</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {scheduleData.courses.map((course) => (
                        <TableRow key={course.courseId}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell className="text-center">{course.section}</TableCell>
                            <TableCell className="text-center">{course.startTime}</TableCell>
                            <TableCell className="text-center">{course.endTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            {/* Si no hay cursos, mostramos un mensaje */}
            {scheduleData.courses.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No tienes cursos asignados para el período consultado.</p>
            )}

        </CardContent>
        {/* 3. AÑADIMOS EL FOOTER CON EL BOTÓN */}
        <CardFooter className="flex justify-end mt-4">
            <Button variant="outline" onClick={onGoBack}>
                Regresar
            </Button>
        </CardFooter>
    </Card>
  );
}