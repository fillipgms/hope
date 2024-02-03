"use server";
import { getCartByUserId } from "@/data/carrinho";
import { db } from "@/lib/db";

export const removeItemInCart = async ({
    userId,
    productId,
}: {
    userId: string;
    productId: string;
}) => {
    const cart = await getCartByUserId(userId);

    if (!cart) {
        return { error: "esse usuário não possui carrinho" };
    }

    const selectedItem = cart.items.find(
        (item) => item.productId === productId
    );

    if (!selectedItem) {
        return { error: "esse produto não existe no carrinho" };
    }

    try {
        const updatedProduct = await db.cartItem.delete({
            where: { id: selectedItem.id },
        });

        return updatedProduct;
    } catch (error) {
        return;
    }
};
