"use server";

import { db } from "@/lib/db";
import { CartSchema } from "@/schemas";
import { z } from "zod";

export const adicionarAoCarrinho = async (
    values: z.infer<typeof CartSchema>,
    userId: string
) => {
    try {
        const validatedFields = CartSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Campos inválidos!" };
        }

        const existingCart = await db.cart.findUnique({
            where: {
                userId: userId,
            },
            include: {
                items: true,
            },
        });

        if (!existingCart) {
            const newCart = await db.cart.create({
                data: {
                    userId: userId,
                    items: {
                        create: values.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: {
                    items: true,
                },
            });

            return {
                cart: newCart,
                message: "Produto adicionado ao carrinho!",
            };
        } else {
            // Se o carrinho já existe, adicione os novos itens aos itens existentes
            const updatedCart = await db.cart.update({
                where: {
                    userId: userId,
                },
                data: {
                    items: {
                        createMany: {
                            data: values.items.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                            })),
                        },
                    },
                },
                include: {
                    items: true,
                },
            });

            return {
                cart: updatedCart,
                message: "Produto adicionado ao carrinho!",
            };
        }
    } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
        return { error: "Erro ao adicionar ao carrinho." };
    }
};
