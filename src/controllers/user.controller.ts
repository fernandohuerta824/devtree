import type { NextFunction, Request, Response } from 'express'

export const getUser = (req: Request, res: Response, next: NextFunction) => {
    res.send('Siuuuu')
}