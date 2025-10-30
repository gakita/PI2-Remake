import { validateCityNameSchema } from "./getCitiesByName.schema";
import { getCitiesByNameService } from "./getCitiesByName.service";
import { Request, Response, NextFunction } from "express";

export async function getCitiesByNameController(req:Request, res:Response, next:NextFunction){
    try{
        const {name} = validateCityNameSchema.parse(req.params)
        const cities = await getCitiesByNameService(name)
        if (!cities || cities === null || cities == undefined) {
            return res.status(404).json({message:"Cities not found"})
        }
        return res.status(200).json(cities)
    }catch(error){
        next(error)
    }
}