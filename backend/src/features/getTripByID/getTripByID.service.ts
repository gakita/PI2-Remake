import { getTripByIDRepo } from "./getTripByID.repo";

export const getTripByIDService = (id: number) => {
    return getTripByIDRepo(id)
}
