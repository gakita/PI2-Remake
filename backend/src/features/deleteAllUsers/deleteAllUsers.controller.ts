import { deleteAllUsersRepo } from "./deleteAllUsers.repo";

export const deleteAllUsersController = async () => {
    return await deleteAllUsersRepo()
}
