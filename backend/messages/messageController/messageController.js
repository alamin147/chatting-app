import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/responseData.js";
import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";
import mongoose from "mongoose";

const sendMessage = async (req, res) => {
  try {
    const { id: receiverIds } = req.params;

    const { message } = req.body;

    const senderIds = req.user._id;

    const senderId = senderIds;
    const receiverId = new mongoose.Types.ObjectId(receiverIds);

    console.log(senderId);

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // console.log(newMessage);
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    return sendResponse(res, true, StatusCodes.OK, "Message sent successfully");
  } catch (err) {
    return sendResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err?.message ? err.message : "Internal Server Error. Try again"
    );
  }
};

export const messageController = {
  sendMessage,
};
