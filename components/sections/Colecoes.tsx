import React from "react";
import spring from "@/public/images/spring.jpg";
import winter from "@/public/images/winter.jpg";
import autumn from "@/public/images/autumn.jpg";
import Link from "next/link";

const Colecoes = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 pt-12 px-4 gap-5 min-h-[70vh]">
            <Link
                href="/produtos?collection=spring's here"
                className="row-span-2 bg-cover bg-center flex items-center justify-center text-3xl text-white font-bold cursor-pointer rounded-md capitalize"
                style={{
                    backgroundImage: `linear-gradient(rgba(228, 168, 77, 0.5), rgba(228, 168, 77, 0.5)),  url(${spring.src})`,
                }}
            >
                Spring's Here
            </Link>
            <Link
                href="/produtos?collection=winter feels"
                className="bg-cover bg-center flex items-center justify-center text-3xl text-white font-bold cursor-pointer rounded-md capitalize"
                style={{
                    backgroundImage: `linear-gradient(rgba(61, 129 ,150 ,0.5), rgba(61, 129 ,150 ,0.5)),  url(${winter.src})`,
                }}
            >
                Winter Feels
            </Link>

            <Link
                href="/produtos?collection=autumn breeze"
                className="bg-cover bg-center flex items-center justify-center text-3xl text-white font-bold cursor-pointer rounded-md capitalize"
                style={{
                    backgroundImage: `linear-gradient(rgba(150, 97, 61, 0.5), rgba(150, 97, 61, 0.5)),  url(${autumn.src})`,
                }}
            >
                Autumn Breeze
            </Link>
        </section>
    );
};

export default Colecoes;
