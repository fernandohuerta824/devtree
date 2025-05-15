import { ValidationErrors } from "../types/error";

export class ErrorResponse extends Error {
    public status: number
    public name: string
    public message: string;
    constructor(name: string, message = 'Something went wrong',status = 500) {
        super(message)
        this.name = name
        this.status = status
        this.message = message

        Object.setPrototypeOf(this, ErrorResponse.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationResponseError extends ErrorResponse {
    public errors: ValidationErrors

    constructor(name: string, errors: ValidationErrors, message = 'One or more validation errors') {
        super(name, message, 422)
        this.errors = errors

        Object.setPrototypeOf(this, ValidationResponseError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}