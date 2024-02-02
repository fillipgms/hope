"use server";
import { db } from "@/lib/db";

export const getProductById = async (productId: string) => {
    try {
        const product = await db.product.findUnique({
            where: { id: productId },
            include: { pictures: true, category: true, collection: true },
        });

        if (product) {
            const { price, ...restOfProduct } = product;
            const convertedPrice = Number(price);

            return {
                ...restOfProduct,
                price: convertedPrice,
            };
        }

        return null;
    } catch {
        return null;
    }
};

export const getProductByName = async (productName: string) => {
    try {
        const product = await db.product.findFirst({
            where: { name: productName },
            include: { pictures: true, category: true, collection: true },
        });

        return product;
    } catch {
        return null;
    }
};

export const getProductsByCategory = async (productsCategory: string) => {
    try {
        const products = await db.product.findMany({
            where: {
                category: {
                    categoryName: productsCategory,
                },
            },
            include: { pictures: true, category: true, collection: true },
        });

        return products;
    } catch {
        return null;
    }
};

export const getProductsByCollection = async (productCollection: string) => {
    try {
        const products = await db.product.findMany({
            where: {
                collection: {
                    collectionName: productCollection,
                },
            },
            include: { pictures: true, category: true, collection: true },
        });

        return products;
    } catch {
        return null;
    }
};

export const getAllProducts = async () => {
    try {
        const products = await db.product.findMany({
            include: { pictures: true, category: true, collection: true },
        });

        return products;
    } catch {
        return null;
    }
};
