import { registerUserService } from "./registerUser.service";
import { Request, Response } from "express";

export async function registerUserController (req: Request, res: Response){
    try {
        const {name, email, password, isAdmin} = req.body
        const avatarPath = req.file? req.file.filename : null
        const user = await registerUserService({name, email, password, isAdmin, avatarPath})
        return res.status(201).json(user)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}
