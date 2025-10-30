import { deleteAllUsersRepo } from "./deleteAllUsers.repo";
import { Request, Response, NextFunction } from "express";

export const deleteAllUsersController = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const deletedUsers = await deleteAllUsersRepo()
        return res.status(200).json(deletedUsers)
    } catch (error) {
        return next(error)
    }
}
