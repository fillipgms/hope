"use client";
import React from "react";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import AuthHeader from "./AuthHeader";
import Social from "./Social";
import BackButton from "./BackButton";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    BackButtonHref: string;
    ShowSocial?: boolean;
}

const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    BackButtonHref,
    ShowSocial,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <AuthHeader label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {ShowSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter className="justify-center">
                <BackButton label={backButtonLabel} href={BackButtonHref} />
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;
