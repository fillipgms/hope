"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { convertSrtingToQueriesObject } from "../ProductsFilter";
import { getAllProducts } from "@/data/produto";
import ProductCard from "../ProductCard";
import { MoonLoader } from "react-spinners";

const SortedProducts = () => {
    const [products, setProducts] = useState<models.ProdutoProps[] | null>(
        null
    );
    const searchParams = useSearchParams();
    const paramsObj = convertSrtingToQueriesObject(searchParams);

    useEffect(() => {
        async function fetchProducts() {
            if (!products) {
                const produtos = await getAllProducts();
                setProducts(produtos);
            }
        }
        fetchProducts();
    }, [products]);

    let filteredProducts = products?.filter((product) => {
        return (
            (!paramsObj.category ||
                paramsObj.category.includes(product.category.categoryName)) &&
            (!paramsObj.collection ||
                paramsObj.collection.includes(
                    product.collection.collectionName
                ))
        );
    });

    if (!products || products.length === 0) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <MoonLoader color="#276FBF" />
            </div>
        );
    }

    if (!Object.keys(paramsObj).length) {
        filteredProducts = products;
    }

    if (!filteredProducts || filteredProducts.length === 0) {
        return <p>Nenhum produto disponível</p>;
    }

    return (
        <div className="flex flex-wrap justify-center gap-5 w-full">
            {filteredProducts.map((produto, index) => (
                <ProductCard {...produto} key={index} />
            ))}
        </div>
    );
};

export default SortedProducts;
