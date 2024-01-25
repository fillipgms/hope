"use client";

import CardWrapper from "./CardWrapper";

import { useCallback, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import FormError from "../FormError";
import FormSucces from "../FormSuccess";

import { newVerification } from "@/actions/verification";

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Token não encontrado");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Algo deu errado");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirmando seu email"
            BackButtonHref="/auth/login"
            backButtonLabel="voltar ao login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && <MoonLoader color="#276FBF" />}

                <FormSucces message={success} />
                {!success && <FormError message={error} />}
            </div>
        </CardWrapper>
    );
};

export default NewVerificationForm;
