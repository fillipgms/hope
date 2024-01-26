"use client";

import React from "react";
import { Provider } from "react-redux";
import { AppState, AppStore, AppThunk, makeStore } from "./store";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Provider store={makeStore()}>{children}</Provider>;
}