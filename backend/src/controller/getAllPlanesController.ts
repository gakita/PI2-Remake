import { getAllPlanesService} from "../services/getAllPlanesService"
import { Response } from "express"

export async function getAllPlanesController(res:Response){
    try{
        const  planes = await getAllPlanesService()
        return res.status(200).json(planes)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}