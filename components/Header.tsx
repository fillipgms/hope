import Link from "next/link";
import React from "react";
import LoginWizard from "./LoginWizard";
import { FaShoppingBasket } from "react-icons/fa";
import NavCategorias from "./NavCategorias";

const Header = () => {
    return (
        <header className="flex flex-col fixed top-0 w-full bg-neutral-200 gap-3 py-2 z-[998] shadow-lg  px-6">
            <div className="flex justify-between items-center">
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
            </div>
            <NavCategorias />
        </header>
    );
};

export default Header;
