import { registerCityRepo } from "../repos/registercity.repo"

export const registerCityService = (
    data: {
        name: string,
        country: string,
        state: string
    }
) => {
    return registerCityRepo(data)
}