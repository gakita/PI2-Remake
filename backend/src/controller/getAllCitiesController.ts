import { getAllCitiesService } from "../services/getAllCitiesService"
import { Response, Request } from "express"

export const getAllCitiesController = async (req:Request, res:Response) => {
    const cities = await getAllCitiesService()
    return res.status(200).json(cities)
}

