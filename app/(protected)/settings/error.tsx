"use client";
export default function errorPage({
    error,
}: {
    error: Error & { digest?: string };
}) {
    return (
        <div className="h-full flex items-center justify-center">
            <h1>{error.message}</h1>
        </div>
    );
}
