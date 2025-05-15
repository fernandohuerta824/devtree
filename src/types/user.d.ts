import { ObjectId } from "mongoose"

export interface IUser {
    _id: ObjectId
    name: string
    email: string
    password: string
    handle: string
}

export interface LoginUser {
    email: string
    password: string
}