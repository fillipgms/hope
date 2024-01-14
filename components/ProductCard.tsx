import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

const ProductCard = ({ nome, fotos, preco }: models.ProdutoProps) => {
    return (
        <Card className="md:w-80 overflow-hidden">
            <CardHeader className="text-center px-0 pt-0 pb-6">
                <h3 className="bg-hope-primary py-2 px-3 ">{nome}</h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <img
                    src={fotos[fotos.length - 1].url}
                    alt="foto do produto"
                    className="object-cover w-full aspect-video rounded-md"
                />

                <div className="flex flex-wrap items-center justify-between px-6 py-1">
                    <span>TODO: estrelas</span>
                    <h4 className="text-xl ">{preco}</h4>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-hope-primary text-hope-dark hover:bg-hope-primary/70">
                    Adicionar ao carrinho
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
