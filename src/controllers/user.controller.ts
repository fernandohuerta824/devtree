import type { NextFunction, Request, Response } from 'express'
import {} from './../types/express'
import { IUser, SocialNetwork } from '../types/user'
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
        image: user?.image,
        links: user?.links
    }})
}

export const updateUserProfile = async (
    req: Request<{}, {}, Pick<IUser, 'description' | 'handle' | 'links'>>, 
    res: Response, 
    next: NextFunction
) => {
    const user = req.user!
    const { description, handle, links} = req.body
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
    user.links = links
    await user.save()

    res.json({message: 'User has been updated successfully', user: {
        id: user._id,
        name: user.name,
        email: user.email,
        handle: user.handle,
        description: user.description,
        image: user.image,
        links: user.links
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
     
        
        cloudinary.uploader.upload(filePath, {}, async (error, result) => {
            if(error) {
                return next(new ErrorResponse("Error","Error at trying to updload the image"))
            }
            
            cloudinary.uploader.destroy(user.image_id)
            user.image = result?.secure_url!
            user.image_id = result?.public_id!

            await user.save()

            res.status(201).json({ message: 'Image uploaded successfully', image: user.image })
        })
    })
}

export const getUserByHandle = async (
    req: Request<{ handle: string}>, 
    res: Response, 
    next: NextFunction
) => {
    const { handle } = req.params

    const user = await User.findOne(
        { handle }, 
        { 
            password: false, 
            __v: false ,
            email: false,
            image_id: false,
            _id: false
        }
    )

    if(!user) {
        throw new ErrorResponse('NotFound', 'The user you are trying to view does not exist or account not available', 404 )
    }

    const links = JSON.parse(user.links)
        .filter((l: SocialNetwork) => l.enabled)
        .sort((a: SocialNetwork, b: SocialNetwork) => a.id - b.id)
    
    res.json({user: {
        name: user.name,
        email: user.email,
        handle: user.handle,
        description: user.description,
        image: user.image,
        links
    }})
}