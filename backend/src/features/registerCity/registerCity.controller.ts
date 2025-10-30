import { registerCityService} from "./registerCity.service"
import {Request, Response, NextFunction} from "express"

export async function registerCityController(req:Request, res:Response, next:NextFunction){
    try {
        const { name, country } = req.body
        const imagePath = req.file?.path
        if(!imagePath){
            return res.status(400).json({message: "Imagem nao encontrada"})
        }
        const registerCity = await registerCityService({name, country, imagePath})
        return res.status(201).json(registerCity)
    }catch(error:any){
        next(error)
    }
}
