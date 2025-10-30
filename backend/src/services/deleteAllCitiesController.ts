import { deleteAllCitiesRepo } from "../repos/deleteAllCities.repo";

export const deleteAllCitiesService = () => {
    return deleteAllCitiesRepo()
}
