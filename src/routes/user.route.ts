import { Router } from "express";
import { getUser, updateUserProfile, uploadImage } from "../controllers/user.controller";
import { handleValidationErrors, isAuth } from "../middleware/auth";
import { validateDescription, validateHandle } from "../utils/routeValidations";
import { checkValidFields } from "../middleware/checkValidFields";

const userRoutes = Router()

userRoutes.use(isAuth)

userRoutes.get('/', getUser)

userRoutes.patch('/', 
    checkValidFields(['handle', 'description', 'links']),
    validateHandle,
    validateDescription,
    handleValidationErrors({ type: 'unprocessable' }),
updateUserProfile)

userRoutes.post('/image', uploadImage)

export default userRoutes