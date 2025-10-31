import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export const getUserByEmailRepo = async(email:string)=> {
    try{
        const user = await p.user.findUnique({
            where:{
                email:email
            }
        })
        return user
    }catch(error:any){
        throw new Error(error.message)
    }
}