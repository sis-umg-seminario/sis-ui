import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type CourseScheduleResponse } from "@/types/students/courseSchedule";
import { CalendarDays } from "lucide-react";

interface CourseScheduleTableProps {
  scheduleData: CourseScheduleResponse;
}

export default function CourseScheduleTable({ scheduleData }: CourseScheduleTableProps) {
  return (
    <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
      <div className="flex items-center justify-center gap-2 py-4 bg-blue-950 text-white">
        <CalendarDays size={24} />
        <h2 className="font-bold text-xl text-center">Horario de Cursos Asignados</h2>
      </div>
      <div className="p-4 overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold text-gray-800">Curso</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Sección</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Hora Inicio</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Hora Fin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.courses.map((course) => (
              <TableRow
                key={course.courseId}
                className="hover:bg-blue-50 transition-colors"
              >
                <TableCell className="text-gray-700">{course.name}</TableCell>
                <TableCell className="text-center text-gray-700">{course.section}</TableCell>
                <TableCell className="text-center text-gray-700">{course.startTime}</TableCell>
                <TableCell className="text-center text-gray-700">{course.endTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
