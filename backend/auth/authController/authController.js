import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/responseData.js";
import User from "../userModel/userModel.js";
import { hashPassword } from "../../utils/hashPassword.js";

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

    return sendResponse(
      res,
      true,
      StatusCodes.CREATED,
      "User Created Successfully",
      newUser
    );
  } catch (err) {
    console.log(err.message);
    return sendResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err?.message ? err.message : "Internal Server Error. Try again"
    );
    // next(err)
  }
};

export const authController = {
  signup,
};
