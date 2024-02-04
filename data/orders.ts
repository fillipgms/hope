"use server";
import { db } from "@/lib/db";

export const getOrdersByUserId = async (userId: string) => {
    const orders = await db.order.findMany({
        where: { userId },
        include: {
            OrderItem: {
                include: {
                    product: {
                        include: {
                            pictures: true,
                            category: true,
                            collection: true,
                        },
                    },
                },
            },
            user: true,
        },
    });

    return orders;
};
