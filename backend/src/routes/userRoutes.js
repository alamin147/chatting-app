"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectedRoute_1 = __importDefault(require("../middleware/protectedRoute"));
const usersController_1 = require("../users/usersController/usersController");
const userRoutes = express_1.default.Router();
userRoutes.get("/", protectedRoute_1.default, usersController_1.usersController.users);
exports.default = userRoutes;
