import React from "react";

import AuthHeader from "./AuthHeader";
import BackButton from "./BackButton";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";

const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <AuthHeader label="Algo deu errado!" />
            </CardHeader>
            <CardFooter className="justify-center">
                <BackButton label="Voltar ao login" href="/auth/login" />
            </CardFooter>
        </Card>
    );
};

export default ErrorCard;
