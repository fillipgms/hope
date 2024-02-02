import AdicionarAoCarrinhoButton from "@/components/AdicionarAoCarrinhoButton";
import ProductCarousel from "@/components/ProductCarousel";
import QuantityAndAddButtons from "@/components/QuantityAndAddButtons";
import { getProductById } from "@/data/produto";

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
                style={{
                    backgroundImage: `url(${product.pictures[0].url})`,
                }}
                className="md:block hidden h-full flex-1 bg-cover bg-no-repeat bg-center"
            ></div>
            <div className="md:flex-1 relative md:block flex flex-col md:justify-center md:items-center h-full">
                <div className="md:absolute md:max-w-md w-full bg-neutral-200 md:p-1 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 md:block shadow-lg rounded-md ">
                    <ProductCarousel {...product} />
                </div>
                <main>
                    <h1 className="bg-hope-primary text-hope-dark text-center font-semibold py-2 capitalize">
                        {product.name}
                    </h1>
                    <div className="md:pl-60 md:pr-10 px-10 pt-3">
                        <p className="text-justify">{product.description}</p>
                        <div className="flex items-center pt-3 gap-5">
                            <h3 className="text-xl font-semibold">
                                R$ {product.price}
                            </h3>
                        </div>
                        <QuantityAndAddButtons product={product} />
                    </div>
                </main>
            </div>
        </section>
    );
}
