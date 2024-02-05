"use client";

import { editCartItem, removeFromCart } from "@/redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { editItemInCart } from "@/actions/editItemInCart";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { removeItemInCart } from "@/actions/removeItemInCart";

const Quantity = (item: models.CartItemProps) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [isPending, startTransition] = useTransition();
    const dispatch = useDispatch();
    const user = useCurrentUser();

    const productId = item.product.id;

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
        startTransition(() => {
            editItemInCart({
                userId: user?.id || "",
                productId,
                quantity: newQuantity,
            });
            dispatch(editCartItem({ id: productId, quantity: newQuantity }));
        });
    };

    const removeCartItem = () => {
        startTransition(() => {
            removeItemInCart({
                userId: user?.id || "",
                productId,
            });
            dispatch(removeFromCart({ id: productId }));
        });
    };

    return (
        <div className="flex rounded-full overflow-hidden w-24 ">
            <button
                className=" py-1 px-3 bg-hope-primary disabled:bg-hope-primary/70"
                onClick={() => {
                    if (quantity - 1 > 0) {
                        handleQuantityChange(quantity - 1);
                    } else {
                        removeCartItem();
                    }
                }}
                disabled={isPending}
            >
                -
            </button>
            <input
                type="number"
                className="bg-hope-primary w-full text-center m-0 remove-arrow  disabled:bg-hope-primary/70"
                min={0}
                value={quantity}
                readOnly
                disabled={isPending}
            />
            <button
                className="py-1 px-3 bg-hope-primary disabled:bg-hope-primary/70"
                onClick={() => {
                    handleQuantityChange(quantity + 1);
                }}
                disabled={isPending}
            >
                +
            </button>
        </div>
    );
};

const CartItens = () => {
    const cartItems = useSelector(
        (state: { cart: { cartItems: models.CartItemProps[] } }) =>
            state.cart.cartItems
    );

    return (
        <div className="col-span-3 space-y-5 px-4">
            {cartItems.length === 0 ? (
                <p>Sem itens no carrinho</p>
            ) : (
                cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex rounded-md overflow-hidden w-full shadow-md"
                    >
                        <div className=" max-w-28">
                            <Image
                                src={item.product.pictures[0].url}
                                alt={item.product.name}
                                width={500}
                                height={500}
                                loading="lazy"
                                className="h-full aspect-square object-cover "
                            />
                        </div>
                        <div className="w-full">
                            <h4 className=" bg-hope-primary py-1 px-5">
                                {item.product.name}
                            </h4>
                            <div className="pl-5 h-20 flex flex-col justify-center">
                                <div className="flex gap-2 items-center py-1">
                                    <p>{item.product.price}</p>

                                    <Quantity {...item} />
                                </div>
                                <p>
                                    total: R${" "}
                                    {(
                                        parseFloat(
                                            item.product.price.replace(",", ".")
                                        ) * (item.quantity || 1)
                                    )
                                        .toFixed(2)
                                        .replace(".", ",")}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CartItens;
