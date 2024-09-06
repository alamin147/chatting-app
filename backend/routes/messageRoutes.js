import express from "express"
import { messageController } from "../messages/messageController/messageController.js";

const messagesRoutes = express.Router()

messagesRoutes.post("/send/:id",messageController.sendMessage)

messagesRoutes.get("/:id",messageController.getMessages)

export default messagesRoutes;