"use client";
import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const ProductCarousel = (product: models.ProdutoProps) => {
    const pictures = product.pictures;

    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
        >
            <CarouselContent>
                {pictures.map((picture, key) => (
                    <CarouselItem key={key}>
                        <Image
                            src={picture.url}
                            alt="foto do produto"
                            width={500}
                            height={500}
                            loading="lazy"
                            className="object-cover w-full aspect-square rounded-md"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {pictures.length >= 2 && (
                <CarouselPrevious className="md:inline-flex hidden" />
            )}
            {pictures.length >= 2 && (
                <CarouselNext className="md:inline-flex hidden" />
            )}
        </Carousel>
    );
};

export default ProductCarousel;
