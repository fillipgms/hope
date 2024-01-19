import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import AdicionarAoCarrinhoButton from "./AdicionarAoCarrinhoButton";
import Link from "next/link";

const ProductCard = ({ id, name, pictures, price }: models.ProdutoProps) => {
    return (
        <Link href={`/produtos/${id}`}>
            <Card className="md:w-72 overflow-hidden">
                <CardHeader className="text-center px-0 pt-0 pb-6">
                    <h3 className="bg-hope-primary py-2 px-3 ">{name}</h3>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Image
                        src={pictures[0].url}
                        alt="foto do produto"
                        width={160}
                        height={90}
                        className="object-cover w-full aspect-video rounded-md"
                    />

                    <div className="flex flex-wrap items-center justify-between px-6 py-1">
                        <span>TODO: estrelas</span>
                        <h4 className="text-xl ">{price}</h4>
                    </div>
                </CardContent>
                <CardFooter>
                    <AdicionarAoCarrinhoButton productId={id} />
                </CardFooter>
            </Card>
        </Link>
    );
};

export default ProductCard;
