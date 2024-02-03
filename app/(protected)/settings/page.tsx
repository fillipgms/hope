"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { setCart } from "@/redux/reducer/cartReducer";
import { signOut } from "next-auth/react";
import Image from "next/image";
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
        <main className="max-w-2xl mx-auto">
            <div className="w-full space-y-2 flex flex-col items-center justify-center py-5">
                <Image
                    height={100}
                    width={100}
                    className="rounded-full shadow-md"
                    alt="sua foto de perfil"
                    src={
                        user.image ||
                        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                    }
                />
                <h2 className="font-semibold">{user.name}</h2>
            </div>
            <div className=" text-center">
                <h3 className="font-semibold">Meus pedidos</h3>
                <div></div>
            </div>
        </main>
    );
};

export default SettingsPage;
