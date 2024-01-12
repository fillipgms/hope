import React from "react";

interface AuthHeaderProps {
    label: string;
}

const AuthHeader = ({ label }: AuthHeaderProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold text-center">{label}</h1>
        </div>
    );
};

export default AuthHeader;
