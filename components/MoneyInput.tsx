"use client";
import { useReducer, useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"; // Shadcn UI import
import { Input } from "./ui/input"; // Shandcn UI Input
import { UseFormReturn } from "react-hook-form";

type TextInputProps = {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    placeholder: string;
    isDisabled: boolean;
    key: number;
};

const moneyFormatter = Intl.NumberFormat("pt-br", {
    currency: "BRL",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function MoneyInput(props: TextInputProps) {
    const initialValue = props.form.getValues()[props.name]
        ? moneyFormatter.format(props.form.getValues()[props.name])
        : "";

    const [value, setValue] = useReducer((_: any, next: string) => {
        const digits = next.replace(/\D/g, "");
        return moneyFormatter.format(Number(digits) / 100);
    }, initialValue);

    function handleChange(realChangeFn: Function, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, "");
        const realValue = Number(digits) / 100;
        const stringValue = JSON.stringify(realValue);

        const formattedString = stringValue.replace(".", ",");
        const parts = formattedString.split(",");
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const finalString =
            parts.length === 2 ? integerPart + "," + parts[1] : integerPart;

        realChangeFn(finalString);
    }

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                field.value = value;
                const _change = field.onChange;

                return (
                    <FormItem>
                        <FormControl>
                            <Input
                                key={props.key}
                                {...field}
                                placeholder="00.00"
                                className=" rounded-l-none"
                                onChange={(ev) => {
                                    setValue(ev.target.value);
                                    handleChange(_change, ev.target.value);
                                }}
                                disabled={props.isDisabled}
                                value={value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
