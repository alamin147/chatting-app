import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
});

const User = mongoose.model("User", userSchema);

export default User;