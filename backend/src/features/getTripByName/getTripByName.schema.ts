import { z } from "zod"

export const getTripByNameSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 1 caractere"),
})
