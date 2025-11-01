import {loginAuthService} from "./loginAuth.service"
import { Request, Response } from "express";

export async function loginAuthController(req:Request,res:Response){
    try{
        const {email,password} = req.body
        const result = await loginAuthService(email,password)
        res.status(200).json(result)
    }catch(error:any){
        res.status(500).json({error:error.message})
    }
}