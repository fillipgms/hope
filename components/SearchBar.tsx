"use client";

import { getAllProducts } from "@/data/produto";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const [products, setProducts] = useState<models.ProdutoProps[] | null>([]);
    const [filteredProducts, setFilterestProducts] = useState<
        models.ProdutoProps[]
    >([]);

    useEffect(() => {
        async function fetchProducts() {
            const result = await getAllProducts();
            setProducts(result);
        }
        fetchProducts();
    }, []);

    if (!products) return;

    const filter = (value: string) => {
        if (value) {
            const results = products.filter((e) => {
                return e.name.toLowerCase().startsWith(value.toLowerCase());
            });
            console.log(value, products, results);
            setFilterestProducts(results);
        } else {
            setFilterestProducts([]);
        }
    };

    return (
        <div className="md:w-[70%] sm:w-[300px] w-full relative hidden md:block">
            <input
                className="border-gray-200 border py-2 px-4 rounded-lg w-full"
                type="text"
                placeholder="pesquise um produto..."
                onChange={(e) => filter(e.target.value)}
            />
            <FiSearch className="absolute right-0 mr-3 text-gray-400 top-1/2 -translate-y-1/2 text-xl" />
            <div className="absolute top-full py-2 px-4 bg-neutral-200 rounded-b-md w-full shadow-2xl">
                {filteredProducts.map((item) => (
                    <Link
                        key={item.id}
                        href={`/produtos/${item.id}`}
                        className="cursor-pointer w-full py-1"
                    >
                        <p>{item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
