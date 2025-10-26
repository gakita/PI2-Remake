import { getAllCitiesRepo } from "../repos/getAllCities.repo"

export const getAllCitiesService = async () => {
    const cities = await getAllCitiesRepo()
    return cities
}