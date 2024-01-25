"use server";

import { db } from "@/lib/db";

export const getAllCollections = async () => {
    try {
        const collections = await db.collection.findMany({});

        return collections;
    } catch {
        return null;
    }
};
