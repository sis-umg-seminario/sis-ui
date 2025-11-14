import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CalendarDays } from "lucide-react";

const formSchema = z.object({
  studentId: z.number().int({ message: "El carné debe ser un número válido." }),
  termType: z.enum(["SEMESTER", "TRIMESTER"]),
  startMonth: z.number(),
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card rounded-xl border shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-center gap-2 h-16 bg-primary text-primary-foreground">
          <CalendarDays size={24} />
          <h2 className="font-bold text-xl">Consulta de Horario</h2>
        </div>

        <div className="flex flex-col gap-8 p-6">
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. de Carné</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    required
                    placeholder="Ingrese su número de carné"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-8 justify-start">
            <FormField
              control={form.control}
              name="termType"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel>Semestre / Trimestre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SEMESTER">Semestre</SelectItem>
                      <SelectItem value="TRIMESTER">Trimestre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="startMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mes de Inicio</FormLabel>
                <FormControl>
                  <Select
                    value={String(field.value)}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
                      ].map((month, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <Button
            type="submit"
            className="self-center w-48"
            disabled={isLoading}
          >
            {isLoading ? "Consultando..." : "Consultar Horario"}
          </Button>
        </div>
      </form>
    </Form>
  );
}