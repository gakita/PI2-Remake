import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()


export async function getTripByNameRepo ({origin, destiny}: {origin: string, destiny: string}) {
    const prismaWhere: any = {};
    console.log("REPO > origin, destiny", origin, destiny)
    if (origin){
        const cityOrigin = await p.city.findUnique({where: {name: origin}})
        console.log("cityOrigin", cityOrigin)
        if(!cityOrigin) {return []}
        prismaWhere.fromCityId = cityOrigin.id
    }
    if (destiny){
        const cityDestiny = await p.city.findUnique({where: {name: destiny}})
        console.log("cityDestiny", cityDestiny)
        if(!cityDestiny) {return []}
        prismaWhere.toCityId = cityDestiny.id
    }
    console.log("prismaWhere", prismaWhere)
    const trips = await p.trip.findMany({ 
        where: prismaWhere,
        include: {
            fromCity:{
                select: {
                    name: true,
                    country: true
                }
            },
            toCity:{
                select: {
                    name: true,
                    country: true
                }
            }
        }
    })
    console.log("trips repo", trips) 
    return trips
}