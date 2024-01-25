import { getAllCategories } from "@/data/categoria";
import Link from "next/link";
import React from "react";

const NavCategorias = async () => {
    const categories = await getAllCategories();

    return (
        <nav>
            <ul className="flex items-center justify-evenly">
                {categories?.map((categoria, index) => (
                    <li key={index}>
                        <Link
                            href={`/produtos?category=${categoria.categoryName}`}
                        >
                            {categoria.categoryName}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavCategorias;
