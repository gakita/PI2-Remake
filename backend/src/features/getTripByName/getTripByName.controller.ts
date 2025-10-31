import { getTripByNameService } from "./getTripByName.service";
import {Request,Response,NextFunction} from "express"

export async function getTripByNameController(req:Request,res:Response,next:NextFunction){
    try {
        const {name} = req.params
        const trips = await getTripByNameService(name)
        return res.status(200).json(trips)
    } catch (error) {
        next(error)
    }
}