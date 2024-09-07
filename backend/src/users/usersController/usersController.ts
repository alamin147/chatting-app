import { StatusCodes } from "http-status-codes";
import User from "../../auth/userModel/userModel";
import { sendResponse } from "../../utils/responseData";
import { Request, Response } from "express";

const users = async (req:Request, res:Response) => {
  try {
    const userId = req.user._id;

    const allUser = await User.find({
      _id: { $ne: userId._id },
    }).select("-password");

    return sendResponse(res, true, StatusCodes.OK, "Users", allUser);
  } catch (err:any) {
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
