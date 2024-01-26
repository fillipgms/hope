export const addToCart = (payload: any) => ({ type: "ADD_TO_CART", payload });
export const removeFromCart = (payload: any) => ({
    type: "REMOVE_FROM_CART",
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
            // Implemente conforme necessário
            return state;
        default:
            return state;
    }
};

export default cartReducer;
