"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const LoginWizard = () => {
    const user = useCurrentUser();

    return (
        <div>
            {user ? (
                <Link href="/settings">
                    <img
                        src={
                            user.image ||
                            "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                        }
                        alt="sua foto de perfil"
                        className="rounded-full w-9 shadow-md h-9 object-cover"
                    />
                </Link>
            ) : (
                <Link href="/auth/login" className="relative">
                    <p className="flex items-center gap-2 leading-4 text-sm cursor-pointer">
                        <span className="text-2xl">
                            <CgProfile />
                        </span>
                        Entre ou <br /> Cadastre-se
                    </p>
                </Link>
            )}
        </div>
    );
};

export default LoginWizard;
