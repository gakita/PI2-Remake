import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

type CreateTripRepoInput = {
    fromCityId: number
    toCityId: number
    departureDate: Date
    returnDate?: Date | null
    basePrice: number
    availableSeats: number
}

export const createTripRepo = (data: CreateTripRepoInput) => {
    return p.trip.create({
        data: {
            fromCityId: data.fromCityId,
            toCityId: data.toCityId,
            departureDate: data.departureDate,
            returnDate: data.returnDate ?? null,
            basePrice: data.basePrice,
            availableSeats: data.availableSeats
        },
        include: {
            fromCity: true,
            toCity: true
        }
    })
}
