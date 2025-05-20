export type ValidationErrors = {
    [x: string]: {
        type: string,
        message: string,
    }
}

export type TypeErrors = 'unprocessable' | 'unauthorized'