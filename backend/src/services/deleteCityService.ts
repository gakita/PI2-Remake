import { deleteCityRepo } from "../repos/deleteCity.repo"

export async function deleteCityService(id: number) {
    return deleteCityRepo(id)
}