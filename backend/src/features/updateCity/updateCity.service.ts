import { updateCityRepo } from "./updateCity.repo";

export async function updateCityService(id:string,data: any){
    return await updateCityRepo(id,data)
}