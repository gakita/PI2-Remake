import {getUserByEmailRepo} from "./getUserByEmail.repo";
import { NextFunction, Request, Response } from "express";

export const getUserByEmailController = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {email}  = req.params;
        const user = await getUserByEmailRepo(email);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
