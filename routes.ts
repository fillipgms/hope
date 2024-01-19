export const publicRoutes = [
    "/",
    "/auth/verificacao",
    "/produtos",
    "/produtos/[id]",
];

export const authRoutes = [
    "/auth/login",
    "/auth/registrar",
    "/auth/error",
    "/auth/reset",
    "/auth/novasenha",
];

export const adminRoutes = ["/admin, /admin/*"];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
