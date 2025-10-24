import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export const getAllUsersRepo = () => {
    return p.user.findMany()
}