"use client";

import { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import {
    MultiFileDropzone,
    type FileState,
} from "@/components/MultiFileDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { ProdutoSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { criarProduto } from "@/actions/criarproduto";
import FormError from "@/components/FormError";
import FormSucces from "@/components/FormSuccess";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import MoneyInput from "./MoneyInput";

const CreateProdutoForm = () => {
    const [isPending, startTransition] = useTransition();
    const [key, setKey] = useState<number>(+new Date());
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [urls, setUrls] = useState<string[]>([]);
    const { edgestore } = useEdgeStore();

    function updateFileProgress(key: string, progress: FileState["progress"]) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    const form = useForm<z.infer<typeof ProdutoSchema>>({
        resolver: zodResolver(ProdutoSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            category: "",
            collection: "",
            pictures: [],
        },
    });

    const onSubmit = (values: z.infer<typeof ProdutoSchema>) => {
        startTransition(() => {
            startTransition(() => {
                criarProduto({ ...values, pictures: urls }).then((data) => {
                    setError(data.error);
                    setSuccess(data.success);

                    if (!data.error) {
                        form.reset();
                        setKey(+new Date());
                        setFileStates([]);
                        setUrls([]);
                    }
                });
            });
        });
    };

    return (
        <Form {...form}>
            <form
                className="flex items-center gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
                method="GET"
            >
                <MultiFileDropzone
                    value={fileStates}
                    onChange={(files) => {
                        setFileStates(files);
                    }}
                    onFilesAdded={async (addedFiles) => {
                        setFileStates([...fileStates, ...addedFiles]);
                        await Promise.all(
                            addedFiles.map(async (addedFileState) => {
                                try {
                                    const res =
                                        await edgestore.publicFiles.upload({
                                            file: addedFileState.file,
                                            options: {
                                                temporary: true,
                                            },
                                            onProgressChange: async (
                                                progress
                                            ) => {
                                                updateFileProgress(
                                                    addedFileState.key,
                                                    progress
                                                );
                                                if (progress === 100) {
                                                    await new Promise(
                                                        (resolve) =>
                                                            setTimeout(
                                                                resolve,
                                                                1000
                                                            )
                                                    );
                                                    updateFileProgress(
                                                        addedFileState.key,
                                                        "COMPLETE"
                                                    );
                                                }
                                            },
                                        });

                                    setUrls((prevUrls) => [
                                        ...prevUrls,
                                        res.url,
                                    ]);
                                } catch (err) {
                                    updateFileProgress(
                                        addedFileState.key,
                                        "ERROR"
                                    );
                                }
                            })
                        );
                    }}
                />

                <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Nome do produto"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="descrição do produto"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <MoneyInput
                        form={form}
                        label="Preço"
                        name="price"
                        placeholder="insira o preço do produto"
                        isDisabled={isPending}
                        key={key}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    key={key}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a categoria" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="paletas">
                                            paletas
                                        </SelectItem>
                                        <SelectItem value="pele">
                                            pele
                                        </SelectItem>
                                        <SelectItem value="lábios">
                                            lábios
                                        </SelectItem>
                                        <SelectItem value="olhos">
                                            olhos
                                        </SelectItem>
                                    </SelectContent>
                                    <FormMessage />
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="collection"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    key={key}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a categoria" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="spring's here">
                                            spring&apos;s here
                                        </SelectItem>
                                        <SelectItem value="winter feels">
                                            winter feels
                                        </SelectItem>
                                        <SelectItem value="autumn breeze">
                                            autumn breeze
                                        </SelectItem>
                                        <SelectItem value="summer hills">
                                            summer hills
                                        </SelectItem>
                                    </SelectContent>
                                    <FormMessage />
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormSucces message={success} />
                    <FormError message={error} />

                    <Button
                        type="submit"
                        className="w-full"
                        onClick={async () => {
                            for (const url of urls) {
                                await edgestore.publicFiles.confirmUpload({
                                    url,
                                });
                            }
                        }}
                    >
                        Criar produto
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateProdutoForm;
