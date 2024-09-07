import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/responseData";
import Conversation from "../model/conversationModel";
import Message from "../model/messageModel";
import mongoose from "mongoose";
import { Request, Response } from "express";

const sendMessage = async (req: Request, res: Response) => {
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
  } catch (err: any) {
    return sendResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err?.message ? err.message : "Internal Server Error. Try again"
    );
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;

    const ownId = req.user._id;

    let conversation: any = await Conversation.findOne({
      participants: { $all: [ownId, userId] },
    }).populate("messages");

    if (!conversation) {
      conversation = [];
    }
    // console.log(conversation)
    return sendResponse(
      res,
      true,
      StatusCodes.OK,
      "Messages retrived successfully",
      conversation
    );
  } catch (err: any) {
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
  getMessages,
};
