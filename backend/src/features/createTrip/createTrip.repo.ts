import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

export const createTripRepo = (data:{fromCityId: number, toCityId: number, departureDate: Date, returnDate: Date, price: number, availableSeats: number}) => {
    return p.trip.create({
        data: {
            fromCityId: data.fromCityId,
            toCityId: data.toCityId,
            departureDate: data.departureDate,
            returnDate: data.returnDate,
            basePrice: data.price,
            availableSeats: data.availableSeats
        }
    })
}
