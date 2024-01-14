"use client";
import { fetchProducts } from "@/actions/fetchProducts";
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import CardPlaceholder from "../CardPlaceholder";

const Products = () => {
    const [allProducts, setAllProducts] = useState<
        models.ProdutoProps[] | null
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts();
                setAllProducts(data.props.allProducts);
                console.log(data.props.allProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
                setAllProducts(null);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="md:flex flex-wrap justify-evenly gap-5 py-5 px-2 grid grid-cols-2">
            {allProducts && allProducts.length > 0
                ? allProducts
                      .slice(0, 4)
                      .map((produto, index) => (
                          <ProductCard {...produto} key={index} />
                      ))
                : Array.from({ length: 4 }).map((_, index) => (
                      <CardPlaceholder key={index} />
                  ))}
        </section>
    );
};

export default Products;
