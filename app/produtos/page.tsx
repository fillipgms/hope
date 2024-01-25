import ProductsFilter from "@/components/ProductsFilter";
import SortedProducts from "@/components/sections/SortedProducts";

export default function ProductsPage() {
    return (
        <main className="max-w-6xl mx-auto mt-10 px-4">
            <div className="py-8 space-y-4">
                <h1 className="text-3xl font-semibold">Nossos Produtos</h1>
                <p className="max-w-3xl text-slate-700">
                    Explore nossa variedade de cosméticos, desde produtos para
                    cuidados com a pele até maquiagens deslumbrantes. Estamos
                    aqui para ser seu parceiro de confiança em sua jornada de
                    autodescoberta e empoderamento.
                </p>
            </div>
            <div className="flex py-8 gap-10">
                <ProductsFilter />
                <SortedProducts />
            </div>
        </main>
    );
}
