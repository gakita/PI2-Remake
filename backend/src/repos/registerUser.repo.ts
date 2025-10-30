import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export const createUserRepo = {
    async createUser(
        data:{
            name:string,
            email:string,
            password:string,
            avatarPath: string,
            isAdmin: boolean
        }
    ){
        return p.user.create({data})
    }
}