"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { closeOrder } from "@/actions/closeOrder";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { setCart } from "@/redux/reducer/cartReducer";
import { redirect, useRouter } from "next/navigation";

const CartItensWizard = () => {
    const user = useCurrentUser();
    const dispatch = useDispatch();

    const { push } = useRouter();
    const [total, setTotal] = useState<number>();
    const [isPending, startTransition] = useTransition();
    const cartItems = useSelector(
        (state: { cart: { cartItems: models.CartItemProps[] } }) =>
            state.cart.cartItems
    );

    useEffect(() => {
        let subtotal = 0;
        cartItems.forEach((item: models.CartItemProps) => {
            if (!item.quantity) {
                item.quantity = 1;
            }
            subtotal +=
                parseFloat(item.product.price.replace(",", ".")) *
                item.quantity;
        });

        const roundedSubtotal = subtotal.toFixed(2);

        setTotal(parseFloat(roundedSubtotal));
    }, [cartItems]);

    const closeActiveOrder = () => {
        if (user) {
            startTransition(async () => {
                await closeOrder(user?.id || "");
                dispatch(setCart([]));
            });
        } else {
            push("/auth/login");
        }
    };

    return (
        <div className="h-fit  sticky top-[5.5rem] py-4 px-4 shadow-md md:shadow-none bg-slate-50">
            <div className="space-y-4">
                <h3 className="text-center">
                    Subtotal ( {cartItems.length}{" "}
                    {cartItems.length !== 1 ? "produtos" : "produto"} ):{" "}
                    <span className="font-bold">
                        R$ {total === 0 ? "0,00" : total}
                    </span>
                </h3>
                <Button
                    onClick={closeActiveOrder}
                    disabled={isPending || cartItems.length === 0}
                    className="w-full px-2 min-h-9 h-min whitespace-normal bg-hope-primary text-hope-dark hover:bg-hope-primary/70"
                >
                    Fechar pedido
                </Button>
            </div>
        </div>
    );
};

export default CartItensWizard;
