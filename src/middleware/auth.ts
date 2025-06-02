import type { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { UnauthorizedResponseError, ValidationResponseError } from "../utils/ErrorResponse";
import { IUser, LoginUser } from "../types/user";
import { setErrorValidation, validationErrors } from "../utils/routeValidations";
import slugify from 'slugify'
import { TypeErrors, ValidationErrors } from "../types/error";
import { existsUser } from "../utils/auth";
import { verifyPassword } from "../utils/auth";
import User from "../models/User";
import {} from './../types/express'


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
        const errors: ValidationErrors = {}
        if(user.email === email) {
            errors.email = setErrorValidation('alreadyExist', 'The email already exists')
        }
        if(user.handle === userSlug) {
            errors.handle = setErrorValidation('alreadyExist', 'The handle already exists')
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

export const isAuth = async  (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearer = req.headers.authorization
    
        if(!bearer) {
            throw new UnauthorizedResponseError()
        }
    
        const token = bearer.split(' ')[1]
        const jwtSecret = process.env.JWT_SECRET as jwt.Secret
    
        const userToken = jwt.verify(token, jwtSecret) as Pick<IUser, '_id'> & {iat: number, exp: number}

        const user = await User.findById(userToken._id)
        if(new Date(Date.now()) >= new Date(userToken.exp * 1000)) {
            throw new UnauthorizedResponseError()
        }
        
        if(!user) {
            throw new UnauthorizedResponseError()
        }

        req.user = user
        next()
    } catch (error) {
        if(error instanceof JsonWebTokenError  || error instanceof SyntaxError) {
            throw new UnauthorizedResponseError()
        }

        throw error
    }
}