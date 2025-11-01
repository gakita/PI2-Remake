import {getUserByEmailService} from "../../getUserByEmail/getUserByEmail.service"
import {comparePassword} from "../../../utils/hash"
import {generateJWT} from "../../../utils/jwt"
import {loginSchema} from "../../../schemas/userSchemas/UserValidation.schema"

export async function loginAuthService(email:string,password:string) {
    try{
        const user = await getUserByEmailService(email)
        console.log(user)
        loginSchema.parse({email,password})
        if (!user){
            throw new Error("User not found")
        }
        const isPasswordValid = await comparePassword(password,user.password)
        if (!isPasswordValid || email !== user.email){
            throw new Error("Invalid email or password")
        }
        const token = generateJWT(user)
        return {token}

    }catch(error:any){
        throw new Error(error.message)
    }
    
}