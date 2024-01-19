"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { adicionarAoCarrinho } from "@/actions/adicionarAoCarrinho";

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

    const addToCart = () => {
        if (user?.cart.find((item) => item.productId === productId)) {
            setError("item já existente no carrinho");

            setTimeout(() => {
                setError(null);
            }, 1000);
            return;
        }

        startTransition(() => {
            startTransition(() => {
                adicionarAoCarrinho(
                    { items: [{ productId, quantity }] },
                    user?.id || ""
                );
            });
        });
    };

    return (
        <Button
            disabled={isPending || !!error}
            onClick={addToCart}
            className="w-full min-h-9 h-min whitespace-normal bg-hope-primary text-hope-dark hover:bg-hope-primary/70"
        >
            {error || "Adicionar ao carrinho"}
        </Button>
    );
};

export default AdicionarAoCarrinhoButton;
