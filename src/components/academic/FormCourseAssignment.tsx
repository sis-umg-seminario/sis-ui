import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  studentId: z
    .number()
    .int()
    .positive({ message: "Carné inválido" }),
  termType: z.enum(["SEMESTER", "TRIMESTER"]),
  startMonth: z.number(),
  paymentCode: z
    .number()
    .int()
    .positive({ message: "Documento de pago no válido" }),
});

export default function FormCourseAssignment({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      termType: "SEMESTER",
      startMonth: new Date().getMonth() + 1,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">
          Asignación de Cursos
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. de Carné</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento de Pago</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="termType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Periodo</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SEMESTER">Semestre</SelectItem>
                      <SelectItem value="TRIMESTER">Trimestre</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
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
                      <SelectValue placeholder="Seleccionar mes" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre",
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

        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-48 bg-blue-900 hover:bg-blue-700 text-white"
          >
            Buscar Cursos
          </Button>
        </div>
      </form>
    </Form>
  );
}
