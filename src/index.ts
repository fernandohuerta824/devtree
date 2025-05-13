import app from './server'
import http from 'http'
import dotenv from 'dotenv'
import { connectDB } from './config/db'

dotenv.config()

const server = http.createServer(app)

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'

connectDB().catch(error => console.log(error))

server.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`)
})