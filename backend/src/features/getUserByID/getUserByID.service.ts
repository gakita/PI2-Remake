import { getUserByIDRepo } from "./getUserByID.repo";

export const getUserByIDService = (id:number) => {
    const user = getUserByIDRepo(id)
    return user
}
