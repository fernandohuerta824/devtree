import type { NextFunction, Request, Response } from "express";
import { RegisterUser } from "../types/user";
import User from "../models/User";
import slug from 'slugify'
import {ValidationResponseError,  } from "../utils/ErrorResponse";
import { hashPassword } from "../utils/auth";
import { validationErrors } from "../utils/routeValidations";

export const registerController = async (req: Request<{}, {}, RegisterUser>, res: Response, next: NextFunction) => {
    try {
        
        const { isEmpty, errors } = validationErrors(req)
        if(!isEmpty) {
            throw new ValidationResponseError(
                'ValidationUserError', 
                errors,
            )
        }

        const { email, name, password, handle } = req.body
        
        const userSlug = slug(handle)
        const existingUser = await User.findOne(
            { $or: [ 
                { email },
                { handle: userSlug } 
            ]}, 
            { _id: true, email: true, handle: true }
        )

        if(existingUser) {
            const errorObj: Record<string, string> = {}
            if(existingUser.email === email) {
                errorObj.email = 'The email is already in use'
            }
            if(existingUser.handle === userSlug) {
                errorObj.handle = 'The handle is already in use'
            }
            throw new ValidationResponseError(
                'ValidationUserError', 
                errorObj,
            )
        }
        
        const hashedPassword = await hashPassword(password)

        const user = new User({email, name, password: hashedPassword, handle: userSlug})

        await user.save()

        res.status(201).json({
            message: 'User created successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                handle: user.handle
            }
        })
    } catch(error: any) {
        next(error)
    }
}