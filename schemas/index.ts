import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email inválido",
    }),
    password: z.string().min(1, {
        message: "insira sua senha",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Isira seu Email",
    }),
    password: z.string().min(6, {
        message: "A senha precisa ter 6 ou mais caracteres",
    }),
    name: z.string().min(1, {
        message: "Isira seu nome",
    }),
});
