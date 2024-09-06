import jwt from "jsonwebtoken";

import { sendResponse } from "../utils/responseData.js";
import { StatusCodes } from "http-status-codes";
import User from "../auth/userModel/userModel.js";

const protectedRoutes = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log("token", token);
    if (!token) {
      return sendResponse(
        res,
        false,
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access"
      );
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decoded) {
      return sendResponse(
        res,
        false,
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access"
      );
    }

    const user  = await User.findOne({username:decoded?.userInfo?.username}).select("-password")
    // console.log("decoded", user);
    req.user=user
    next();
  } catch (err) {
    return sendResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err?.message ? err.message : "Internal Server Error. Try again"
    );
  }
};

export default protectedRoutes;
