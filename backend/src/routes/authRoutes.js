"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../auth/authController/authController");
const authRoutes = express_1.default.Router();
authRoutes.post("/sign-up", authController_1.authController.signup);
authRoutes.post("/login", authController_1.authController.login);
authRoutes.post("/logout", authController_1.authController.logout);
exports.default = authRoutes;
