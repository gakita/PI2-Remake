import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()


export const getTripByNameRepo = async (name:string) => {
    const city = await p.city.findUnique( { where: { name}})
    if (!city) return null
    return p.trip.findMany({
        where: { fromCityId: city.id} ,
        include: {
            fromCity: {
                select: {
                    name: true
                }
            }
        }   
    })
}