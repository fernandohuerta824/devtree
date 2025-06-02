import { Router } from "express";
import { getUser } from "../controllers/user.controller";
import { isAuth } from "../middleware/auth";

const userRoutes = Router()

userRoutes.use(isAuth)
userRoutes.get('/', getUser)

export default userRoutes