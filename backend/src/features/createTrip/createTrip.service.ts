import { createTripRepo } from "./createTrip.repo";

type CreateTripInput = {
    fromCityId: number | string
    toCityId: number | string
    departureDate: Date | string
    returnDate?: Date | string | null
    basePrice?: number | string
    price?: number | string
    availableSeats: number | string
}

const normalizeDate = (value: Date | string) =>
    value instanceof Date ? value : new Date(value)

const normalizeNumber = (value: number | string | undefined) =>
    typeof value === "string" ? Number(value) : value

export const createTripService = (data: CreateTripInput) => {
    const basePrice = normalizeNumber(data.basePrice ?? data.price)

    return createTripRepo({
        fromCityId: Number(data.fromCityId),
        toCityId: Number(data.toCityId),
        departureDate: normalizeDate(data.departureDate),
        returnDate: data.returnDate ? normalizeDate(data.returnDate) : null,
        basePrice: basePrice ?? 0,
        availableSeats: Number(data.availableSeats)
    })
}
