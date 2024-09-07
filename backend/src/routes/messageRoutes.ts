import express from "express";
import { messageController } from "../messages/messageController/messageController";
import protectedRoutes from "../middleware/protectedRoute";

const messagesRoutes = express.Router();

messagesRoutes.post(
  "/send/:id",
  protectedRoutes,
  messageController.sendMessage
);

messagesRoutes.get("/:id", protectedRoutes, messageController.getMessages);

export default messagesRoutes;
