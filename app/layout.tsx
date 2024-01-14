import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hope Shop",
    description: "Generated by create next app",
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
                <html lang="pt-br">
                    <body className={`${inter.className} min-h-dvh relative`}>
                        <Header />
                        <div className="h-dvh pt-[72px] bg-slate-50">
                            {children}
                        </div>
                    </body>
                </html>
            </EdgeStoreProvider>
        </SessionProvider>
    );
}
