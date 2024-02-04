"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "campos inválidos!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
        return { error: "Esse usuário não existe" };
    }

    if (!existingUser.password) {
        return { error: "Esse usuário utiliza outro provedor" };
    }

    // if (!existingUser.emailVerified) {
    //     const verificationToken = await generateVerificationToken(
    //         existingUser.email
    //     );

    //     await sendVerificationEmail(
    //         verificationToken.email,
    //         verificationToken.token
    //     );

    //     return { success: "Verifique o seu email para confirmação!" };
    // }

    try {
        await signIn("credentials", {
            email,
            password,
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
};
