import { updateUserService } from "./updateUser.service";
import { Request, Response } from "express";

export const updateUserController = async function updateUserController(req:Request,res:Response){
    try{
        const id = parseInt(req.params.id)
        const data = req.body
        const user = await updateUserService(id,data)
        res.status(200).json(user)
    }catch(error:any){
        res.status(500).json({error:error.message})
    }
}
