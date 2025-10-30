import { validateCityNameSchema } from "./getCitiesByName.schema";
import { getCitiesByNameService } from "./getCitiesByName.service";
import { Request, Response, NextFunction } from "express";
import { capitalizeFirstLetter } from "../../helper/capitalizeFirstLetter";

export async function getCitiesByNameController(req:Request, res:Response, next:NextFunction){
    try{
        const {name} = validateCityNameSchema.parse(req.params)
        const nameCapitalize = capitalizeFirstLetter(name)
        const cities = await getCitiesByNameService(nameCapitalize)
        return res.status(200).json(cities)
    }catch(error){
        next(error)
    }
}