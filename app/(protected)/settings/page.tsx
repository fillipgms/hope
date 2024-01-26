"use client";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { MoonLoader } from "react-spinners";

const SettingsPage = () => {
    const user = useCurrentUser();

    const onClick = () => {
        localStorage.setItem("cart", "");
        signOut();
    };

    if (!user) {
        return (
            <div className="flex h-full items-center justify-center">
                <MoonLoader />
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
