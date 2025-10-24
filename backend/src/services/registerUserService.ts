import { userRepo} from "../repos/user.repo"

export const registerUserService = async (
    data: {
        name: string,       
        email:string,
        password:string
    }
) =>{
    return userRepo.createUser(data)
}