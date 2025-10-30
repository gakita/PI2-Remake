import { deleteAllUsersRepo } from "../repos/deleteAllUsers.repo";

export const deleteAllUsersController = async () => {
    return await deleteAllUsersRepo()
}
