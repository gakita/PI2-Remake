import { createTripService } from "../services/createTripService";
import { Request, Response } from "express";

export async function createTripController(req: Request, res: Response){
    try{
        const tripData = req.body
        await createTripService(tripData)
        res.status(201).json({message: "Viagem criada com sucesso"})
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Erro ao criar viagem"})
    }
}
