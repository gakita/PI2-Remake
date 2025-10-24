import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export async function registerCityRepo (
    data: {
        name: string,
        country: string,
        state: string
    }
){
    return p.cities.create({data})
}