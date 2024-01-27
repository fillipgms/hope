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
    const reversedPictures = [...product.pictures].reverse();

    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
        >
            <CarouselContent>
                {reversedPictures.map((picture, key) => (
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
            <CarouselPrevious className="md:inline-flex hidden" />
            <CarouselNext className="md:inline-flex hidden" />
        </Carousel>
    );
};

export default ProductCarousel;
