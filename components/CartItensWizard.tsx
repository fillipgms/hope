"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

const CartItensWizard = () => {
    const [total, setTotal] = useState<number>();
    const cartItems = useSelector(
        (state: { cart: { cartItems: models.CartItemProps[] } }) =>
            state.cart.cartItems
    );

    useEffect(() => {
        let subtotal = 0;
        cartItems.forEach((item: models.CartItemProps) => {
            const precoNumerico = parseFloat(
                item.product.price.replace("R$", "").replace(",", ".")
            );
            if (!item.quantity) {
                item.quantity = 1;
            }
            subtotal += precoNumerico * item.quantity;
        });

        // Arredonda o subtotal para 2 casas decimais
        const roundedSubtotal = subtotal.toFixed(2);

        setTotal(parseFloat(roundedSubtotal)); // Converte de volta para número
    }, [cartItems]);

    return (
        <div className="h-fit sticky top-24">
            <div className="space-y-4">
                <h3 className="text-center">
                    Subtotal ( {cartItems.length}{" "}
                    {cartItems.length > 1 ? "produtos" : "produto"} ):{" "}
                    <span className="font-bold">
                        R$ {total === 0 ? "0,00" : total}
                    </span>
                </h3>
                <Button className="w-full px-2 min-h-9 h-min whitespace-normal bg-hope-primary text-hope-dark hover:bg-hope-primary/70">
                    Fechar pedido
                </Button>
            </div>
        </div>
    );
};

export default CartItensWizard;
