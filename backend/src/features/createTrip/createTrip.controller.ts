import { createTripService } from "./createTrip.service";
import { Request, Response, NextFunction } from "express";

export async function createTripController(req: Request, res: Response, next: NextFunction){
    try{
        const tripData = req.body
        const createdTrip = await createTripService(tripData)
        res.status(201).json(createdTrip)
    }catch(error){
        next(error)
    }
}
