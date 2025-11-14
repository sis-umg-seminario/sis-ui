import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type CourseScheduleResponse } from "@/types/students/courseSchedule";
import { CalendarDays } from "lucide-react";

interface CourseScheduleTableProps {
  scheduleData: CourseScheduleResponse;
}

export default function CourseScheduleTable({ scheduleData }: CourseScheduleTableProps) {
  return (
    <div className="overflow-hidden border rounded-xl shadow-sm">
      <div className="flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground">
        <CalendarDays size={24} />
        <h2 className="font-bold text-xl text-center">Horario de Cursos Asignados</h2>
      </div>
      <div className="p-4 overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/60 border-b-primary/20">
              <TableHead className="font-semibold text-foreground">Curso</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Sección</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Hora Inicio</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Hora Fin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.courses.map((course) => (
              <TableRow
                key={course.courseId}
                className="hover:bg-muted transition-colors"
              >
                <TableCell className="text-foreground">{course.name}</TableCell>
                <TableCell className="text-center text-foreground">{course.section}</TableCell>
                <TableCell className="text-center text-foreground">{course.startTime}</TableCell>
                <TableCell className="text-center text-foreground">{course.endTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}