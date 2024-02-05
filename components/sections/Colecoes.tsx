import React from "react";
import Link from "next/link";
import Image from "next/image";

import spring from "@/public/images/spring.webp";
import winter from "@/public/images/winter.webp";
import autumn from "@/public/images/autumn.webp";

const Colecoes = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 pt-12 px-4 gap-5 min-h-[70vh]">
            <Link
                href="/produtos?collection=spring's here"
                className="row-span-2 overflow-hidden relative flex items-center justify-center text-3xl text-white font-bold cursor-pointer rounded-md capitalize"
            >
                <Image
                    {...spring}
                    alt="Springs Here Collection"
                    className="absolute z-[-1] h-full object-cover"
                />
                Spring&apos;s Here
            </Link>
            <Link
                href="/produtos?collection=winter feels"
                className="flex overflow-hidden items-center relative justify-center text-3xl text-white font-bold cursor-pointer rounded-md capitalize"
            >
                <Image
                    {...winter}
                    alt="Springs Here Collection"
                    className="absolute z-[-1] h-full object-cover"
                />
                Winter Feels
            </Link>

            <Link
                href="/produtos?collection=autumn breeze"
                className="flex overflow-hidden items-center relative justify-center text-3xl text-white font-bold cursor-pointer rounded-md capitalize"
            >
                <Image
                    {...autumn}
                    alt="Springs Here Collection"
                    className="absolute z-[-1] h-full w-full object-cover"
                />
                Autumn Breeze
            </Link>
        </section>
    );
};

export default Colecoes;
