import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { type TermType } from "@/types/courseAssignment";


const formSchema = z.object({
  studentId: z.coerce.number().int({ message: "El carné debe ser un número." }),
  termType: z.enum(["SEMESTER", "TRIMESTER"]),
  startMonth: z.coerce.number(),
});

interface FormCourseScheduleProps {
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export default function FormCourseSchedule({ isLoading, onSubmit }: FormCourseScheduleProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      termType: "SEMESTER",
      startMonth: 1, 
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border-2 border-black">
        <div className="grid place-items-center h-20 border-b-2 border-black">
          <h2 className="font-bold text-2xl text-center">Consulta de Horario</h2>
        </div>
        <div className="flex flex-col justify-evenly p-6 gap-8">
          <FormField control={form.control} name="studentId" render={({ field }) => (
            <FormItem className="w-64"><FormLabel>No. de Carné</FormLabel><FormControl><Input type="number" {...field} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/></FormControl><FormMessage /></FormItem>
          )} />
          <div className="w-full flex gap-8">
            <FormField control={form.control} name="termType" render={({ field }) => (
              <FormItem className="w-64"><FormLabel>Semestre/Trimestre</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="SEMESTER">Semestre</SelectItem><SelectItem value="TRIMESTER">Trimestre</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="startMonth" render={({ field }) => (
              <FormItem className="w-64"><FormLabel>Mes</FormLabel><Select onValueChange={field.onChange} defaultValue={String(field.value)}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="1">Enero</SelectItem><SelectItem value="7">Julio</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
          </div>
          <Button type="submit" className="w-48 bg-blue-900 hover:cursor-pointer hover:bg-blue-700 self-center" disabled={isLoading}>
            {isLoading ? "Consultando..." : "Consultar Horario"}
          </Button>
        </div>
      </form>
    </Form>
  );
}