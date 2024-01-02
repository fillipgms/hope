"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import LoginButton from "./auth/LoginButton";
import { CgProfile } from "react-icons/cg";

const LoginWizard = () => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <span
            className="relative"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <p className="flex items-center gap-2 lowercase text-sm cursor-pointer">
                <span className="text-2xl">
                    <CgProfile />
                </span>
                Olá! faça seu login <br /> ou cadastre-se
            </p>
            {isHovering && (
                <div className="absolute top-full w-60 left-1/2 -translate-x-1/2 bg-neutral-200 z-[999] shadow-lg py-3 px-4">
                    <p className=" text-sm">
                        pra ver seus pedidos e ter uma experiência
                        personalizada, acesse sua conta :)
                    </p>
                    <LoginButton>
                        <Button className="w-full">Entrar</Button>
                    </LoginButton>
                </div>
            )}
        </span>
    );
};

export default LoginWizard;
