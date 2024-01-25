"use client";

import {
    ReadonlyURLSearchParams,
    useRouter,
    useSearchParams,
} from "next/navigation";
import React, {
    ChangeEvent,
    ComponentPropsWithoutRef,
    ReactNode,
    useEffect,
    useState,
} from "react";
import { IoIosArrowDown } from "react-icons/io";

import { getAllCategories } from "@/data/categoria";
import { getAllCollections } from "@/data/collection";

function checkValidQuery(queries: string[]) {
    return queries.filter((query) => query !== "").length > 0;
}

export function convertSrtingToQueriesObject(
    searchParams: ReadonlyURLSearchParams
) {
    let selectedQueries: Record<string, string[]> = {};
    searchParams.forEach((values, key) => {
        const queries = values.split(",");
        if (selectedQueries[key]) {
            selectedQueries[key].push(...queries);
        } else {
            selectedQueries[key] = queries;
        }
    });
    return selectedQueries;
}

function convertValidStringQueries(queries: Record<string, string[]>) {
    return Object.entries(queries)
        .map(([key, value]) => `${key}=${value.join(",")}`)
        .join("&");
}

const ProductsFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedFilterQueries, setSelectedFilterQueries] = useState<
        Record<string, string[]>
    >({});
    const [categories, setCategories] = useState<string[]>([]);
    const [collections, setCollections] = useState<string[]>([]);
    const [expandedOptions, setExpandedOptions] = useState<string[]>([]);

    useEffect(() => {
        const paramsObj = convertSrtingToQueriesObject(searchParams);
        setSelectedFilterQueries(paramsObj);
    }, [searchParams]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getAllCategories();
            if (categoriesData) {
                setCategories(categoriesData.map((cat) => cat.categoryName));
            }
        };

        const fetchCollections = async () => {
            const collectionData = await getAllCollections();
            if (collectionData) {
                setCollections(collectionData.map((col) => col.collectionName));
            }
        };

        fetchCategories();
        fetchCollections();
    }, []);

    const filterOptions = [
        {
            id: "category",
            title: "categorias",
            options: categories || [],
            type: "checkbox",
        },
        {
            id: "collection",
            title: "Coleções",
            options: collections || [],
            type: "checkbox",
        },
    ];

    function handleSelectFilterOptions(e: ChangeEvent<HTMLInputElement>) {
        const name = e.target.name;
        const value = e.target.value;
        const type = e.target.type;

        let selectedQueries = selectedFilterQueries;

        if (selectedQueries[name]) {
            if (type === "radio") {
                selectedQueries[name] = [value];
            } else if (selectedQueries[name].includes(value)) {
                selectedQueries[name] = selectedQueries[name].filter(
                    (query) => query !== value
                );
                if (!checkValidQuery(selectedQueries[name])) {
                    delete selectedQueries[name];
                }
            } else {
                selectedQueries[name].push(value);
            }
        } else if (selectedQueries) {
            selectedQueries[name] = [value];
        }

        router.push(`/produtos?${convertValidStringQueries(selectedQueries)}`, {
            scroll: false,
        });
    }

    function isChecked(id: string, option: string) {
        return (
            Boolean(selectedFilterQueries[id]) &&
            selectedFilterQueries[id].includes(option.toLowerCase())
        );
    }

    const toggleOptions = (id: string) => {
        setExpandedOptions((prev) =>
            prev.includes(id)
                ? prev.filter((option) => option !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="max-w-56 space-y-6 sticky top-24 h-fit">
            {filterOptions.map(({ id, title, type, options }) => (
                <div className="border-b pb-4" key={id}>
                    <div
                        className="flex cursor-pointer justify-between items-center mb-4 w-full"
                        onClick={() => toggleOptions(id)}
                    >
                        <p className="font-medium ">{title}</p>
                        <IoIosArrowDown
                            className={`transition-all duration-300 ${
                                expandedOptions.includes(id) ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                    <div
                        className={`space-y-2 overflow-hidden transition-all duration-300 h-${
                            expandedOptions.includes(id) ? "full" : "0"
                        }`}
                    >
                        {options.map((value) => (
                            <CheckboxAndRadioGroup key={value}>
                                <CheckboxAndRadioItem
                                    type={type}
                                    name={id}
                                    id={value.toLowerCase().trim()}
                                    label={value}
                                    value={value.toLowerCase().trim()}
                                    checked={isChecked(id, value)}
                                    onChange={handleSelectFilterOptions}
                                />
                            </CheckboxAndRadioGroup>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

interface ICheckboxAndRadioGroup {
    children: ReactNode;
}

function CheckboxAndRadioGroup({ children }: ICheckboxAndRadioGroup) {
    return <div className="flex items-center gap-4">{children}</div>;
}

interface CheckboxAndRadioItem extends ComponentPropsWithoutRef<"input"> {
    label: string;
}

function CheckboxAndRadioItem({ id, label, ...props }: CheckboxAndRadioItem) {
    return (
        <>
            <input id={id} className="w-4 h-4 shrink-0" {...props} />
            <label htmlFor={id} className="text-sm">
                {label}
            </label>
        </>
    );
}

export default ProductsFilter;
