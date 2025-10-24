import { registerPlaneService } from "../services/registerPlaneService";
import { Request, Response } from "express";

export async function registerPlaneController(req: Request, res: Response){
    try {
        const { producer, model} = req.body

        const plane = await registerPlaneService({ producer, model})

        return res.status(201).json(plane)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}