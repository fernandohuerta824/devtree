import { body, validationResult } from "express-validator";
import type { Request } from "express";
import { ValidationErrors } from "../types/error";

export const setErrorValidation = (type = 'validationError', message = 'Validation Error') => {
    return {
        type,
        message
    }
}

export const validateName = body("name")
    .notEmpty()
    .withMessage(setErrorValidation('required', 'The name is required'))
    .bail()
    .isLength({ min: 3 })
    .withMessage(setErrorValidation('minLength', "The name must be at least 3 characters long"))
    .bail()
    .isLength({ max: 20 })
    .withMessage(setErrorValidation('maxLength', "The name must be max 20 characters long"))

export const validateDescription = body("name")
    .isLength({ max: 250 })
    .withMessage(setErrorValidation('maxLength', 'The description must be at most 250 characters long'))

export const validateHandle = body("handle")
    .notEmpty()
    .withMessage(setErrorValidation('required', "The handle is required"))
    .bail()
    .isLength({ min: 3 })
    .withMessage(setErrorValidation('minLength', "The handle must be at least 3 characters long"))
    .bail()
    .isLength({ max: 20 })
    .withMessage(setErrorValidation('maxLength', "The handle must be max 20 characters long"))

export const validateEmail = body("email")
    .notEmpty()
    .withMessage(setErrorValidation('required', 'The email is required'))
    .bail()
    .isEmail()
    .withMessage(setErrorValidation('required', 'The email is not valid'))
    .bail()
    .normalizeEmail();

export const validatePassword = (login = false) => {
    const validation = body("password")
        .notEmpty()
        .withMessage(setErrorValidation('required', "The password is required"))
        .bail()
        .isLength({ min: 8 })
        .withMessage(setErrorValidation('minLength', "The password must be at least 8 characters long"))
        .bail()
        .isLength({ max: 40 })
        .withMessage(setErrorValidation('maxLength', "The password must be max 40 characters long"))
        .bail()
        .trim()
        .isAlphanumeric()
        .withMessage(setErrorValidation('alphanumeric', "The password must contain only letters and numbers"))
        .custom((value) => {
            if (!/[a-z]/.test(value)) {
                throw setErrorValidation('lowerRequired', "The password must contain at least one lowercase letter");
            }
            if (!/[A-Z]/.test(value)) {
                throw setErrorValidation('upperRequired', "The password must contain at least one uppercase letter");
            }
            if (!/[0-9]/.test(value)) {
                throw setErrorValidation('numberRequired', "The password must contain at least one number");
            }
            if (value.includes(" ")) {
                throw setErrorValidation('spaceNotRequired', "The password must not contain spaces");
            }
            return true;
        })
        .bail();
    if (!login) {
        validation
            .custom(async (value, { req }) => {
                const { confirmPassword } = req.body;
                if (value !== confirmPassword) {
                    throw setErrorValidation('doNotMatch', "The password confirmation does not match the password");
                }
                return true;
            });
    }
    return validation
};

export const validationErrors = (req: Request): {
    isEmpty: false;
    errors: ValidationErrors;
} | {
    isEmpty: true;
    errors: {};
} => {
    const errorsResult = validationResult(req);
    const isEmpty = errorsResult.isEmpty();
    const errors: ValidationErrors = {}
    errorsResult.array().forEach(error => {
        if('path' in error && 'msg' in error) {
            errors[error.path] = {
                type: error.msg.type || 'unknowm',
                message: error.msg.message || 'Validation Error'
            }
        }
    })
    
    if (!isEmpty) {
        return {
            isEmpty,
            errors,
        };
    }

    return {
        isEmpty,
        errors: {},
    };
};
