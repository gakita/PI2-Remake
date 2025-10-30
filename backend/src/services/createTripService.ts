import { createTripRepo } from "../repos/createTrip.repo";

export const createTripService = (data: {fromCityId: number, toCityId: number, departureDate: Date, returnDate: Date, price: number, availableSeats: number}) => {
    return createTripRepo(data)
}