import { deleteAllCitiesService } from "./deleteAllCities.service"
import { Request, Response } from "express"

export async function deleteAllCitiesController(req: Request, res: Response){
    try{
        await deleteAllCitiesService()
        res.status(200).json({message: "Todas as cidades foram deletadas com sucesso"})
    }catch(error){
        res.status(500).json({error: "Erro ao deletar todas as cidades"})
    }
}
