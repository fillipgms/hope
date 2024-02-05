import Footer from "@/components/Footer";
import Colecoes from "@/components/sections/Colecoes";
import Feedback from "@/components/sections/Feedback";
import Products from "@/components/sections/Products";

import header from "@/public/images/header.webp";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex h-full flex-col bg-slate-50">
            <section className="w-full relative flex items-center justify-center min-h-[70vh]  bg-cover bg-center">
                <Image
                    {...header}
                    loading="eager"
                    alt="header image"
                    className="w-full h-full absolute top-0 left-0 object-cover"
                />
            </section>
            <Products />
            <Colecoes />
            <Feedback />
            <Footer />
        </main>
    );
}
