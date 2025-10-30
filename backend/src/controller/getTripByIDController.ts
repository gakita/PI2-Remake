import { Request, Response } from "express";
import { getTripByIDService } from "../services/getTripByIDService";

export async function getTripByIDController(req:Request,res:Response){
    try{
        const trip = await getTripByIDService(parseInt(req.params.id))
        res.status(200).json(trip)
    }catch(error:any){
        res.status(400).json({error:error.message,code:400})
    }
}