import type { NextFunction, Request, Response } from "express";
import { UnauthorizedResponseError, ValidationResponseError } from "../utils/ErrorResponse";
import { IUser, LoginUser } from "../types/user";
import { validationErrors } from "../utils/routeValidations";
import slugify from 'slugify'
import { TypeErrors, ValidationErrors } from "../types/error";
import { existsUser } from "../utils/auth";
import { verifyPassword } from "../utils/auth";


export function handleValidationErrors ({type = 'unprocessable', fallBack} : {type: TypeErrors, fallBack?: string}) {
    return ( 
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { isEmpty, errors } = validationErrors(req)

        if(!isEmpty && type === 'unprocessable') {
            throw new ValidationResponseError(                 
                errors,
                fallBack
            )
        }

        if(!isEmpty && type === 'unauthorized') {
            throw new UnauthorizedResponseError(fallBack)
        }
        next()
    }
}

export async function validateExistingUserRegister(
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
            errors,
        )
    }

    next()
}

export async function validateExistingUserLogin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { email, password } = req.body as LoginUser

    const user = await existsUser({email})

    if(!user) {
        throw new UnauthorizedResponseError('The email or password is wrong')
    }

    const matchPassword = await verifyPassword(password, user.password)
        
    if(!matchPassword) {
        throw new UnauthorizedResponseError('The email or password is wrong')
    }

    req.body = user
    next()
}
