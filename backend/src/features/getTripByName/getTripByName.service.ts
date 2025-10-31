import { getTripByNameRepo } from "./getTripByName.repo";

export const getTripByNameService = async (name:string) => {
    return getTripByNameRepo(name)
}