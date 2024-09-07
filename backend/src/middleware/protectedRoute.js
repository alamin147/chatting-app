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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseData_1 = require("../utils/responseData");
const http_status_codes_1 = require("http-status-codes");
const userModel_1 = __importDefault(require("../auth/userModel/userModel"));
const protectedRoutes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        // console.log("token", token);
        if (!token) {
            return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized access");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        const { userInfo } = decoded;
        if (!decoded) {
            return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized access");
        }
        const user = yield userModel_1.default.findOne({
            username: userInfo === null || userInfo === void 0 ? void 0 : userInfo.username,
        }).select("-password");
        // console.log("decoded", user);
        req.user = user;
        next();
    }
    catch (err) {
        return (0, responseData_1.sendResponse)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, (err === null || err === void 0 ? void 0 : err.message) ? err.message : "Internal Server Error. Try again");
    }
});
exports.default = protectedRoutes;
