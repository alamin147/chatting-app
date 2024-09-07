import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import messagesRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
const port = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("server is working");
});

app.listen(port, () => {
  const mongoDB = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URI as string);
      console.log("connected to DB");
    } catch (error) {
      console.log(error);
    }
  };
  mongoDB();
  console.log(`port on ${port}`);
});
