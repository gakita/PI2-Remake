import { registerUserService } from "../services/registerUserService";
import { Request, Response } from "express";

export async function registerUserController (req: Request, res: Response){
    try {
        const user = await registerUserService(req.body)
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}