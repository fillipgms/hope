"use client";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import UserWizard from "./UserWizard";

const LoginWizard = () => {
    const [wizardOpen, setWizardOpen] = useState(false);
    const user = useCurrentUser();

    const onClick = () => {
        setWizardOpen(!wizardOpen);
    };

    return (
        <div>
            {user ? (
                <div className="relative cursor-pointer" onClick={onClick}>
                    <img
                        src={
                            user.image ||
                            "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                        }
                        alt="sua foto de perfil"
                        className="rounded-full w-9 shadow-md h-9 object-cover"
                    />

                    {wizardOpen && <UserWizard />}
                </div>
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
