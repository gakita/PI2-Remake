import { deleteAllUsersRepo } from "./deleteAllUsers.repo";

export const deleteAllUsersService = async () => {
    try{
        console.log("deleting all users...")
        return await deleteAllUsersRepo()
    }catch(error:any){
        throw new Error(error.message)
    }
}