import type { NextFunction, Request, Response } from "express";
import { IUser } from "../types/user";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import slugify from "slugify";
import mongoose from "mongoose";


export const registerController = async (
    req: Request<{}, {}, IUser>, 
    res: Response
) => {
    const { email, handle, name, password } = req.body

    const hashedPassword = await hashPassword(password)

    const userSlug = slugify(handle)
    const user = new User({_id: new mongoose.Types.ObjectId(), email, name, password: hashedPassword, handle: userSlug})

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
}

export const login = async (
    req: Request<{}, {}, IUser>, 
    res: Response
) => {
    res.json({message: 'All working'})
}