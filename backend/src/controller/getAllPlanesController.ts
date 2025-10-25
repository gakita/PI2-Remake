import { getAllPlanesService} from "../services/getAllPlanesService"
import { Response, Request } from "express"

export const getAllPlanesController = async (req:Request, res:Response) =>{
    try{
        const planes = await getAllPlanesService()
        return res.status(200).json(planes)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}