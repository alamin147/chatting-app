import express from "express";
import { authController } from "../auth/authController/authController.js";
const authRoutes = express.Router();

authRoutes.post("/sign-up", authController.signup);

export default authRoutes;
