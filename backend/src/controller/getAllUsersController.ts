import { getAllUsersService } from "../services/getAllUsersService";
import { Request, Response } from "express";

export async function getAllUsersController(req: Request, res: Response){
    try {
        const users = await getAllUsersService()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
}
