import { registerCityService} from "../services/registerCityService"
import {Request, Response} from "express"

export async function registerCityController(req:Request, res:Response){
    try {
        const { name, country} = req.body
        const imagePath = req.file?.path
        if(!imagePath){
            return res.status(400).json({message: "Imagem nao encontrada"})
        }
        const registerCity = await registerCityService({name, country, imagePath})
        return res.status(201).json(registerCity)
    }catch(error:any){
        console.log(error)
        return res.status(500).json(error.message)
    }
}