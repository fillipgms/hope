"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { setCart } from "@/redux/reducer/cartReducer";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { MoonLoader } from "react-spinners";

const SettingsPage = () => {
    const user = useCurrentUser();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(setCart([]));
        signOut();
    };

    if (!user) {
        return (
            <div className="flex h-full items-center justify-center">
                <MoonLoader color="#276FBF" />
            </div>
        );
    }

    return (
        <main>
            <Button onClick={onClick}>sair</Button>
        </main>
    );
};

export default SettingsPage;
