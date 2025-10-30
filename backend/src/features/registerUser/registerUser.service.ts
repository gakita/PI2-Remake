import { createUserRepo } from "./registerUser.repo"

export const registerUserService = async (body:any) =>{
    return createUserRepo.createUser({
        name: body.name,
        email: body.email,
        password: body.password,
        avatarPath: body.avatarPath,
        isAdmin: body.isAdmin === "true"
    })
}
