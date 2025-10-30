import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export const getTripByIDRepo = (id: number) =>{
    const trip = p.trip.findUnique({
        where: {
            id: id
        },
        include: {
            fromCity: true,
            toCity: true,            
        }
    })
    return trip
}
