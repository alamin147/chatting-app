
import express from "express"
import protectedRoutes from '../middleware/protectedRoute'
import { usersController } from "../users/usersController/usersController"

const userRoutes = express.Router()

userRoutes.get("/",protectedRoutes,usersController.users)



export default userRoutes