import { Router } from "express";
import { getUser, getUserByHandle, updateUserProfile, uploadImage } from "../controllers/user.controller";
import { handleValidationErrors, isAuth } from "../middleware/auth";
import { validateDescription, validateHandle } from "../utils/routeValidations";
import { checkValidFields } from "../middleware/checkValidFields";

const userRoutes = Router()

userRoutes.get('/', isAuth, getUser)

userRoutes.patch('/', 
    isAuth,
    checkValidFields(['handle', 'description', 'links']),
    validateHandle,
    handleValidationErrors({ type: 'unprocessable' }),
updateUserProfile)

userRoutes.post('/image', isAuth, uploadImage)
userRoutes.get('/:handle', getUserByHandle)

export default userRoutes