import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

// Validación para los campos de la tarjeta
const formSchema = z.object({
    cardName: z.string().min(3, "Nombre inválido"),
    cardNumber: z.string().min(16, "Número de tarjeta debe ser de 16 dígitos").max(16, "Número de tarjeta debe ser de 16 dígitos"),
    expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato debe ser MM/AA"),
    cardVerificationValue: z.string().min(3, "CVV debe ser de 3 dígitos").max(3, "CVV debe ser de 3 dígitos"),
})

interface FormProcessPaymentProps {
    studentId: string;
    enrollmentFee: number;
    isLoading: boolean;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export default function FormProcessPayment({ studentId, enrollmentFee, isLoading, onSubmit }: FormProcessPaymentProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardName: "",
            cardNumber: "",
            expirationDate: "",
            cardVerificationValue: "",
        },
    })

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border-2 border-black">
                <div className="grid place-items-center h-20 border-b-2 border-black">
                    <h2 className="font-bold text-2xl text-center">Realizar Pago</h2>
                </div>
                <div className="flex flex-col justify-evenly p-6 gap-6">
                    <p className="text-center text-lg">Estudiante: <span className="font-bold">{studentId}</span></p>
                    <p className="text-center text-2xl font-bold">Monto a Pagar: Q{Number(enrollmentFee).toFixed(2)}</p>
                    
                    <FormField name="cardName" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Nombre en la Tarjeta</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name="cardNumber" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Número de Tarjeta</FormLabel><FormControl><Input type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="flex gap-4">
                        <FormField name="expirationDate" control={form.control} render={({ field }) => (
                            <FormItem className="flex-1"><FormLabel>Expiración (MM/AA)</FormLabel><FormControl><Input placeholder="MM/AA" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField name="cardVerificationValue" control={form.control} render={({ field }) => (
                            <FormItem className="flex-1"><FormLabel>CVV</FormLabel><FormControl><Input type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    
                    <Button type="submit" className="w-48 bg-blue-900 hover:cursor-pointer hover:bg-blue-700 self-center mt-4" disabled={isLoading}>
                        {isLoading ? "Procesando..." : "Pagar"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}