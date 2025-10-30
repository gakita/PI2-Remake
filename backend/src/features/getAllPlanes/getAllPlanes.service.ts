import { getAllPlanesRepo } from "./getAllPlanes.repo"

export const getAllPlanesService = async () =>{
    try{
        const  planes = await getAllPlanesRepo()
        return planes
    }catch(error){
        console.log(error)
        throw new Error("Error getting planes")
    }
}
