import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartReducer";

const makeConfiguredStore = () =>
    configureStore({
        reducer: {
            cart: cartReducer,
        },
        devTools: true,
    });

export const makeStore = () => {
    return makeConfiguredStore();
};
