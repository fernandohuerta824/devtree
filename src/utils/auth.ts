import bcrypt from 'bcrypt'

export const hashPassword = async (passwordToHash: string) => {
    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(passwordToHash, salt)
}