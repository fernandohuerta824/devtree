import type { NextFunction, Request, Response } from 'express'
import {} from './../types/express'
import { IUser } from '../types/user'
import slugify from 'slugify'
import formidable from 'formidable'
import User from '../models/User'
import { ErrorResponse, ValidationResponseError } from '../utils/ErrorResponse'
import cloudinary from '../config/cloudinary'

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req!
    res.json({user: {
        id: user?._id,
        handle: user?.handle,
        email: user?.email,
        name: user?.name,
        description: user?.description,
        image: user?.image
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

    res.json({message: 'User has been updated successfully', user: {
        id: user._id,
        name: user.name,
        email: user.email,
        handle: user.handle,
        description: user.description,
        image: user.image
    }})
}  

export const uploadImage = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    
    const form = formidable({
        multiples: false,
    })

    form.parse(req, async (error, fields, files) => {
        const filePath = files.file?.[0].filepath || '';

        if (typeof filePath !== 'string' || !filePath) {
            return next(new ValidationResponseError({ image: { message: 'Imagen not provided', type: 'required' } }))
        }
        const user = req.user!
     
        await cloudinary.uploader.destroy(user.image_id)

        cloudinary.uploader.upload(filePath, {}, async (error, result) => {
            if(error) {
                return next(new ErrorResponse("Error","Error at trying to updload the image"))
            }
            
            user.image = result?.secure_url!
            user.image_id = result?.public_id!

            await user.save()

            res.status(201).json({ message: 'Image uploaded successfully', image: user.image })
        })
    })
}