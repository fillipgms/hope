"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import MoonLoader from "react-spinners/MoonLoader";

export default async function SettingsPage() {
    const user = useCurrentUser();

    if (!user) throw Error("usuário não encontrado");

    return (
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
    );
}
