"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
    const user = useCurrentUser();

    const onClick = () => {
        signOut();
    };

    return (
        <main>
            <Button onClick={onClick}>sair</Button>
        </main>
    );
};

export default SettingsPage;
