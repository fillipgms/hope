import Link from "next/link";
import React from "react";
import { FaBasketShopping } from "react-icons/fa6";
import LoginWizard from "./LoginWizard";

const Header = () => {
    return (
        <header className="flex flex-col fixed top-0 w-full bg-neutral-200 z-[998] shadow-lg">
            <div className="flex justify-between items-center py-4 px-5">
                <Link className="uppercase text-xl font-bold" href="/">
                    HOPE
                </Link>
                <div>search bar</div>
                <div className="flex gap-5 items-center">
                    <LoginWizard />
                    <Link className=" text-2xl" href="/carrinho">
                        <FaBasketShopping />
                    </Link>
                </div>
            </div>
            <nav className="py-2 px-5">
                <ul className="flex w-full justify-evenly">
                    <li>
                        <a href="#">Pele</a>
                    </li>
                    <li>
                        <a href="#">Lábios</a>
                    </li>
                    <li>
                        <a href="#">Olhos</a>
                    </li>
                    <li>
                        <a href="#">Paletas</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
