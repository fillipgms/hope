"use client";
import { fetchProducts } from "@/actions/fetchProducts";
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";

const Products = () => {
    const [allProducts, setAllProducts] = useState<
        models.ProdutoProps[] | null
    >([]);

    useEffect(() => {
        fetchProducts()
            .then((data) => {
                setAllProducts(data.props.allProducts);
                console.log(data.props.allProducts);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setAllProducts(null);
            });
    }, []);

    return (
        <section className="flex">
            {allProducts?.map((produto) => (
                <ProductCard {...produto} />
            ))}
        </section>
    );
};

export default Products;
