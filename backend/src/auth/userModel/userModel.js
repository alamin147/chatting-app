"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, "Name is required"],
    },
    username: {
        type: String,
        require: [true, "Username is required"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Password is required"],
        minlength: 6,
    },
    gender: {
        type: String,
        require: [true, "Password is required"],
        enum: ["male", "female"],
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        unique: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
