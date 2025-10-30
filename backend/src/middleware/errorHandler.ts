import { Request, Response, NextFunction} from "express";

export const errorHandler = (
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
) => {
    console.error(`Erro: ${err.stack}`)

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500

    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
}