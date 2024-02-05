import Footer from "@/components/Footer";
import Colecoes from "@/components/sections/Colecoes";
import Feedback from "@/components/sections/Feedback";
import Products from "@/components/sections/Products";

export default function Home() {
    return (
        <main className="flex h-full flex-col bg-slate-50">
            <section className="w-full flex items-center justify-center  min-h-[70vh] relative bg-[url('../public/images/header.jpg')] bg-cover bg-center"></section>
            <Products />
            <Colecoes />
            <Feedback />
            <Footer />
        </main>
    );
}
