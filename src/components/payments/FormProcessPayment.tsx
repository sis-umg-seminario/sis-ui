import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { CreditCard } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

const formSchema = z.object({
  cardName: z.string().min(3, "Nombre inválido"),
  cardNumber: z.string().min(16, "Número de tarjeta debe ser de 16 dígitos").max(16, "Número de tarjeta debe ser de 16 dígitos"),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato debe ser MM/AA"),
  cardVerificationValue: z.string().min(3, "CVV debe ser de 3 dígitos").max(3, "CVV debe ser de 3 dígitos"),
});

// Definimos un tipo para los datos del formulario para más claridad
type PaymentFormValues = z.infer<typeof formSchema>;

interface FormProcessPaymentProps {
  studentId: string;
  enrollmentFee: number;
  isLoading: boolean;
  onSubmit: (values: PaymentFormValues) => void;
  onCancel: () => void;
}

export default function FormProcessPayment({ studentId, enrollmentFee, isLoading, onSubmit, onCancel }: FormProcessPaymentProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expirationDate: "",
      cardVerificationValue: "",
    },
  });

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><CreditCard /> Realizar Pago</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <p>Estudiante: <span className="font-semibold">{studentId}</span></p>
            <p className="text-2xl font-bold">Monto a Pagar: Q{Number(enrollmentFee).toFixed(2)}</p>
            
            <FormField name="cardName" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Nombre en la Tarjeta</FormLabel><FormControl><Input placeholder="Ej: Juan Pérez" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="cardNumber" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Número de Tarjeta</FormLabel><FormControl><Input type="number" placeholder="#### #### #### ####" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="flex gap-4">
              <FormField name="expirationDate" control={form.control} render={({ field }) => (
                <FormItem className="flex-1"><FormLabel>Expiración (MM/AA)</FormLabel><FormControl><Input placeholder="MM/AA" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="cardVerificationValue" control={form.control} render={({ field }) => (
                <FormItem className="w-24"><FormLabel>CVV</FormLabel><FormControl><Input type="number" placeholder="123" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Procesando..." : "Pagar"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}