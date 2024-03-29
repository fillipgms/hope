import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { EdgeStoreProvider } from "@/lib/edgestore";
import StoreProvider from "@/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hope Shop",
    description: "Sua nova loja de cosméticos favorita!",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <EdgeStoreProvider>
                <StoreProvider>
                    <html lang="pt-br">
                        <body
                            className={`${inter.className} min-h-dvh relative bg-slate-50`}
                        >
                            <Header />
                            <div className="h-dvh pt-[85px] ">{children}</div>
                        </body>
                    </html>
                </StoreProvider>
            </EdgeStoreProvider>
        </SessionProvider>
    );
}
