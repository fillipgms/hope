"use server";

import { getCartByUserId } from "@/data/carrinho";
import { db } from "@/lib/db";

const formatCurrency = (value: number) => {
    const formattedValue = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    return formattedValue;
};

export const closeOrder = async (userId: string) => {
    try {
        const cart = await getCartByUserId(userId);

        if (!cart) return { error: "Carrinho nãp encontrado" };

        let total = 0;
        cart.items.forEach((item) => {
            total +=
                parseFloat(item.product.price.replace(",", ".")) *
                item.quantity;
        });

        const formattedTotal = formatCurrency(total);

        const order = await db.order.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                status: "finalizado",
                total: formattedTotal,
                createdAt: new Date(),
                updatedAt: new Date(),
                OrderItem: {
                    create: cart.items.map((item) => ({
                        product: {
                            connect: { id: item.product.id },
                        },
                        quantity: item.quantity,
                    })),
                },
            },
        });

        await db.cart.update({
            where: { id: cart.id },
            data: { items: { deleteMany: {} } },
        });

        return order;
    } catch (error) {
        return { error: "Erro ao fechar o pedido" };
    }
};
