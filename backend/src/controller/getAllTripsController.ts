import { getAllTripsRepo } from "../repos/getAllTrips.repo";
import { Request, Response } from "express";

export const getAllTripsController = async (req: Request, res: Response) => {
    try {
        const trips = await getAllTripsRepo()
        res.status(200).json(trips)
    } catch (error:any) {
        console.log(error.message)
        res.status(500).json({error: "Erro ao buscar viagens"})
    }
}
