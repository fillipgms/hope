"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
    const user = useCurrentUser();

    const onClick = () => {
        signOut();
    };

    return (
        <main>
            <div className="py-3 px-5 flex items-center gap-3 justify-center flex-col">
                <img
                    src={
                        user?.image ||
                        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                    }
                    alt="sua foto de perfil"
                    className="rounded-full shadow-md object-cover h-full max-h-24"
                />
                <h2 className="font-semibold text-md">{user?.name}</h2>
            </div>
            <form>oii</form>
            <div>
                <button onClick={onClick}>Sair</button>
            </div>
        </main>
    );
};

export default SettingsPage;
