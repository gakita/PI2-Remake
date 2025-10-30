import { getCitiesByNameRepo } from "./getCititesByName.repo";

export async function getCitiesByNameService(name: string){
    try {
        if (name.trim() === "") {
            throw new Error("Invalid name")   
        }
        const cities = await getCitiesByNameRepo(name)
        return cities
    } catch (error) {
        console.log(error)
        throw new Error ("Error getting cities")
    }
}

