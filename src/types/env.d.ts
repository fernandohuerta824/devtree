declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string
    PORT: string|undefined
    HOST: string|undefined
    MONGODB_NAME: string
    FRONTEND_URL: string
  }
}