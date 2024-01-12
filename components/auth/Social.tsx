"use client";
import React from "react";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
    const onClick = () => {
        signIn("google", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => onClick()}
            >
                <FcGoogle className="h-5 w-full" />
            </Button>
        </div>
    );
};

export default Social;
