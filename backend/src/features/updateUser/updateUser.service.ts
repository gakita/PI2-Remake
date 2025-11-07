import { updateUserRepo } from "./updateUser.repo";

export const updateUserService = async function updateUserService(id:number,data:any){
    try{
        return await updateUserRepo(id,data)
    }catch(error:any){
        throw new Error(error.message)
    }
}
