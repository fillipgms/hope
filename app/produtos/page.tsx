import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/data/produto";
import { RingLoader } from "react-spinners";

export default async function ProductsPage() {
    const produtos = await getAllProducts();

    if (!produtos) {
        return (
            <section className="flex h-full items-center justify-center">
                <RingLoader />
            </section>
        );
    }

    return (
        <section>
            {produtos.map((produto) => (
                <ProductCard {...produto} />
            ))}
        </section>
    );
}
