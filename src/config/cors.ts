import { CorsOptions } from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const url = process.env.FRONTEND_URL

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        if(origin === url) {
            callback(null, origin)
        } else {
            callback(new Error('CORS'), origin)
        }
    }
}