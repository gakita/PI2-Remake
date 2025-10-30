import { getAllUsersRepo } from "./getAllUsers.repo"

export const getAllUsersService = () => {
    const users = getAllUsersRepo()
    return users
}
