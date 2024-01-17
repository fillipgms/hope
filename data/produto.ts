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

        return products;
    } catch {
        return null;
    }
};
