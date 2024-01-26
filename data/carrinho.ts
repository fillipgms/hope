import { db } from "@/lib/db";

export const getCartById = async (id: string) => {
    try {
        const carrinhno = await db.cart.findUnique({ where: { id } });

        return carrinhno;
    } catch {
        return null;
    }
};

export const getCartByUserId = async (id: string) => {
    try {
        const carrinhno = await db.cart.findUnique({
            where: { userId: id },
            include: { items: true },
        });

        return carrinhno;
    } catch {
        return null;
    }
};
