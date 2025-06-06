import type { NextFunction, Request, Response } from 'express'
import {} from './../types/express'
import { IUser } from '../types/user'
import slugify from 'slugify'
import User from '../models/User'
import { ValidationResponseError } from '../utils/ErrorResponse'


export const getUser = async (req: Request, res: Response, next: NextFunction) => {   

    const { user } = req
    res.json({user: {
        id: user?._id,
        handle: user?.handle,
        email: user?.email,
        name: user?.name,
        description: user?.description
    }})
}

export const updateUserProfile = async (
    req: Request<{}, {}, Pick<IUser, 'description' | 'handle'>>, 
    res: Response, 
    next: NextFunction
) => {
    const user = req.user!
    const { description, handle } = req.body
    const slug = slugify(handle).toLowerCase()

    const existingUser = await User.findOne({handle : slug})

    if(existingUser && slug !== user.handle) {
        throw new ValidationResponseError({
            handle: {
                message: 'The handle is already taken', 
                type: 'userExists'
            }
        })
    }
    
    user.handle = slug
    user.description = description
    await user.save()

    res.json({message: 'User has been updated successfully'})
}  