import { getTripByIDRepo } from "../repos/getTripByID.repo";

export const getTripByIDService = (id: number) => {
    return getTripByIDRepo(id)
}