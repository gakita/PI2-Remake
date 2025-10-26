import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export const getAllCitiesRepo = async () => {
    const cities = await p.cities.findMany()
    return cities
}