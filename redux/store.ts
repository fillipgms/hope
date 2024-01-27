import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";

export const makeConfiguredStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
    });

export const makeStore = () => {
    return makeConfiguredStore();
};

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeConfiguredStore>;
export type AppThunk = (...args: any[]) => void;
