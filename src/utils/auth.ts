import bcrypt from 'bcrypt'
import User from '../models/User'

export const hashPassword = async (passwordToHash: string) => {
    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(passwordToHash, salt)
}

export const verifyPassword = (password: string, hashedPassword: string) => {
2
    
    return bcrypt.compare(password, hashedPassword)
}

export const existsUser = async ({ email, handle }: { email?: string, handle?: string }) => {
    const user = await User.findOne(
        { $or: [ 
            { email },
            { handle, } 
        ]},
        { __v: false }
    )

    return user
}
