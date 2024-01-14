import Link from "next/link";
import React from "react";
import LoginWizard from "./LoginWizard";
import { FaShoppingBasket } from "react-icons/fa";

const Header = () => {
    return (
        <header className="flex fixed top-0 w-full bg-neutral-200 z-[998] shadow-lg justify-between items-center py-5 px-6">
            <Link className="uppercase text-xl font-bold" href="/">
                HOPE
            </Link>

            <div className="flex items-center gap-5 text-3xl">
                <LoginWizard />

                <Link href="/carrinho" className="relative h-full">
                    {/* <span className="fixed text-xs right-2 top-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                        11
                    </span> */}
                    <FaShoppingBasket />
                </Link>
            </div>
        </header>
    );
};

export default Header;
