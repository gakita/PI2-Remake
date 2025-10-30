import { PrismaClient } from "@prisma/client";
import { string } from "zod";

const p = new PrismaClient()

export const getCitiesByNameRepo = async (name: string) => {
    try{
        const city = await p.city.findUnique(
            {
                where: {
                    name:name
                }
            }
        )
    }catch(error){
        console.log(error)
        throw new Error("Error getting city")
    }
}