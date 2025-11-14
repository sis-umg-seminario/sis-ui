import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";

const formSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export default function LoginForm({ isLoading, onSubmit }: LoginFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input placeholder="ej: usuario@correo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
