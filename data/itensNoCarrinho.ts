import { db } from "@/lib/db";

export const getCartItemsById = async (id: string) => {
    try {
        const carrinhno = await db.cartItem.findUnique({ where: { id } });

        return carrinhno;
    } catch {
        return null;
    }
};

export const getCartItemsByCartId = async (id: string) => {
    try {
        const carrinho = await db.cartItem.findMany({ where: { cartId: id } });

        return carrinho;
    } catch {
        return null;
    }
};
