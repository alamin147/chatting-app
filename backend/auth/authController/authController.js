import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/responseData.js";
import User from "../userModel/userModel.js";
import { comparePass, hashPassword } from "../../utils/hashPassword.js";
import { tokenGenerator } from "../../utils/tokenGenerator.js";

const signup = async (req, res) => {
  try {
    const { name, username, email, password, gender, confirmPassword } =
      req.body;
    // console.log(req.body);

    if (password != confirmPassword) {
      return sendResponse(
        res,
        false,
        StatusCodes.BAD_REQUEST,
        "Passwords does not match"
      );
    }
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) {
      return sendResponse(
        res,
        false,
        StatusCodes.CONFLICT,
        "User Exits with same username or email"
      );
    }

    const hashPass = await hashPassword(password);

    const profilePic = "https://avatar.iran.liara.run/public/4";

    const newUser = await User.create({
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
    tokenGenerator(userInfo, res);

    return sendResponse(
      res,
      true,
      StatusCodes.CREATED,
      "User Created Successfully",
      newUser
    );
  } catch (err) {
    // console.log(err.message);
    return sendResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err?.message ? err.message : "Internal Server Error. Try again"
    );
    // next(err)
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ username });

    // console.log(foundUser);
    if (!foundUser) {
      return sendResponse(res, false, StatusCodes.NOT_FOUND, "User not found");
    }

    const passMatch = await comparePass(password, foundUser?.password || "");

    if (!passMatch) {
      return sendResponse(
        res,
        false,
        StatusCodes.BAD_REQUEST,
        "Wrong Password"
      );
    }
    const userInfo = {
      username: foundUser?.username,
      email: foundUser?.email,
      profilePic: foundUser?.profilePic,
    };
    tokenGenerator(userInfo, res);
    return sendResponse(res, true, StatusCodes.OK, "Logged in Successfully");
  } catch (error) {
    return sendResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err?.message ? err.message : "Internal Server Error. Try again"
    );
  }
};
export const authController = {
  signup,
  login,
};
