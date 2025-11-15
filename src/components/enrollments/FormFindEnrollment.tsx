import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { GraduationCap } from "lucide-react";

const formSchema = z.object({
  studentId: z.string().min(1, { message: "El carné es requerido." }),
});

export default function FormFindEnrollment({
  onSubmit,
  isLoading,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card rounded-2xl shadow-lg border overflow-hidden"
      >
        <div className="flex items-center justify-center gap-3 bg-primary text-primary-foreground h-20">
          <GraduationCap size={32} />
          <h2 className="font-bold text-2xl text-center">Pago de Inscripción</h2>
        </div>

        <div className="flex flex-col justify-evenly p-8 gap-8">
          <p className="text-muted-foreground text-center text-lg">
            Ingresa tu número de carné para consultar el monto a pagar
          </p>

          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem className="w-64 mx-auto text-center">
                <FormLabel className="font-semibold text-foreground">No. de Carné</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: 202300123"
                    className="text-center text-lg"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-56 self-center transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Consultando..." : "Consultar Monto a Pagar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}