import { ObjectId } from "mongoose"

export interface IUser {
    _id: ObjectId
    name: string
    email: string
    password: string
    handle: string
    description: string
    image: string
    image_id: string
    links: string
}

export interface LoginUser {
    email: string
    password: string
}

export type SocialNetwork = {
    id: number,
    name: string
    url: string
    enabled: boolean
}