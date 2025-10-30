import { getUserByIDService } from "../services/getUserByIDService"
import { Request, Response, NextFunction } from "express"

export async function getUserByIDContrtoller(req:Request, res:Response, next:NextFunction){
    try{
        const id = parseInt(req.params.id)
        const user = await getUserByIDService(id)
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}