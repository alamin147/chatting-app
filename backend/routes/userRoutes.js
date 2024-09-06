
import express from "express"
import protectedRoutes from '../middleware/protectedRoute.js'
import { usersController } from "../users/usersController/usersController.js"

const userRoutes = express.Router()

userRoutes.get("/",protectedRoutes,usersController.users)



export default userRoutes