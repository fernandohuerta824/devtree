import { Router } from "express";
import { login, registerController } from '../controllers/auth.controller'
import { validateHandle, validateEmail, validatePassword, validateName } from "../utils/routeValidations";
import { handleValidationErrors , validateExistingUserLogin, validateExistingUserRegister } from "../middleware/auth";
import { checkValidFields } from "../middleware/checkValidFields";

const authRoutes = Router()

authRoutes.post('/register',
    checkValidFields(['password', 'email', 'handle', 'confirmPassword', 'name']),
    validateHandle,
    validateEmail,
    validatePassword(),
    validateName,
    handleValidationErrors({ type: 'unprocessable' }) ,
    validateExistingUserRegister,
registerController)

authRoutes.post('/login', 
    checkValidFields(['password', 'email']),
    validateEmail,
    validatePassword(true),
    handleValidationErrors({ type: 'unauthorized', fallBack: 'The email or password is wrong' }),
    validateExistingUserLogin,
login)

export default authRoutes