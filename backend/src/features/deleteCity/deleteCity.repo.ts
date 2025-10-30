import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export async function deleteCityRepo(id: number){
    return p.city.delete({
        where: {
            id: id
        }
    })
}
