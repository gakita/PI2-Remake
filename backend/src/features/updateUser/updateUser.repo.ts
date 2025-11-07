import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export const updateUserRepo = async function updateUserRepo(id:number,data:any){

    try{
        return await p.user.update({
            where:{
                id:Number(id)
            },
            data:data
        })
    }catch(error:any){
        throw new Error(error.message)
    }
}
