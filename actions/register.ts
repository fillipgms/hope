"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import * as z from "zod";

import { AuthError } from "next-auth";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "campos inválidos!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return { error: "Email em uso!" };

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            emailVerified: new Date(),
        },
    });

    try {
        await signIn("credentials", {
            email,
            hashedPassword,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Credeciais inválidas!" };
                default:
                    return { error: "Algo deu errado!" };
            }
        }

        throw error;
    }

    return { success: "Usuário criado!" };
};
