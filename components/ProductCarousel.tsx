"use client";
import React from "react";
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
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
        >
            <CarouselContent>
                {product.pictures.reverse().map((picture) => (
                    <CarouselItem>
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
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default ProductCarousel;
