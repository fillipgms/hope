import Link from "next/link";
import React from "react";
import { IoIosSettings } from "react-icons/io";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { setCart } from "@/redux/reducer/cartReducer";

const UserWizard = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(setCart([]));
        signOut();
    };

    return (
        <div className="z-[5] absolute top-full text-base left-1/2 -translate-x-1/2 bg-neutral-200 py-2 px-4 rounded-md shadow-sm">
            <span></span>
            <div className="space-y-2">
                <Link href="/settings" className="flex items-center gap-1">
                    <IoIosSettings />
                    Configurações
                </Link>
                <Button onClick={onClick} size="sm" className="w-full text-sm">
                    Sair
                </Button>
            </div>
        </div>
    );
};

export default UserWizard;
