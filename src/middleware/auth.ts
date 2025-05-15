import type { NextFunction, Request, Response } from "express";
import { ValidationResponseError } from "../utils/ErrorResponse";
import { IUser } from "../types/user";
import { validationErrors } from "../utils/routeValidations";
import slugify from 'slugify'
import User from "../models/User";
import { ValidationErrors } from "../types/error";
import { existsUser } from "../utils/auth";


export function handleValidationErrors (
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { isEmpty, errors } = validationErrors(req)
        if(!isEmpty) {
            throw new ValidationResponseError(
            'ValidationUserRegisterError', 
            errors
        )
    }

    next()
}

export async function validateExistingUser(
    req: Request<{}, {}, IUser>,
    res: Response,
    next: NextFunction
) {

    const { email, handle } = req.body
    const userSlug = slugify(handle)
    
    const user = await existsUser({email, handle: userSlug})

    if(user) {
        const errors: ValidationErrors  = []
        if(user.email === email) {
            errors.push(['email', 'Email already exists'])
        }
        if(user.handle === userSlug) {
            errors.push(['handle', 'Handle already exists'])
        }
    
        throw new ValidationResponseError(
            'ValidationUserRegisterError', 
            errors,
        )
    }

    next()
}