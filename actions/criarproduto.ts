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

    const { name, description, price, category, collection, pictures } =
        validatedFields.data;

    const existingProduct = await getProductByName(name);

    if (existingProduct) return { error: "Esse produto já existee!" };

    await db.product.create({
        data: {
            name,
            description,
            pictures: {
                create: pictures.map((foto) => ({ url: foto })),
            },
            price,
            category: {
                connectOrCreate: {
                    where: { categoryName: category },
                    create: { categoryName: category },
                },
            },
            collection: {
                connectOrCreate: {
                    where: { collectionName: collection },
                    create: { collectionName: collection },
                },
            },
        },
    });

    return { success: "produto criado com sucesso" };
};
