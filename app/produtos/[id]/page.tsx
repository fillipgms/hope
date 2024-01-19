import ProductCarousel from "@/components/ProductCarousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { getProductById } from "@/data/produto";
import Image from "next/image";

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default async function ProductPage({
    params: { id },
}: ProductPageProps) {
    const product = await getProductById(id);

    if (!product) {
        return (
            <div className="flex h-full items-center justify-center">
                <span>Produto Não encontrado</span>
            </div>
        );
    }

    return (
        <section className="h-full md:flex md:items-center md:justify-center">
            <div
                style={{ backgroundImage: `url(${product.pictures[0].url})` }}
                className="md:block hidden h-full flex-1 bg-cover bg-no-repeat bg-center"
            ></div>
            <div className="md:flex-1 relative md:block flex flex-col md:justify-center md:items-center h-full">
                <div className="md:absolute md:max-w-md w-full bg-neutral-200 md:p-1 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 md:block shadow-lg rounded-md overflow-hidden">
                    <ProductCarousel {...product} />
                </div>
            </div>
        </section>
    );
}
