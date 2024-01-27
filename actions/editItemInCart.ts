"use server";
import { getCartByUserId } from "@/data/carrinho";
import { db } from "@/lib/db";

export const editItemInCart = async ({
    userId,
    productId,
    quantity,
}: {
    userId: string;
    productId: string;
    quantity: number;
}) => {
    const cart = await getCartByUserId(userId);

    if (!cart) {
        console.log("cart error");
        return { error: "esse usuário não possui carrinho" };
    }

    const selectedItem = cart.items.find(
        (item) => item.productId === productId
    );

    if (!selectedItem) {
        console.log("selected item error");
        return { error: "esse produto não existe no carrinho" };
    }

    try {
        const updatedProduct = await db.cartItem.update({
            where: { id: selectedItem.id },
            data: { quantity: quantity },
        });
        return updatedProduct;
    } catch (error) {
        return { error: "Erro ao adicionar ao carrinho." };
    }
};
