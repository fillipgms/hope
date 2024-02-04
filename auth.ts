import NextAuth, { Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "./data/user";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },

    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id || "");

            if (!existingUser?.emailVerified) return false;

            //TODO: adicionas 2FA

            return true;
        },

        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (token.cart) {
                session.user.cart = token.cart as models.CartProps;
            }

            return session;
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;
            token.cart = existingUser.cart;

            if (!existingUser.cart) return token;

            token.cart = existingUser.cart;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
