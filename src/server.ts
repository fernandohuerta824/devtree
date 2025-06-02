import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import bodyParser from 'body-parser'
import { ErrorResponse } from './utils/ErrorResponse'
import { corsConfig } from './config/cors'
import userRoutes from './routes/user.route'

const app = express()

app.use(cors(corsConfig))
app.use(bodyParser.json({ limit: '10kb' }))
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorResponse('NotFound', 'Route not found', 404)
    next(error)
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const err = error instanceof ErrorResponse
        ? error
        : new ErrorResponse(
              error.name || 'ServerError',
              error.message || 'Something went wrong',
              error.status || 500
        );
    res.status(err.status).json({
        ...err,
    })
})

export default app
