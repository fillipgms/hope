import Footer from "@/components/Footer";
import Colecoes from "@/components/sections/Colecoes";
import Feedback from "@/components/sections/Feedback";
import HeroSection from "@/components/sections/HeroSection";
import Products from "@/components/sections/Products";
import ProductsLoading from "@/components/sections/ProductsLoading";
import { Suspense } from "react";

export default function Home() {
    return (
        <main className="flex h-full flex-col bg-slate-50">
            <HeroSection />

            <Suspense fallback={<ProductsLoading />}>
                <Products />
            </Suspense>
            <Colecoes />
            <Feedback />
            <Footer />
        </main>
    );
}
