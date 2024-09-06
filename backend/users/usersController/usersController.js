import { StatusCodes } from "http-status-codes";
import User from "../../auth/userModel/userModel.js";
import { sendResponse } from "../../utils/responseData.js";

const users = async (req, res) => {
  try {
    const userId = req.user._id;

    const allUser = await User.find({
      _id: { $ne: userId._id },
    }).select("-password");

    return sendResponse(res, true, StatusCodes.OK, "Users", allUser);
  } catch (err) {
    return sendResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err?.message ? err.message : "Internal Server Error. Try again"
    );
  }
};

export const usersController = {
  users,
};
