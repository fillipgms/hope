import Colecoes from "@/components/sections/Colecoes";
import Products from "@/components/sections/Products";

export default function Home() {
    return (
        <main className="flex h-full flex-col bg-slate-50">
            <section className="w-full  min-h-[70vh] relative bg-[url('../public/images/header.jpg')] bg-cover bg-center"></section>
            <Products />
            <Colecoes />
        </main>
    );
}
