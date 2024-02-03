"use client";
import ProductCarousel from "@/components/ProductCarousel";
import QuantityAndAddButtons from "@/components/QuantityAndAddButtons";
import { getProductById } from "@/data/produto";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default function ProductPage({ params: { id } }: ProductPageProps) {
    const [product, setProduct] = useState<models.ProdutoProps | null>();

    useEffect(() => {
        async function fetchProduct() {
            const fetchedProduct = await getProductById(id);
            setProduct(fetchedProduct);
        }
        fetchProduct();
    }, []);

    if (!product) {
        return (
            <section className="h-full md:flex md:items-center md:justify-center">
                <div
                    role="status"
                    className="hidden h-full flex-1 bg-cover bg-no-repeat bg-center space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                >
                    <div className="flex items-center h-full w-full justify-center  bg-gray-300 rounded dark:bg-gray-700">
                        <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                        >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                </div>
                <div
                    role="status"
                    className=" flex-1 bg-cover bg-no-repeat bg-center  md:flex-1 relative md:block flex flex-col md:justify-center md:items-center h-full"
                >
                    <div className="md:absolute md:w-[28rem] md:h-[28rem] aspect-square w-full md:p-1 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 md:block shadow-lg rounded-md">
                        <div className="flex relative items-center justify-center h-full w-full bg-gray-300 rounded  dark:bg-gray-700">
                            <MoonLoader color="#000" />
                        </div>
                    </div>
                    <div className="h-[2.5rem] animate-pulse w-full dark:bg-gray-300 rounded bg-gray-400 flex items-center justify-center">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    </div>
                    <div
                        role="status"
                        className="space-y-2.5 animate-pulse md:pl-60 md:pr-10 px-10 pt-3"
                    >
                        <div className="flex items-center w-full">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div className="flex items-center w-full ">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div className="flex items-center w-full ">
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div className="flex items-center w-full ">
                            <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div className="flex items-center w-full ">
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        </div>
                        <div className="flex items-center w-full ">
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="h-full md:flex md:items-center md:justify-center">
            <div
                style={{
                    backgroundImage: `url(${product.pictures[0].url})`,
                }}
                className="md:block hidden h-full flex-1 bg-cover bg-no-repeat bg-center"
            ></div>
            <div className="md:flex-1 relative md:block flex flex-col md:justify-center md:items-center h-full">
                <div className="md:absolute md:max-w-md w-full bg-neutral-200 md:p-1 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 md:block shadow-lg rounded-md ">
                    <ProductCarousel {...product} />
                </div>
                <main>
                    <h1 className="bg-hope-primary text-hope-dark text-center font-semibold py-2 capitalize">
                        {product.name}
                    </h1>
                    <div className="md:pl-60 md:pr-10 px-10 pt-3">
                        <p className="text-justify">{product.description}</p>
                        <div className="flex items-center pt-3 gap-5">
                            <h3 className="text-xl font-semibold">
                                R$ {product.price}
                            </h3>
                        </div>
                        <QuantityAndAddButtons product={product} />
                    </div>
                </main>
            </div>
        </section>
    );
}
