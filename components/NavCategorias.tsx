import { getAllCategories } from "@/data/categoria";
import React from "react";

const NavCategorias = async () => {
    const categories = await getAllCategories();

    return (
        <nav>
            <ul className="flex items-center justify-evenly">
                {categories?.map((categoria, index) => (
                    <li key={index}>{categoria.categoryName}</li>
                ))}
            </ul>
        </nav>
    );
};

export default NavCategorias;
