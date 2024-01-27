"use client";
import React, { useState } from "react";
import AdicionarAoCarrinhoButton from "./AdicionarAoCarrinhoButton";

const QuantityAndAddButtons = ({
    product,
}: {
    product: models.ProdutoProps;
}) => {
    const [quantity, setQuantity] = useState<number>(1);

    return (
        <div className="flex pt-3 gap-2">
            <div className="flex bg-hope-primary rounded-full w-24 py-1 px-2">
                <button
                    className="px-1"
                    onClick={() => {
                        if (quantity - 1 > 0) {
                            setQuantity(quantity - 1);
                        }
                    }}
                >
                    -
                </button>
                <input
                    type="number"
                    value={quantity}
                    className="bg-hope-primary w-full text-center m-0 remove-arrow"
                    min={1}
                />
                <button
                    className="px-1"
                    onClick={() => {
                        setQuantity(quantity + 1);
                    }}
                >
                    +
                </button>
            </div>

            <AdicionarAoCarrinhoButton
                productId={product.id}
                quantity={quantity}
            />
        </div>
    );
};

export default QuantityAndAddButtons;
