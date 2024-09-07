"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responseData_1 = require("../../utils/responseData");
const conversationModel_1 = __importDefault(require("../model/conversationModel"));
const messageModel_1 = __importDefault(require("../model/messageModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: receiverIds } = req.params;
        const { message } = req.body;
        const senderIds = req.user._id;
        const senderId = senderIds;
        const receiverId = new mongoose_1.default.Types.ObjectId(receiverIds);
        console.log(senderId);
        let conversation = yield conversationModel_1.default.findOne({
            participants: {
                $all: [senderId, receiverId],
            },
        });
        if (!conversation) {
            conversation = yield conversationModel_1.default.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }
        const newMessage = new messageModel_1.default({
            senderId,
            receiverId,
            message,
        });
        // console.log(newMessage);
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        yield Promise.all([conversation.save(), newMessage.save()]);
        return (0, responseData_1.sendResponse)(res, true, http_status_codes_1.StatusCodes.OK, "Message sent successfully");
    }
    catch (err) {
        return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, (err === null || err === void 0 ? void 0 : err.message) ? err.message : "Internal Server Error. Try again");
    }
});
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = req.params;
        const ownId = req.user._id;
        let conversation = yield conversationModel_1.default.findOne({
            participants: { $all: [ownId, userId] },
        }).populate("messages");
        if (!conversation) {
            conversation = [];
        }
        // console.log(conversation)
        return (0, responseData_1.sendResponse)(res, true, http_status_codes_1.StatusCodes.OK, "Messages retrived successfully", conversation);
    }
    catch (err) {
        return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, (err === null || err === void 0 ? void 0 : err.message) ? err.message : "Internal Server Error. Try again");
    }
});
exports.messageController = {
    sendMessage,
    getMessages,
};
