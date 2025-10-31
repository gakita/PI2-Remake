import { getTripByNameService } from "./getTripByName.service";
import {Request,Response,NextFunction} from "express"

export async function getTripByNameController(req:Request,res:Response,next:NextFunction){
    try {
        const {origin, destiny} = req.query;
        console.log("Controller recebe: ",origin,destiny)
        const trips = await getTripByNameService({origin: origin as string, destiny: destiny as string})
        console.log('Trips do service/repo',trips)
        return res.status(200).json(trips)
    } catch (error) {
        console.log(error)
        next(error)
    }
}