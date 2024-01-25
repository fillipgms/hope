"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { convertSrtingToQueriesObject } from "../ProductsFilter";
import { getAllProducts } from "@/data/produto";
import ProductCard from "../ProductCard";
import { MoonLoader } from "react-spinners";

function isAvailable(arr1?: string, arr2?: string[]) {
    if (!arr1 || !arr2) return true;

    return arr2?.includes(arr1);
}

const SortedProducts = () => {
    const [products, setProducts] = useState<models.ProdutoProps[] | null>([]);
    useEffect(() => {
        async function fetchProducts() {
            const produtos = await getAllProducts();
            setProducts(produtos);
        }
        fetchProducts();
    });

    const searchParams = useSearchParams();
    const paramsObj = convertSrtingToQueriesObject(searchParams);

    let filteredProducts = products?.filter((product) => {
        const hasCategories = isAvailable(
            product.category.categoryName,
            paramsObj?.category
        );
        const hasCollection = isAvailable(
            product.collection.collectionName,
            paramsObj.collection
        );
        return hasCategories && hasCollection;
    });

    if (!products || products.length === 0) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <MoonLoader />
            </div>
        );
    }

    if (Object.keys(paramsObj).length === 0) {
        filteredProducts = products || undefined;
    }

    if (filteredProducts?.length === 0) {
        return <p>Nenhum produto disponnível</p>;
    }

    return (
        <div className="flex flex-wrap justify-center gap-5 w-full">
            {filteredProducts?.map((produto, index) => (
                <ProductCard {...produto} key={index} />
            ))}
        </div>
    );
};

export default SortedProducts;
