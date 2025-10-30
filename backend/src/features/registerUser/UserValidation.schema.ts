import { z } from "zod";

export const userSchema = z.object({
    name: z.string()
    .min(6, "Nome deve ter pelo menos 6 caracteres")
    .max(16, "Nome deve ter no máximo 255 caracteres"),
    email: z.email()
    .min(6, "Email deve ter pelo menos 6 caracteres")
    .max(255, "Email deve ter no máximo 255 caracteres"),
    password: z.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(16, "Senha deve ter no máximo 16 caracteres"),
})