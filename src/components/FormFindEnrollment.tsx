import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

const formSchema = z.object({
    studentId: z.string().min(1, { message: "El carné es requerido." }),
})

export default function FormFindEnrollment({ onSubmit, isLoading }: { onSubmit: (values: z.infer<typeof formSchema>) => void, isLoading: boolean }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentId: "",
        },
    })

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border-2 border-black">
                <div className="grid place-items-center h-20 border-b-2 border-black">
                    <h2 className="font-bold text-2xl text-center">Pago de Inscripción</h2>
                </div>
                <div className="flex flex-col justify-evenly p-6 gap-8">
                    <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                        <FormItem className="w-64 mx-auto">
                            <FormLabel>No. de Carné</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ej: 202300123"
                                    required
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-56 bg-blue-900 hover:cursor-pointer hover:bg-blue-700 self-center" disabled={isLoading}>
                        {isLoading ? "Consultando..." : "Consultar Monto a Pagar"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}