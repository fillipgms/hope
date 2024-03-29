export const addToCart = (payload: any) => ({ type: "ADD_TO_CART", payload });
export const removeFromCart = (payload: { id: string }) => ({
    type: "REMOVE_FROM_CART",
    payload,
});
export const editCartItem = (payload: { id: string; quantity: number }) => ({
    type: "EDIT_CART_ITEM",
    payload,
});
export const setCart = (payload: models.CartItemProps[]) => ({
    type: "SET_CART",
    payload,
});

interface CartState {
    cartItems: models.CartItemProps[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartReducer = (
    state: CartState = initialState,
    action: { type: string; payload?: any }
): CartState => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.product.id !== action.payload.id
                ),
            };
        case "EDIT_CART_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        case "SET_CART":
            return {
                ...state,
                cartItems: action.payload,
            };

        default:
            return state;
    }
};

export default cartReducer;
