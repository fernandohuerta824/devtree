import express from 'express'
import authRoutes from './routes/auth.routes'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use('/auth', authRoutes)

export default app
