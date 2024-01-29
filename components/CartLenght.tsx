"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { setCart } from "@/redux/reducer/cartReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartLength = () => {
    const cartItems = useSelector(
        (state: { cart: { cartItems: models.CartItemProps[] } }) =>
            state.cart.cartItems
    );
    const [itens, setItens] = useState<models.CartItemProps[]>([]);
    const user = useCurrentUser();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(setCart(user.cart.items));
        }
    }, [user]);

    useEffect(() => {
        setItens(cartItems);
    }, [cartItems]);

    return (
        <span className="fixed text-xs right-2 top-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
            {itens.length}
        </span>
    );
};

export default CartLength;
