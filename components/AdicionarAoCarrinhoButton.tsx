"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { adicionarAoCarrinho } from "@/actions/adicionarAoCarrinho";
import { getProductById } from "@/data/produto";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart as addToCartAction,
    editCartItem,
} from "@/redux/reducer/cartReducer";
import { editItemInCart } from "@/actions/editItemInCart";

interface AdicionarAoCarrinhoButtonProps {
    productId: string;
    quantity?: number;
    text?: string;
}

const AdicionarAoCarrinhoButton = ({
    productId,
    quantity = 1,
    text,
}: AdicionarAoCarrinhoButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const user = useCurrentUser();
    const cartItems = useSelector(
        (state: { cart: { cartItems: models.CartItemProps[] } }) =>
            state.cart.cartItems
    );
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        const existingReduxCartItem = cartItems.find(
            (item) => item.productId === productId
        );
        const existingDbCartItem = user?.cart?.items?.find(
            (item) => item.productId === productId
        );

        if (
            (existingReduxCartItem &&
                existingReduxCartItem.quantity === quantity) ||
            (existingDbCartItem && existingDbCartItem.quantity === quantity)
        ) {
            setError("item já existente no carrinho");

            setTimeout(() => {
                setError(null);
            }, 1000);
            return;
        }

        startTransition(() => {
            startTransition(async () => {
                const product = await getProductById(productId);

                if (
                    (existingReduxCartItem &&
                        existingReduxCartItem.quantity !== quantity) ||
                    (existingDbCartItem &&
                        existingDbCartItem.quantity !== quantity)
                ) {
                    dispatch(editCartItem({ id: productId, quantity })),
                        editItemInCart({
                            userId: user?.id || "",
                            productId,
                            quantity,
                        });
                } else {
                    dispatch(
                        addToCartAction({
                            productId,
                            quantity,
                            product: product as models.ProdutoProps,
                        })
                    );
                    adicionarAoCarrinho(
                        { items: [{ productId, quantity }] },
                        user?.id || ""
                    );
                }
            });
        });
    };

    return (
        <Button
            disabled={isPending || !!error}
            onClick={addToCartHandler}
            className="w-full px-2 min-h-9 h-min whitespace-normal bg-hope-primary text-hope-dark hover:bg-hope-primary"
        >
            {error || text || "Adicionar ao carrinho"}
        </Button>
    );
};

export default AdicionarAoCarrinhoButton;
