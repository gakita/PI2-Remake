import { createTripService } from "../services/createTripService";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../middleware/errorHandler";

export async function createTripController(req: Request, res: Response, next: NextFunction){
    try{
        const tripData = req.body
        await createTripService(tripData)
        res.status(201).json({message: "Viagem criada com sucesso"})
    }catch(error){
        next(error)
    }
}
