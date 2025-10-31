import { createUserRepo } from "./registerUser.repo"
import { registerUserSchema } from "../../schemas/userSchemas/UserValidation.schema"
import {hashPassword } from "../../utils/hash"

export const registerUserService = async ({name,email,password,avatarPath,isAdmin}:any) =>{
    try{
        console.log("registering user...")
        try{
            const hash = await hashPassword(password)
            const user = ({name, email,password:hash,avatarPath,isAdmin:isAdmin === "true"})
            registerUserSchema.parse({name,email,password,avatarPath,isAdmin})
            return await createUserRepo.createUser(user)
        }catch(error:any){
            throw new Error(error.message)
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}
