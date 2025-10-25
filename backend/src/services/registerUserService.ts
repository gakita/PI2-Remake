import { userRepo} from "../repos/registerUser.repo"

export const registerUserService = async (
    data: {
        name: string,       
        email:string,
        password:string
    }
) =>{
    return userRepo.createUser(data)
}