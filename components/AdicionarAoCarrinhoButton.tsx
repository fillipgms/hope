"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { adicionarAoCarrinho } from "@/actions/adicionarAoCarrinho";
import { getProductById } from "@/data/produto";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartAction } from "@/redux/reducer/cartReducer";

interface AdicionarAoCarrinhoButtonProps {
    productId: string;
    quantity?: number;
}

const AdicionarAoCarrinhoButton = ({
    productId,
    quantity = 1,
}: AdicionarAoCarrinhoButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const user = useCurrentUser();
    const dispatch = useDispatch();

    const addToCartHandler = async () => {
        if (
            user?.cart?.items?.find(
                (item) =>
                    item.productId === productId && item.quantity === quantity
            )
        ) {
            setError("item já existente no carrinho");

            setTimeout(() => {
                setError(null);
            }, 1000);
            return;
        }

        const product = await getProductById(productId);

        startTransition(() => {
            startTransition(() => {
                adicionarAoCarrinho(
                    { items: [{ productId, quantity }] },
                    user?.id || ""
                );
            });
        });
        dispatch(addToCartAction({ productId, quantity, product }));
    };

    return (
        <Button
            disabled={isPending || !!error}
            onClick={addToCartHandler}
            className="w-full min-h-9 h-min whitespace-normal bg-hope-primary text-hope-dark hover:bg-hope-primary/70"
        >
            {error || "Adicionar ao carrinho"}
        </Button>
    );
};

export default AdicionarAoCarrinhoButton;
