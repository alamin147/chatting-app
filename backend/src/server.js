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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const port = process.env.PORT || 5000;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/messages", messageRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.get("/", (req, res) => {
    res.send("server is working");
});
app.listen(port, () => {
    const mongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.DATABASE_URI);
            console.log("connected to DB");
        }
        catch (error) {
            console.log(error);
        }
    });
    mongoDB();
    console.log(`port on ${port}`);
});
// "dependencies": {
//     "bcryptjs": "^2.4.3",
//     "cookie-parser": "^1.4.6",
//     "cors": "^2.8.5",
//     "dotenv": "^16.4.5",
//     "express": "^4.19.2",
//     "http-status-codes": "^2.3.0",
//     "jsonwebtoken": "^9.0.2",
//     "mongodb": "^6.8.0",
//     "mongoose": "^8.5.4",
//     "socket.io": "^4.7.5",
//     "ts-node-dev": "^2.0.0"
//   },
//   "devDependencies": {
//     "@types/bcryptjs": "^2.4.6",
//     "@types/cookie-parser": "^1.4.7",
//     "@types/express": "^4.17.21",
//     "@types/jsonwebtoken": "^9.0.6",
//     "nodemon": "^3.1.4"
//   }
// }
