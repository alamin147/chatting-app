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
exports.authController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responseData_1 = require("../../utils/responseData");
const userModel_1 = __importDefault(require("../userModel/userModel"));
const hashPassword_1 = require("../../utils/hashPassword");
const tokenGenerator_1 = require("../../utils/tokenGenerator");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, password, gender, confirmPassword } = req.body;
        // console.log(req.body);
        if (password != confirmPassword) {
            return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.BAD_REQUEST, "Passwords does not match");
        }
        const user = yield userModel_1.default.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.CONFLICT, "User Exits with same username or email");
        }
        const hashPass = yield (0, hashPassword_1.hashPassword)(password);
        const profilePic = "https://avatar.iran.liara.run/public/4";
        const newUser = yield userModel_1.default.create({
            name,
            username,
            email,
            password: hashPass,
            gender,
            profilePic,
        });
        // console.log("neeeww", newUser);
        const userInfo = {
            username,
            email,
            profilePic,
        };
        (0, tokenGenerator_1.tokenGenerator)(userInfo, res);
        return (0, responseData_1.sendResponse)(res, true, http_status_codes_1.StatusCodes.CREATED, "User Created Successfully", newUser);
    }
    catch (err) {
        // console.log(err.message);
        return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, (err === null || err === void 0 ? void 0 : err.message) ? err.message : "Internal Server Error. Try again");
        // next(err)
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const foundUser = yield userModel_1.default.findOne({ username });
        // console.log(foundUser);
        if (!foundUser) {
            return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
        }
        const passMatch = yield (0, hashPassword_1.comparePass)(password, (foundUser === null || foundUser === void 0 ? void 0 : foundUser.password) || "");
        if (!passMatch) {
            return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.BAD_REQUEST, "Wrong Password");
        }
        const userInfo = {
            username: foundUser === null || foundUser === void 0 ? void 0 : foundUser.username,
            email: foundUser === null || foundUser === void 0 ? void 0 : foundUser.email,
            profilePic: foundUser === null || foundUser === void 0 ? void 0 : foundUser.profilePic,
        };
        (0, tokenGenerator_1.tokenGenerator)(userInfo, res);
        return (0, responseData_1.sendResponse)(res, true, http_status_codes_1.StatusCodes.OK, "Logged in Successfully");
    }
    catch (err) {
        return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, (err === null || err === void 0 ? void 0 : err.message) ? err.message : "Internal Server Error. Try again");
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("token", "", { maxAge: 0 });
        return (0, responseData_1.sendResponse)(res, true, http_status_codes_1.StatusCodes.OK, "Logged out Successfully");
    }
    catch (err) {
        return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, (err === null || err === void 0 ? void 0 : err.message) ? err.message : "Internal Server Error. Try again");
    }
});
exports.authController = {
    signup,
    login,
    logout,
};
