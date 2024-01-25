"use server";
import { db } from "@/lib/db";

export const getAllCategories = async () => {
    try {
        const categories = await db.category.findMany({});

        return categories;
    } catch {
        return null;
    }
};
