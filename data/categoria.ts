import { db } from "@/lib/db";

export const getAllCategories = async () => {
    try {
        const categorias = await db.categoria.findMany({});

        return categorias;
    } catch {
        return null;
    }
};
