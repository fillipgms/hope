import Footer from "@/components/Footer";
import Colecoes from "@/components/sections/Colecoes";
import Feedback from "@/components/sections/Feedback";
import HeroSection from "@/components/sections/HeroSection";
import Products from "@/components/sections/Products";

export default function Home() {
    return (
        <main className="flex h-full flex-col bg-slate-50">
            <HeroSection />
            <Products />
            <Colecoes />
            <Feedback />
            <Footer />
        </main>
    );
}
