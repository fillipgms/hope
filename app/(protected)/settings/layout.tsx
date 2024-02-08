import React from "react";

export default function SettingsLayout({
    children,
    orders,
}: {
    children: React.ReactNode;
    orders: React.ReactNode;
}) {
    return (
        <main className="max-w-2xl mx-auto h-full">
            {children}
            {orders}
        </main>
    );
}
