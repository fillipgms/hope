"use client";

import UserOrders from "@/components/UserOrders";

import { useCurrentUser } from "@/hooks/useCurrentUser";

import Image from "next/image";

import { MoonLoader } from "react-spinners";

const SettingsPage = () => {
    const user = useCurrentUser();

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
                <h3 className="font-semibold py-1 rounded-md">Meus pedidos</h3>

                <UserOrders userId={user.id} />
            </div>
        </main>
    );
};

export default SettingsPage;
