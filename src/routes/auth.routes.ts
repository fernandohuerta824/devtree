import { Router } from "express";
import { registerController } from '../controllers/auth.controller'
import { validateHandle, validateEmail, validatePassword, validateName } from "../utils/routeValidations";
import { handleValidationErrors , validateExistingUser } from "../middleware/auth";

const authRoutes = Router()

authRoutes.post('/register',
    validateHandle,
    validateEmail,
    validatePassword,
    validateName,
    handleValidationErrors ,
    validateExistingUser
, registerController)

export default authRoutes