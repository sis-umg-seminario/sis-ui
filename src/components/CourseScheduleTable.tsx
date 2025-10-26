import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type CourseScheduleResponse } from "@/types/courseSchedule";

interface CourseScheduleTableProps {
  scheduleData: CourseScheduleResponse;
}

export default function CourseScheduleTable({ scheduleData }: CourseScheduleTableProps) {
  return (
    <div className="border-2 border-black">
        <div className="grid place-items-center h-20 border-b-2 border-black">
          <h2 className="font-bold text-2xl text-center">Horario de Cursos Asignados</h2>
        </div>
        <div className="p-4">
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
        </div>
    </div>
  );
}