import { getUserByEmailRepo } from "./getUserByEmail.repo";

export const getUserByEmailService = async (email:string)=>{
    try{
        const user = await getUserByEmailRepo(email)
        return user
    }catch(error:any){
        throw new Error(error.message)
    }
}