import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (req:Request, res:Response, next:NextFunction) => {
   console.log("Not found")

   const statusCode = res.statusCode !== 200 ? res.statusCode : 404

   return res.status(statusCode).json({
      status: "error",
      message: "Not found"
   })
}