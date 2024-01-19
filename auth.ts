import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "./data/user";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";
import { getCartByUserId } from "./data/carrinho";
import { getCartItemsByCartId } from "./data/itensNoCarrinho";

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

            const existingUser = await getUserById(user.id);

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
                session.user.cart = token.cart as models.CartItemProps[];
            }

            return session;
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            const existingCart = await getCartByUserId(token.sub);

            if (!existingCart) return token;

            const cartItems = await getCartItemsByCartId(existingCart.id);

            if (!cartItems) return token;

            token.cart = cartItems;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
