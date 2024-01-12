import { Resend } from "resend";

const resent = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/novasenha?token=${token}`;

    await resent.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "alteração de senha",
        html: ` <p>
                    Click <a href="${confirmLink}">aqui</a>
                </p>`,
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/verificacao?token=${token}`;

    await resent.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "confirme seu email",
        html: ` <p>
                    Click <a href="${confirmLink}">aqui</a>
                </p>`,
    });
};
