import mongoose from "mongoose";
import { User } from "../types/user";

const userSchema = new mongoose.Schema({
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
        lowercase: true
    },
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
})
const User = mongoose.model<User>('User', userSchema, 'users')

export default User
