import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtentedUser = DefaultSession["user"] & {
    role: UserRole;
    cart: models.CartProps;
};

declare module "next-auth" {
    interface Session {
        user: ExtentedUser;
    }
}
