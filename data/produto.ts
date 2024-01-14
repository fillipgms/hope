import { db } from "@/lib/db";

export const getProductById = async (productId: string) => {
    try {
        const product = await db.produto.findUnique({
            where: { id: productId },
            include: { fotos: true },
        });

        return product;
    } catch {
        return null;
    }
};

export const getProductByName = async (productName: string) => {
    try {
        const product = await db.produto.findFirst({
            where: { nome: productName },
            include: { fotos: true },
        });

        return product;
    } catch {
        return null;
    }
};

export const getAllProducts = async () => {
    try {
        const products = await db.produto.findMany({
            include: { fotos: true },
        });

        console.log("Products:", products);

        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
};
