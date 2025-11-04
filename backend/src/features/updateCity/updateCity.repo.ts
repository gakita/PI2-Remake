import { PrismaClient } from "@prisma/client";


const p = new PrismaClient()



export async function updateCityRepo(id:string,data:any){
    try{
        return await p.city.update({
        where:{
            id:Number(id)
        },
        data:data
    })
    }catch(error:any){
        throw new Error(error.message)
    }
}