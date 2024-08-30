import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
const port = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("server is working");
});

app.listen(port, () => {
  const mongoDB = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URI);
      console.log("connected to DB");
    } catch (error) {
      console.log(error);
    }
  };
  mongoDB();
  console.log(`port on ${port}`);
});
