import React from "react";
import CardPlaceholder from "../CardPlaceholder";

const ProductsLoading = () => {
    const array = Array.from({ length: 4 });

    return (
        <section className="flex flex-col w-full ">
            <div className="md:flex flex-wrap justify-evenly gap-3 pt-16 px-2 grid grid-cols-2">
                {array.map((_, index) => (
                    <CardPlaceholder key={index} />
                ))}
            </div>
        </section>
    );
};

export default ProductsLoading;
