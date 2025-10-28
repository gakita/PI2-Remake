import { registerCityRepo } from "../repos/registercity.repo"

export const registerCityService = (
    data: {
        name: string,
        country: string,
        imagePath: string
    }
) => {
    return registerCityRepo(data)
}