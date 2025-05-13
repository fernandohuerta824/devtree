import { body, validationResult } from "express-validator";
import type { Request } from "express";


export const validateName = body('name')
    .notEmpty()
    .withMessage('The name is required')
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage('The name must be between 3 and 20 characters long')
    .bail()
    .trim()


export const validateHandle = body('handle')
    .notEmpty()
    .withMessage('The handle is required')
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage('The handle must be between 3 and 20 characters long')
    .bail()


export const validateEmail = body('email')
    .notEmpty()
    .withMessage('The email is required')
    .bail()
    .isEmail()
    .withMessage('The email is not valid')
    .bail()
    .normalizeEmail()

export const validatePassword = body('password')
    .notEmpty()
    .withMessage('The password is required')
    .bail()
    .isLength({ min: 8, max: 40 })
    .withMessage('The password must be between 8 and 40 characters long')
    .bail()
    .trim()
    .isAlphanumeric()
    .withMessage('The password must contain only letters and numbers')
    .custom((value) => {
        if (!/[a-z]/.test(value)) {
            throw new Error('The password must contain at least one lowercase letter')
        }
        if (!/[A-Z]/.test(value)) {
            throw new Error('The password must contain at least one uppercase letter')
        }
        if (!/[0-9]/.test(value)) {
            throw new Error('The password must contain at least one number')
        }

        if(value.includes(' ')) {
            throw new Error('The password must not contain spaces')
        }
        return true
    })
    .bail()
    .custom(async (value, { req }) => {
        const { confirmPassword } = req.body

        if (value !== confirmPassword) {
            throw new Error('The password confirmation does not match the password')
        }
        return true
    })
    .bail()



        
        

export const validationErrors = (req: Request) : {
    isEmpty: false
    errors: Record<string, string>
} | {
    isEmpty: true
    errors: null    
} => {
    const errors = validationResult(req)
    const isEmpty = errors.isEmpty()
    if (!isEmpty) {
        const formattedErrors = errors.array().reduce((acc, err) => {
            if ('path' in err && 'msg' in err) {
                acc[err.path] = err.msg;
            }
            return acc;
        }, {} as Record<string, string>);
        return {
            isEmpty,
            errors: formattedErrors
        }

    }

    return {
        isEmpty,
        errors: null
    }
}
    