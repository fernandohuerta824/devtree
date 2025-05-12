import app from './server'
import http from 'http'

const server = http.createServer(app)

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'


server.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`)
})

