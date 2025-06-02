import type { NextFunction, Request, Response } from 'express'
import {} from './../types/express'


export const getUser = async (req: Request, res: Response, next: NextFunction) => {   

    const { user } = req
    res.json({user: {
        id: user?._id,
        handle: user?.handle,
        email: user?.email,
        name: user?.name
    }})
}