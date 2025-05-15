import { ValidationErrors } from "../types/error";

export class ErrorResponse extends Error {
    public status: number
    public name: string
    public message: string;
    public extra: any
    constructor(name: string, message = 'Something went wrong',status = 500, extra?: any) {
        super(message)
        this.name = name
        this.status = status
        this.message = message
        this.extra = extra
        Object.setPrototypeOf(this, ErrorResponse.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationResponseError extends ErrorResponse {
    public errors: ValidationErrors

    constructor( errors: ValidationErrors, message = 'One or more validation errors') {
        super('ValidationError', message, 422)
        this.errors = errors

        Object.setPrototypeOf(this, ValidationResponseError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class UnauthorizedResponseError extends ErrorResponse {
    constructor(message = 'Unauthorized') {
        super('UnauthorizedError', message, 401)
    }
}