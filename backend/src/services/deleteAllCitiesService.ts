import { deleteAllCitiesRepo } from "../repos/deleteAllCities.repo"

export async function deleteAllCitiesService(){
    return deleteAllCitiesRepo()
}