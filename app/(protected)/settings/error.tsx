"use client";
export default function errorPage({
    error,
}: {
    error: Error & { digest?: string };
}) {
    console.log(error);

    return (
        <div className="h-full flex items-center justify-center">
            <h1>{error.message}</h1>
        </div>
    );
}
