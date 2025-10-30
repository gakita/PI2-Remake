import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export async function deleteAllUsersRepo(){
    return p.user.deleteMany()
}
