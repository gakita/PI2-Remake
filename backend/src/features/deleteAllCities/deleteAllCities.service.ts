import { deleteAllCitiesRepo } from "./deleteAllCities.repo"

export async function deleteAllCitiesService(){
    return deleteAllCitiesRepo()
}
