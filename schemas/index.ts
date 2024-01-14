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

export const FotoProdutoSchema = z.object({
    url: z.string().url({
        message: "Insira uma URL válida para a foto",
    }),
});

export const ProdutoSchema = z.object({
    nome: z.string().min(1, {
        message: "Insira o nome do produto",
    }),
    descricao: z.string().min(1, {
        message: "Insira a descrição do produto",
    }),
    preco: z.string().min(1, {
        message: "Insira o preço do produto",
    }),
    categoria: z.string().min(1, {
        message: "Insira a categoria do produto",
    }),
    colecao: z.string().min(1, {
        message: "Selecione a coleção do produto",
    }),
    fotos: z.array(z.string()).default([]),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Insira um email",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "A senha precisa ter 6 ou mais caracteres",
    }),
});
