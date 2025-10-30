import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export async function deleteAllCitiesRepo(){
    return p.city.deleteMany()
}
