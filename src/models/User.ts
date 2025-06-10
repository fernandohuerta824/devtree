import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema({
    _id: {
        type: Schema.ObjectId,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        trim: true,
        default: ''
    },
    image_id: {
        type: String,
        trim: true,
        default: ''
    }
})
const User = mongoose.model<IUser>('User', userSchema, 'users')

export default User
