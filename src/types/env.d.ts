declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string
    PORT: string|undefined
    HOST: string|undefined
    MONGODB_NAME: string
    FRONTEND_URL: string
    JWT_SECRET: string
    CLOUDINARY_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINAY_API_SECRET: string
  }
}