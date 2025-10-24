import { getAllUsersRepo } from "../repos/getallusers.repo"

export const getAllUsersService = () => {
    const users = getAllUsersRepo()
    return users
}