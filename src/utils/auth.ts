import bcrypt from 'bcrypt'
import User from '../models/User'

export const hashPassword = async (passwordToHash: string) => {
    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(passwordToHash, salt)
}

export const existsUser = async ({ email, handle }: { email?: string, handle?: string }) => {
    const user = await User.findOne(
        { $or: [ 
            { email },
            { handle, } 
        ]}, 
        { _id: true, email: true, handle: true }
    )

    return user
}