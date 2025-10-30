import { deleteCityRepo } from "./deleteCity.repo"

export async function deleteCityService(id: number) {
    return deleteCityRepo(id)
}
