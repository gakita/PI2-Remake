import { getUserByIDService } from "../services/getUserByIDService"
import { Request, Response} from "express"

export async function getUserByIDContrtoller(req:Request, res:Response){
    try{
        const id = parseInt(req.params.id)
        const user = await getUserByIDService(id)
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}