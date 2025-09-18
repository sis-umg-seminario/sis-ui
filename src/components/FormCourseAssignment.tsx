import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Select } from "./ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const formSchema = z.object({
    studentId: z.number().int({
        error: "Carné inválido"
    }),
    termType: z.enum(["SEMESTER", "TRIMESTER"]),
    startMonth: z.number(),
    paymentCode: z.number().int({
        error: "Documento de pago no válido"
    })
})

export default function FormCourseAssignment({ onSubmit }: { onSubmit: (values: z.infer<typeof formSchema>) => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            termType: "SEMESTER",
            startMonth: new Date().getMonth() + 1,
        },
    })

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" border-2 border-black">
                <div className=" grid place-items-center h-20 border-b-2 border-black">
                    <h2 className="font-bold text-2xl text-center">Asignación de Cursos</h2>
                </div>
                <div className="flex flex-col justify-evenly p-6 gap-8">
                    <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                        <FormItem className="w-64">
                            <FormLabel>No. de Carné</FormLabel>
                            <FormControl>
                                <Input 
                                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [moz-appearance:textfield]"
                                    type="number"
                                    required
                                    value={field.value}
                                    onChange={e => field.onChange(Number(e.target.value))}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="w-full flex gap-8">
                        <FormField
                        control={form.control}
                        name="termType"
                        render={({ field }) => (
                            <FormItem className="w-64">
                                <FormLabel>Semestre/Trimestre</FormLabel>
                                <FormControl>
                                    <Select 
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
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
                            <FormItem className="w-64">
                                <FormLabel>Mes</FormLabel>
                                <FormControl>
                                    <Select 
                                    value={String(field.value)}
                                    onValueChange={val => field.onChange(Number(val))}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Enero</SelectItem>
                                            <SelectItem value="2">Febrero</SelectItem>
                                            <SelectItem value="3">Marzo</SelectItem>
                                            <SelectItem value="4">Abril</SelectItem>
                                            <SelectItem value="5">Mayo</SelectItem>
                                            <SelectItem value="6">Junio</SelectItem>
                                            <SelectItem value="7">Julio</SelectItem>
                                            <SelectItem value="8">Agosto</SelectItem>
                                            <SelectItem value="9">Septiembre</SelectItem>
                                            <SelectItem value="10">Octubre</SelectItem>
                                            <SelectItem value="11">Noviembre</SelectItem>
                                            <SelectItem value="12">Diciembre</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormField
                    control={form.control}
                    name="paymentCode"
                    render={({ field }) => (
                        <FormItem className="w-64">
                            <FormLabel>Documento de pago</FormLabel>
                            <FormControl>
                                <Input 
                                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [moz-appearance:textfield]"
                                    type="number"
                                    required
                                    value={field.value}
                                    onChange={e => field.onChange(Number(e.target.value))}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <Button type="submit" className="w-48 bg-blue-900 hover:cursor-pointer hover:bg-blue-700 self-center">Asignar Cursos</Button>
                </div>
            </form>
        </Form>
    )
}