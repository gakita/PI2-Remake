import { registerUserService } from "./registerUser.service";
import { Request, Response, NextFunction } from "express";

export async function registerUserController (req: Request, res: Response, next: NextFunction){
    try {
        const {name, email, password, isAdmin} = req.body
        const avatarPath = req.file? req.file.filename : null
        const user = await registerUserService({name, email, password, isAdmin, avatarPath})
        return res.status(201).json({"user": user})
    } catch (error:any) {
        next(error)
    }
}
