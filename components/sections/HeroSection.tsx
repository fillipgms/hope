import React from "react";

import header from "@/public/images/header.webp";
import Image from "next/image";

const HeroSection = () => {
    return (
        <section className="w-full relative flex items-center justify-center min-h-[70vh]  bg-cover bg-center">
            <Image
                {...header}
                loading="eager"
                priority
                alt="header image"
                className="w-full h-full absolute top-0 left-0 object-cover"
            />
        </section>
    );
};

export default HeroSection;
