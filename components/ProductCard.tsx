import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

const ProductCard = ({
    nome,
    descricao,
    fotos,
    preco,
}: models.ProdutoProps) => {
    return (
        <Card>
            <CardHeader>
                <h3 className="bg-hope-primary text-hope-dark text-center font-semibold py-2 capitalize">
                    {nome}
                </h3>
            </CardHeader>
            <CardContent>
                <Image
                    src={fotos[0].url}
                    alt="foto do produto"
                    width="300"
                    height="100"
                    className="w-full aspect-video object-cover"
                />
            </CardContent>
            <CardFooter>
                <Button>comprar</Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
