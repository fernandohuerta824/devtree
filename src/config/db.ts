import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI
        const dbName = process.env.MONGODB_NAME

        if(!uri || !dbName) {
            throw new Error('Error connecting to the database: Invalid Uri')
        }
        await mongoose.connect(uri, {
            dbName,
            maxPoolSize: 50,             // default es 100
            minPoolSize: 5,              // número mínimo de conexiones activas
            serverSelectionTimeoutMS: 5000,  // tiempo de espera antes de fallar conexión
            socketTimeoutMS: 45000,          // tiempo máximo sin respuesta
            connectTimeoutMS: 10000,         // tiempo de espera de conexión inicial
            retryWrites: true,              // reintenta escrituras fallidas
        })
        console.log('Connection to the database was successful')
    } catch (error: any) {
        throw new Error(error.message || 'Something went wrong when trying to connect to the database')
    }
}