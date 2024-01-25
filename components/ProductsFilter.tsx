"use client";

import {
    ReadonlyURLSearchParams,
    useRouter,
    useSearchParams,
} from "next/navigation";
import {} from "next/navigation";
import React, {
    ChangeEvent,
    ComponentPropsWithoutRef,
    ReactNode,
    useEffect,
    useState,
} from "react";

const caetgories = ["paletas", "pele", "lábios"];
const collections = ["spring's here", "winter feels", "autumn breeze"];

const filterOptions = [
    {
        id: "category",
        title: "categorias",
        options: caetgories,
        type: "checkbox",
    },
    {
        id: "collection",
        title: "Coleções",
        options: collections,
        type: "checkbox",
    },
];

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
    let q = "";
    for (let [key, value] of Object.entries(queries)) {
        q = q + `${q === "" ? "" : "&"}${key}=${value}`;
    }
    return q;
}

const ProductsFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedFilterQueries, setSelectedFilterQueries] = useState<
        Record<string, string[]>
    >({});

    useEffect(() => {
        const paramsObj = convertSrtingToQueriesObject(searchParams);
        setSelectedFilterQueries(paramsObj);
    }, [searchParams]);

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

    return (
        <div className="max-w-56 space-y-6 sticky top-24 h-fit">
            {filterOptions.map(({ id, title, type, options }) => (
                <div className="border-b pb-4" key={id}>
                    <p className="font-medium mb-4">{title}</p>
                    <div className="space-y-2">
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
