import Link from "next/link";
import React from "react";
import { IoIosSettings } from "react-icons/io";
import { useDispatch } from "react-redux";
import { RxExit } from "react-icons/rx";
import { signOut } from "next-auth/react";
import { setCart } from "@/redux/reducer/cartReducer";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";

const UserWizard = () => {
    const dispatch = useDispatch();
    const user = useCurrentUser();

    const onClick = () => {
        dispatch(setCart([]));
        signOut();
    };

    return (
        <div className="z-[5] absolute w-max text-base right-0 top-[calc(100%_+_3px)]   drop-shadow-md">
            <span
                className="h-3 w-3 block ml-auto mr-[.69rem] border-l-[6px] border-l-transparent
                            border-b-[7px] border-b-white
                            border-r-[6px] border-r-transparent"
            ></span>
            <div className="bg-white rounded-md">
                <div className="flex gap-4 px-4 py-2">
                    <div className="h-10 w-10">
                        <Image
                            height={50}
                            width={50}
                            className="rounded-full w-full shadow-md"
                            alt="sua foto de perfil"
                            src={
                                user?.image ||
                                "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                            }
                        />
                    </div>
                    <span className="h-10 flex flex-col text-sm justify-around">
                        <h2 className="font-semibold">{user?.name}</h2>
                        <h3>{user?.email}</h3>
                    </span>
                </div>
                <div className="px-4 border-t-2 border-t-neutral-200 py-2">
                    <Link href="/settings" className="flex items-center gap-3">
                        <IoIosSettings /> Seu perfil
                    </Link>
                </div>
                <div
                    className="px-4 py-2 flex items-center gap-3"
                    onClick={onClick}
                >
                    <RxExit />
                    Sair
                </div>
            </div>
        </div>
    );
};

export default UserWizard;
