import ProductCard from "../ProductCard";
import CardPlaceholder from "../CardPlaceholder";
import { getAllProducts } from "@/data/produto";
import Link from "next/link";

const Products = async () => {
    const allProducts = await getAllProducts();

    return (
        <section className="flex flex-col w-full ">
            <div className="md:flex flex-wrap justify-evenly gap-3 pt-16 px-2 grid grid-cols-2">
                {allProducts && allProducts.length > 0
                    ? allProducts
                          .slice(0, 4)
                          .map((produto, index) => (
                              <ProductCard {...produto} key={index} />
                          ))
                    : Array.from({ length: 4 }).map((_, index) => (
                          <CardPlaceholder key={index} />
                      ))}
            </div>
            <Link
                href="/produtos"
                className=" self-end py-5 px-4 font-semibold"
            >
                Todos os produtos...
            </Link>
        </section>
    );
};

export default Products;
