import { deleteCityService } from "./deleteCity.service"
import { Request, Response } from "express"

export async function deleteCityController(req: Request, res: Response){
    try{
        const id = parseInt(req.params.id)
        if(isNaN(id)){
            return res.status(400).json({error: "ID invalido"})
        }
        if (id<=0){
            return res.status(400).json({error: "ID invalido"})
        }
        if (!id){
            return res.status(404).json({error: "ID não encontrado"})
        }
        await deleteCityService(id)
        res.status(200).json({message: "Cidade deletada com sucesso"})
    }catch(error){
        res.status(500).json({error: "Erro ao deletar cidade"})
    }
}
