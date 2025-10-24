import { registerCityService} from "../services/registerCityService"
import {Request, Response} from "express"

export async function registerCityController(req:Request, res:Response){
    try {
        const { name, country, state} = req.body
        const registerCity = await registerCityService({name, country, state})
        return res.status(201).json(registerCity)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}