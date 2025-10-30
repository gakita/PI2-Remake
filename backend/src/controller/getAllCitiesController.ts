import { getAllCitiesService } from "../services/getAllCitiesService"
import { Response, Request, NextFunction } from "express"

export const getAllCitiesController = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const cities = await getAllCitiesService()
        return res.status(200).json(cities)
    }catch(error){
        next(error)
    }
}