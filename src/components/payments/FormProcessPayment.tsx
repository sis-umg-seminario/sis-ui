import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { CreditCard } from "lucide-react";

// Validación con Zod
const formSchema = z.object({
  cardName: z.string().min(3, "Nombre inválido"),
  cardNumber: z
    .string()
    .min(16, "Número de tarjeta debe ser de 16 dígitos")
    .max(16, "Número de tarjeta debe ser de 16 dígitos"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato debe ser MM/AA"),
  cardVerificationValue: z
    .string()
    .min(3, "CVV debe ser de 3 dígitos")
    .max(3, "CVV debe ser de 3 dígitos"),
});

interface FormProcessPaymentProps {
  studentId: string;
  enrollmentFee: number;
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export default function FormProcessPayment({
  studentId,
  enrollmentFee,
  isLoading,
  onSubmit,
}: FormProcessPaymentProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expirationDate: "",
      cardVerificationValue: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-3 bg-blue-900 text-white h-20">
          <CreditCard size={28} />
          <h2 className="font-bold text-2xl text-center">Realizar Pago</h2>
        </div>

        <div className="flex flex-col justify-evenly p-8 gap-6">
          <p className="text-center text-gray-700 text-lg">
            Estudiante: <span className="font-semibold text-blue-900">{studentId}</span>
          </p>
          <p className="text-center text-2xl font-bold text-blue-900">
            Monto a Pagar: Q{Number(enrollmentFee).toFixed(2)}
          </p>

          {/* Campos */}
          <FormField
            name="cardName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Nombre en la Tarjeta</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Juan Pérez"
                    className="border-gray-300 focus:border-blue-700 focus:ring-blue-700"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="cardNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Número de Tarjeta</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="#### #### #### ####"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300 focus:border-blue-700 focus:ring-blue-700"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              name="expirationDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold text-gray-700">Expiración (MM/AA)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="MM/AA"
                      className="border-gray-300 focus:border-blue-700 focus:ring-blue-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="cardVerificationValue"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold text-gray-700">CVV</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="123"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300 focus:border-blue-700 focus:ring-blue-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-48 bg-blue-900 hover:bg-blue-700 self-center mt-4 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Pagar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
