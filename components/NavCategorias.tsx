import { getAllCategories } from "@/data/categoria";
import React from "react";

const NavCategorias = async () => {
    const categorias = await getAllCategories();

    return (
        <nav>
            <ul className="flex items-center justify-evenly">
                {categorias?.map((categoria, index) => (
                    <li key={index}>{categoria.nomeCategoria}</li>
                ))}
            </ul>
        </nav>
    );
};

export default NavCategorias;
