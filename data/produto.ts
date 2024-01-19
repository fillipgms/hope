import { db } from "@/lib/db";

export const getProductById = async (productId: string) => {
    try {
        const product = await db.product.findUnique({
            where: { id: productId },
            include: { pictures: true },
        });

        return product;
    } catch {
        return null;
    }
};

export const getProductByName = async (productName: string) => {
    try {
        const product = await db.product.findFirst({
            where: { name: productName },
            include: { pictures: true },
        });

        return product;
    } catch {
        return null;
    }
};

export const getAllProducts = async () => {
    try {
        const products = await db.product.findMany({
            include: { pictures: true },
        });

        return products;
    } catch {
        return null;
    }
};
