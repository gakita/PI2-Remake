import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export const getUserByIDRepo = (id: number) =>{
    return p.user.findUnique({
        where: {
            id:id
        }
    })
}