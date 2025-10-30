import { z } from "zod";

export const validateCityNameSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres")
})
