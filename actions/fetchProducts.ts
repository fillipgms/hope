"use server";
import { getAllProducts } from "@/data/produto";

export const fetchProducts = async () => {
    const allProducts = await getAllProducts();

    return {
        props: {
            allProducts,
        },
    };
};
