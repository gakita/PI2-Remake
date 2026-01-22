import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export const getAllTripsRepo = async () => {
    return p.trip.findMany(
        {
            include: {
                fromCity: true,
                toCity: true
            }
        }
    )
}
