import { updateCityService } from "./updateCity.service";
import { Request, Response, NextFunction } from "express";

export async function updateCityController(req:Request,res:Response,next:NextFunction){
    try{
        const cityId = req.params.id
        const data = req.body
        const result = await updateCityService(cityId,data)
        return res.status(200).json(result)
    }catch(error){
        return next(error)
    }
}