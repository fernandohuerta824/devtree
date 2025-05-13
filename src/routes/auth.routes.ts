import { Router } from "express";
import { registerController } from '../controllers/auth.controller'
import { validateHandle, validateEmail, validatePassword } from "../utils/routeValidations";

const authRoutes = Router()

authRoutes.post('/register',
    validateHandle,
    validateEmail,
    validatePassword
, registerController)

export default authRoutes