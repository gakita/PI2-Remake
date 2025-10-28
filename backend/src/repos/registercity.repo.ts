import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export async function registerCityRepo (
    data: {
        name: string,
        country: string,
        imagePath: string
    }
){
    return p.city.create({data})
}