import { getAllCitiesRepo } from "./getAllCities.repo"

export const getAllCitiesService = async () => {
    const cities = await getAllCitiesRepo()
    return cities
}
