import { NextFunction, Request, Response } from "express";

export const registerController = (req: Request, res: Response) => {
    const { user } = req.body
    res.status(200).json({
        message: 'All working',
        user,
    })
}