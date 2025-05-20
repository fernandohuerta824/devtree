import jwt from 'jsonwebtoken'
import { IUser } from '../types/user'
 
export const generateJWT = (payload: Pick<IUser, '_id'>) => {
    const jwtSecret = process.env.JWT_SECRET as jwt.Secret
    
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: '15d'
    })
    return token
}