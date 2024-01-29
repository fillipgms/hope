export const addToCart = (payload: any) => ({ type: "ADD_TO_CART", payload });
export const removeFromCart = (payload: any) => ({
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
    console.log(action.type);
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        case "REMOVE_FROM_CART":
            // Implemente conforme necessário
            return state;
        case "EDIT_CART_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id
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
