"use server";

import { getProductByName } from "@/data/produto";
import { db } from "@/lib/db";
import { ProdutoSchema } from "@/schemas";
import * as z from "zod";

export const criarProduto = async (values: z.infer<typeof ProdutoSchema>) => {
    const validatedFields = ProdutoSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos!" };
    }

    const { nome, descricao, preco, categoria, colecao, fotos } =
        validatedFields.data;

    const existingProduct = await getProductByName(nome);

    if (existingProduct) return { error: "Esse produto já existee!" };

    await db.produto.create({
        data: {
            nome,
            descricao,
            fotos: {
                create: fotos.map((foto) => ({ url: foto })),
            },
            preco,
            categoria: {
                connectOrCreate: {
                    where: { nomeCategoria: categoria },
                    create: { nomeCategoria: categoria },
                },
            },
            colecao: {
                connectOrCreate: {
                    where: { nomeColecao: colecao },
                    create: { nomeColecao: colecao },
                },
            },
        },
    });

    return { success: "produto criado com sucesso" };
};
