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

export default function AdicionarProdutoPage() {
    const [isPending, startTransition] = useTransition();

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
            nome: "",
            descricao: "",
            preco: "",
            categoria: "",
            colecao: "",
            fotos: [],
        },
    });

    const onSubmit = (values: z.infer<typeof ProdutoSchema>) => {
        startTransition(() => {
            startTransition(() => {
                criarProduto({ ...values, fotos: urls }).then((data) => {
                    setError(data.error);
                    setSuccess(data.success);

                    if (!data.error) {
                        // Limpar os valores do formulário após o sucesso
                        form.reset();
                        setFileStates([]);
                        setUrls([]);
                    }
                });
            });
        });
    };

    return (
        <div className="h-full flex justify-center items-center">
            <Form {...form}>
                <form
                    className="flex items-center gap-5"
                    onSubmit={form.handleSubmit(onSubmit)}
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
                            name="nome"
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
                            name="descricao"
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
                        <FormField
                            control={form.control}
                            name="preco"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center">
                                            <span className="bg-[hsl(214.3_31.8%_91.4%)] py-[0.35rem] px-1 rounded-l-md">
                                                R$
                                            </span>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="00,00"
                                                className=" rounded-l-none"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoria"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}>
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
                            name="colecao"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a categoria" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="spring's here">
                                                spring's here
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
        </div>
    );
}
