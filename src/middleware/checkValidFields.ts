import type { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../utils/ErrorResponse'

export const checkValidFields = (fields: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const bodyFields = Object.keys(req.body)
        const invalidFields = bodyFields.filter(bf => !fields.includes(bf))
        
        if(invalidFields.length > 0) {
            throw new ErrorResponse('BadRequest', `Bad Request: They were sent invalid fields: ${invalidFields.join(', ')}`, 400, {
                invalidFields,
            })
        }

        const missingFields = fields.filter(f => !bodyFields.includes(f))
        if(missingFields.length > 0) {
                throw new ErrorResponse('BadRequest', `Bad Request: Fields are missing: ${missingFields.join(', ')}`, 400, {
                missingFields,
            })
        }        

        next()
    }
}