import { getAllPlanesService} from "./getAllPlanes.service"
import { Response, Request } from "express"

export const getAllPlanesController = async (req:Request, res:Response) =>{
    try{
        const planes = await getAllPlanesService()
        return res.status(200).json(planes)
    }catch(error:any){
        console.log(error.message)
        return res.status(500).json(error)
    }
}
