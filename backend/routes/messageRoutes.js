import express from "express";
import { messageController } from "../messages/messageController/messageController.js";
import protectedRoutes from "../middleware/protectedRoute.js";

const messagesRoutes = express.Router();

messagesRoutes.post(
  "/send/:id",
  protectedRoutes,
  messageController.sendMessage
);

messagesRoutes.get("/:id", protectedRoutes, messageController.getMessages);

export default messagesRoutes;
