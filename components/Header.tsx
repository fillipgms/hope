import Link from "next/link";
import React from "react";
import LoginWizard from "./LoginWizard";

const Header = () => {
    return (
        <header className="flex fixed top-0 w-full bg-neutral-200 z-[998] shadow-lg justify-between items-center py-4 px-5">
            <Link className="uppercase text-xl font-bold" href="/">
                HOPE
            </Link>

            <LoginWizard />
        </header>
    );
};

export default Header;
