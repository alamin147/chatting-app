"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../messages/messageController/messageController");
const protectedRoute_1 = __importDefault(require("../middleware/protectedRoute"));
const messagesRoutes = express_1.default.Router();
messagesRoutes.post("/send/:id", protectedRoute_1.default, messageController_1.messageController.sendMessage);
messagesRoutes.get("/:id", protectedRoute_1.default, messageController_1.messageController.getMessages);
exports.default = messagesRoutes;
