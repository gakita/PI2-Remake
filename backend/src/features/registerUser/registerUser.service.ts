import { createUserRepo } from "./registerUser.repo"
import { userSchema } from "./UserValidation.schema"
import {hashPassword } from "../../utils/hash"

export const registerUserService = async ({name,email,password,avatarPath,isAdmin}) =>{
    try{
        console.log("registering user...")
        try{
            const hash = await hashPassword(password)
            const user = ({name, email,password:hash,avatarPath,isAdmin:isAdmin === "true"})
            console.log("user registered successfully")
            return await createUserRepo.createUser(user)
        }catch(error:any){
            throw new Error(error.message)
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}
